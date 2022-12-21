import * as React from 'react';
import { useLocation } from 'react-router-dom';
import useBreakpoint from './breakpoints/BreakpointProvider';
const TawkMessengerReact = require('@tawk.to/tawk-messenger-react');

export const positionChatWidget = (isTabOrMobile: boolean) => {
    try {
        const chatWidgetVisible = document.querySelector('.widget-visible')
        if (chatWidgetVisible) {
            const ifr = chatWidgetVisible.querySelector('iframe');
            if (ifr) {
                ifr.style.bottom = isTabOrMobile ? '146px' : '96px';
            }
        }
    } catch (err) { }
}

const TawkProvider = ({ isHeader }: any) => {
    const { isMobile } = useBreakpoint();
    const tawkMessengerRef = React.useRef<any | null>(null);
    const location = useLocation();

    React.useEffect(() => {
        try {
            if (tawkMessengerRef.current) {
                if (isHeader && ['/contact', '/zh-CN/contact'].includes(location.pathname)) {
                    tawkMessengerRef.current.showWidget();
                } else {
                    tawkMessengerRef.current.hideWidget();
                }
            }
        } catch (err) { }
    }, [location.pathname, isHeader, tawkMessengerRef])

    React.useEffect(() => {
        try {
            if (tawkMessengerRef.current) {
                positionChatWidget(isMobile)
            }
        } catch (err) { }
    }, [isMobile, tawkMessengerRef])

    return (
        <TawkMessengerReact
            propertyId="60d7fbc17f4b000ac039bd84"
            widgetId="1ggn2lnfe"
            ref={tawkMessengerRef}
            customStyle={{
                visibility: {
                    desktop: {
                        xOffset: '24',
                        yOffset: '96',
                        position: 'br'
                    },
                    mobile: {
                        xOffset: '24',
                        yOffset: '146',
                        position: 'br'
                    }
                }
            }}
            onLoad={() => {
                if (tawkMessengerRef.current) {
                    if (isHeader && ['/contact', '/zh-CN/contact'].includes(location.pathname)) {
                        tawkMessengerRef.current.showWidget();
                    } else {
                        tawkMessengerRef.current.hideWidget();
                    }
                    setTimeout(() => {
                        const ifr = document.querySelector('iframe');
                        if (ifr) {
                            const divTag: any = ifr?.contentDocument?.body?.querySelector('.tawk-button');
                            if (divTag) {
                                divTag.style.height = '56px';
                                divTag.style.width = '56px';
                            }
                        }
                    }, 100);
                }
            }}
        />
    )
}

export default TawkProvider;