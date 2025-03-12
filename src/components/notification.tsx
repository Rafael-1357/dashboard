import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import localforage from "localforage";
import { Bell } from "lucide-react"
import { useEffect, useState } from "react"
import { NotificationType } from "@/types/notification.types"


function Notification() {

  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  async function getToken() {
    return (await localforage.getItem<string>('access_token')) || '';
  }

  useEffect(() => {
    async function getNotifications() {
      const token = await getToken();

      fetch(import.meta.env.VITE_API_URL + '/api/notifications', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then(response => response.json())
        .then(data => {
          setNotifications(data.data);
        })
        .catch(error => console.error('Error fetching notifications:', error));
    }

    getNotifications();
  }, []);

  function markAsRead() {
    console.log('Notificações marcadas como lidas')

    async function getNotifications() {
      const token = await getToken();

      fetch(import.meta.env.VITE_API_URL + '/api/notifications/mark-as-read', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      })
        .then(() => console.log('Notificações marcadas como lidas'))
        .catch(error => console.error('Error fetching notifications:', error));
    }

    getNotifications();
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
      <DropdownMenuTrigger >
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-4 pu">
        <div className="flex justify-between">
          <DropdownMenuLabel>Notificações</DropdownMenuLabel>
          <DropdownMenuLabel
            className="text-xs text-muted-foreground hover:text-purple-500 hover:underline underline-offset-1 cursor-pointer"
            onClick={() => markAsRead()}
          >
            Marcar como lida
          </DropdownMenuLabel>
        </div>
        <div className="max-w-xs max-h-96 overflow-y-auto overflow-x-hidden">
          {notifications.length > 0 ? notifications.map((notification) => (
            <div key={notification.id}>
              <DropdownMenuItem
                className="flex flex-col gap-1 items-start"
                onClick={() => markAsRead()}
              >
                {notification.read ? <p className="text-sm text-muted-foreground text-purple-500">lida</p> : <p className="text-sm text-muted-foreground">Não lida</p>}
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