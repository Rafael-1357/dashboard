import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import localforage from "localforage";
import { Bell, CircleCheck, Trash2Icon, TriangleAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { NotificationType } from "@/types/notification.types"
import { toast } from "sonner";

type MetaLinks = {
  url: string | null,
  label: string,
  active: boolean
};

type NotificationMeta = {
  current_page: number,
  from: number,
  last_page: number,
  links: MetaLinks[],
  path: string,
  per_page: number,
  to: number,
  total: number
};

function Notification() {

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [metaNotifications, setMetaNotifications] = useState<NotificationMeta>({ current_page: 0, from: 0, last_page: 0, links: [], path: '', per_page: 0, to: 0, total: 0 });

  async function getToken() {
    return (await localforage.getItem<string>('access_token')) || '';
  }

  async function getNotifications(page: string | null) {
    const token = await getToken();

    let url = import.meta.env.VITE_API_URL + '/api/notifications';
    if (page) {
      url += `?page=${page}`;
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => response.json())
      .then(data => {
        page ? setNotifications((prevNotifications) => {
          const novasNotificacoes = data.data.filter(
            (n: any) => !prevNotifications.some((prev) => prev.id === n.id)
          );
          return [...prevNotifications, ...novasNotificacoes];
        }) : setNotifications(data.data);
        setMetaNotifications(data.meta)
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }

  useEffect(() => {
    getNotifications(null);
  }, []);

  function markAsRead() {
    async function markAsReadNotifications() {
      const token = await getToken();

      fetch(import.meta.env.VITE_API_URL + '/api/notifications/mark-as-read', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then(() => {
          toast('Notificações lidas com sucesso', { icon: <CircleCheck /> })
          getNotifications(null);
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
          toast('Falha ao ler notificações', { icon: <TriangleAlert /> })
        });
    }

    markAsReadNotifications();
  }

  async function deleteNotifications(id: string) {

    const token = await getToken();

    async function deleteNotification(id: string) {
      fetch(import.meta.env.VITE_API_URL + `/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }).then(() => {
        setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
        toast('Notificação deletada com sucesso', { icon: <CircleCheck /> })
      }).catch(error => {
        console.error('Error fetching notifications:', error);
        toast('Falha ao deletar notificação', { icon: <TriangleAlert /> })
      });
    }
    
    deleteNotification(id);
  }

  function scrolling(e: HTMLElement) {
    if (e.scrollHeight - e.scrollTop === e.clientHeight) {
      if (metaNotifications?.current_page !== metaNotifications?.last_page) {
        getNotifications((metaNotifications?.current_page + 1).toString());
      }
    }
  }

  const cssAppliedContent = (body: any) => `
  <div>
    <style>
      #notification strong {
        color: #a855f7;
      }
      
      #notification ul {
        list-style-type: none;
        margin-top: 10px;
        }
    </style>
    ${body}
  <div>
  `;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4">
        <div className="flex justify-between">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          <DropdownMenuLabel
            className="text-xs text-muted-foreground hover:text-purple-500 hover:underline underline-offset-1 cursor-pointer"
            onClick={() => markAsRead()}
          >
            Marcar como lida
          </DropdownMenuLabel>
        </div>
        <div className="max-w-xs max-h-96 overflow-y-auto overflow-x-hidden"
          onScroll={(e) => scrolling(e.currentTarget)}
        >
          {notifications.length > 0 ? notifications.map((notification) => (
            <div key={notification.id}>
              <DropdownMenuItem
                className="flex flex-col gap-1 items-start"
                onSelect={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="flex justify-between w-full">
                  {notification.read ? <p className="text-sm text-muted-foreground text-purple-500">lida</p> : <p className="text-sm text-muted-foreground">Não lida</p>}
                  <button onClick={() => deleteNotifications(notification.id)}> <Trash2Icon /></button>
                </div>
                <div
                  id="notification"
                  className={'html'}
                  style={{ lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{
                    __html: cssAppliedContent(notification.message),
                  }}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          )) : <DropdownMenuItem>Nenhuma notificação</DropdownMenuItem>}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notification