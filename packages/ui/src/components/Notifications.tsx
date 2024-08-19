'use client'

import React, {useEffect, useState} from "react";
import styled, {css} from "styled-components";

/**
 * Represents a styled div element for displaying notifications.
 * @typedef {React.FunctionComponent<{alertType?: Alert, delay: number}>} NotificationWrapper
 * @property {Alert} $alertType - The type of the alert (optional).
 * @property {number} $delay - The delay for the animation in milliseconds.
 * @returns {React.ReactElement} - The styled div element.
 */
const NotificationWrapper = styled.div<{$alertType?: Alert, $delay: number, $sx?: ReturnType<typeof css> }>`
    position: fixed;
    text-align: center;
    top: 50px;
    right: -300px;
    padding: 16px;
    border-radius: 4px;
    color: white;
    max-width: 200px;
    background: #0d1117;

    animation: slideIn 400ms forwards, slideOut 400ms ${props => props.$delay}s forwards;
    
    @keyframes slideIn {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(-350px);
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(-350px);
        }

        to {
            transform: translateX(0);
        }
    }

    ${props =>  {
        switch (props.$alertType) {
            case "warning":
                return 'background: #FFC107;'
            case "error":
                return 'background: #dc3545;'
            case "success":
                return 'background: #28a745;'
            case "info":
            default:
                return 'background: #007BFF;'
        }
    }}
    
    ${props => props.$sx}
`

/**
 * Represents an Alert message.
 * @typedef {('success' | 'warning' | 'error' | 'info')} Alert
 */
export type Alert = 'success' | 'warning' | 'error' | 'info'

/**
 * Defines the properties for the Notifications component.
 * @typedef {Object} NotificationsProps
 * @property {string} [message] - The message to be displayed in the notification.
 * @property {Alert} [alertType] - The type of alert for the notification.
 * @property {number} [delay] - The delay in milliseconds before the notification automatically closes.
 * @property {function} [onClose] - The callback function triggered when the notification is closed.
 * @property {ReturnType<typeof css>} [sx] - Additional CSS styles for the notification.
 * @property {React.ComponentPropsWithoutRef<'div'>} - The remaining div props for the notification.
 */
type NotificationsProps = {
  message?: string
  alertType?: Alert
  delay?: number
  onClose?: () => void
  sx?: ReturnType<typeof css>
} & React.ComponentPropsWithoutRef<'div'>

/**
 * Manages and displays notifications.
 * @param {Object} props - The component props.
 * @param {string} props.message - The message to be displayed.
 * @param {string} props.alertType - The type of alert (e.g. "success", "error").
 * @param {number} props.delay - The delay in seconds between each notification.
 */
const Notifications: React.FC<NotificationsProps> = ({message, alertType, delay, sx, onClose}) => {
  const [messageQueue, setMessageQueue] = useState<string[]>(message !== undefined ? [message] : [])
  const [currentMessage, setCurrentMessage] = useState<string>()

  useEffect(() => {
    if (message !== undefined)
      setMessageQueue(prevState => [...prevState, message])
  }, [message])

  useEffect(() => {
    const queueLength = messageQueue.length
    let interval: NodeJS.Timeout | null = null

    if (queueLength > 0) {
      setCurrentMessage(messageQueue[0])
      interval = setInterval(() => {
        const updatedQueue = messageQueue.slice(1)

        setMessageQueue(updatedQueue)

        if (updatedQueue.length === 0 && interval !== null) {
          clearInterval(interval)
          setCurrentMessage(undefined)

          if (onClose !== undefined) {
            onClose()
          }
        }
      }, delay !== undefined ? (delay * 500) : 500 )
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [messageQueue]);

  return <>
    {
      currentMessage !== undefined &&
      <NotificationWrapper
        $alertType={alertType}
        $delay={delay ??  1}
        $sx={sx}
        key={currentMessage}
      >
        {currentMessage}
      </NotificationWrapper>
    }
  </>
}

export default Notifications
