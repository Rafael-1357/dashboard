import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, BellDot, CircleCheck, LoaderCircle, Trash2Icon, TriangleAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { NotificationMeta, NotificationType } from "@/types/notification.types"
import { toast } from "sonner";
import { deleteAll, deleteNotifications, getNotification, hasUnreadNotifications, markAsRead } from "@/services/notifications";
import { Separator } from "@radix-ui/react-separator";

function Notification() {

  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [metaNotifications, setMetaNotifications] = useState<NotificationMeta>({ current_page: 0, from: 0, last_page: 0, links: [], path: '', per_page: 0, to: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [readNotifications, setReadNotifications] = useState(false);


  async function unreadNotifications() {
    hasUnreadNotifications()
      .then(data => {
        setReadNotifications(data.has_unread_notifications);
      })
      .catch(error => console.error('Error fetching notifications:', error));
  }

  async function getNotifications(page: string | null = null, append = false) {
    if (isLoading) return;

    setIsLoading(true);

    getNotification(page)
      .then(data => {
        if (append) {
          setNotifications(prev => [...prev, ...data.data]);
        } else {
          setNotifications(data.data);
        }
        setMetaNotifications(data.meta);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      }).finally(() => {
        setIsLoading(false);
      });
  }


  useEffect(() => {
    getNotifications();
    unreadNotifications()
  }, []);

  async function read() {
    markAsRead()
      .then(() => {
        setNotifications((prevNotifications) => prevNotifications.map((notification) => ({ ...notification, read: true })));
        unreadNotifications()
        toast('Notificações marcadas como lidas', { icon: <CircleCheck /> })
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
        toast('Falha ao marcar notificações como lidas', { icon: <TriangleAlert /> })
      });
  }

  async function deleteNotification(id: string) {
    deleteNotifications(id).then(() => {
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
      toast('Notificação deletada com sucesso', { icon: <CircleCheck /> })
    }).catch(error => {
      console.error('Error fetching notifications:', error);
      toast('Falha ao deletar notificação', { icon: <TriangleAlert /> })
    });
  }

  async function deleteAllNotifications() {
    deleteAll().then(() => {
      setNotifications([]);
      toast('Notificaçãos deletadas com sucesso', { icon: <CircleCheck /> })
    }).catch(error => {
      console.error('Error fetching notifications:', error);
      toast('Falha ao deletar notificaçãos', { icon: <TriangleAlert /> })
    });
  }

  function scrolling(e: HTMLElement) {
    if (e.scrollHeight - e.scrollTop === e.clientHeight && !isLoading) {
      if (metaNotifications?.current_page !== metaNotifications?.last_page) {
        getNotifications((metaNotifications?.current_page + 1).toString(), true);
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
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {
          readNotifications ? <BellDot className="animate-pulse" /> : <Bell />
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4">
        <div className="flex justify-between">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          <div className="flex items-center">
            <DropdownMenuLabel
              className="text-xs text-muted-foreground hover:text-purple-500 hover:underline underline-offset-1 cursor-pointer"
              onClick={() => deleteAllNotifications()}
            >
              Apagar todas
            </DropdownMenuLabel>
            <Separator className="mx-2 h-4 border" orientation="vertical" />
            <DropdownMenuLabel
              className="text-xs text-muted-foreground hover:text-purple-500 hover:underline underline-offset-1 cursor-pointer"
              onClick={() => read()}
            >
              Ler todas
            </DropdownMenuLabel>
          </div>
        </div>
        <div className="max-w-xs max-h-96 overflow-y-auto overflow-x-hidden"
          onScroll={(e) => scrolling(e.currentTarget)}
        >
          {notifications.length > 0 ? notifications.map((notification, index) => (
            <div key={notification.id + index}>
              <DropdownMenuItem
                className="flex flex-col gap-1 items-start"
                onSelect={(event) => {
                  event.preventDefault();
                }}
              >
                <div className="flex justify-between w-full">
                  {notification.read ? <p className="text-sm text-muted-foreground text-purple-500">lida</p> : <p className="text-sm text-muted-foreground">Não lida</p>}
                  <button onClick={() => deleteNotification(notification.id)}> <Trash2Icon /></button>
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
          {isLoading && <div className="flex justify-center p-8"><LoaderCircle className="animate-spin" /></div>}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Notification