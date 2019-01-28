chrome.browserAction.onClicked.addListener(tab => {
    const name = 'JSESSIONID';
    const details = {
        url: tab.url,
        name,
    };
    chrome.cookies.get(
        details,
        ({ value }) => {
            const localhost = new URL('http://localhost');
            chrome.cookies.set(
                {
                    url: localhost.origin,
                    domain: localhost.hostname,
                    name,
                    value,
                },
                () => {
                    localhost.pathname = new URL(tab.url).pathname;
                    chrome.tabs.update(tab.id, { url: localhost.toString() });
                },
            );
        });
});
