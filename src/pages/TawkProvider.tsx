import * as React from 'react';
const TawkMessengerReact = require('@tawk.to/tawk-messenger-react');
const TawkContext = React.createContext<any>(null);

const TawkProvider = (props: any) => {
    const tawkMessengerRef = React.useRef<any | null>(null);
    const [obj, setObj] = React.useState<any | null>(tawkMessengerRef)

    return (
        <TawkContext.Provider value={obj}>
            {props.children}
            <TawkMessengerReact
                propertyId="60d7fbc17f4b000ac039bd84"
                widgetId="1ggn2lnfe"
                ref={tawkMessengerRef}
                customStyle={{
                    visibility: {
                        desktop: {
                            xOffset: '34',
                            position: 'br'
                        }
                    }
                }}
                onLoad={() => {
                    if (tawkMessengerRef.current) {
                        tawkMessengerRef.current.hideWidget();
                        setTimeout(() => {
                            const ifr = document.querySelector('iframe');
                            if (ifr) {
                                const divTag: any = ifr?.contentDocument?.body?.querySelector('.tawk-button');
                                if (divTag) {
                                    divTag.style.height = '56px';
                                    divTag.style.width = '56px';
                                }
                            }
                        }, 200);
                        setObj(tawkMessengerRef)
                    }
                }}
            />
        </TawkContext.Provider>
    )
}

const useTawkRef = () => {
    const ref = React.useContext(TawkContext);
    return ref.current ? ref.current : {};
}

export default TawkProvider;
export { useTawkRef };