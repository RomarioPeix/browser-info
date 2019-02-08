function get_browser_info() {
    
    var user_agent = navigator.userAgent;
    var screen_width = 0;
    var screen_height = 0;
    var result = [];

    var module = {
        options: [],
        header: [navigator.platform, user_agent, navigator.appVersion, navigator.vendor, window.opera],
            // to do: increment the browser and OS lists bellow
            dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
            ],
            databrowser: [
            { name: 'Samsung Browser', value: 'SamsungBrowser', version: 'SamsungBrowser' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'Opera', value: 'OPR', version: 'OPR' },
            { name: 'UC Browser', value: 'UCBrowser', version: 'UCBrowser' },
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
            ],
            init: function () {
                var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
                
                return { os: os, browser: browser };
            },
            matchItem: function (string, data) {
                var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
                
                for (i = 0; i < data.length; i += 1) {
                    regex = new RegExp(data[i].value, 'i');                    
                    match = regex.test(string);
                    if (match) {
                        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                        matches = string.match(regexv);
                        version = '';
                        if (matches) { if (matches[1]) { matches = matches[1]; } }
                        if (matches) {
                            matches = matches.split(/[._]+/);
                            for (j = 0; j < matches.length; j += 1) {
                                if (j === 0) {
                                    version += matches[j] + '.';
                                } else {
                                    version += matches[j];
                                }
                            }
                        } else {
                            version = 'N/A';
                        }
                        return {
                            name: data[i].name,
                            version: version
                        };
                    }
                }
                return { name: 'unknown', version: 0 };
            }
    };

    var e = module.init();

    // check if it is a mobile device
    if(user_agent.search("Android") > 0  || user_agent.search("Mobile") > 0  || user_agent.search("iPad") > 0  || user_agent.search("iPhone") > 0) 
    {
        // get device's pixel ratio in comparison to the css pixel (see window docs for more)
        var ratio = window.devicePixelRatio;

        // invert height - width, for report purposes (this is optional)
        screen_height = (screen.width * ratio);
        screen_width = (screen.height * ratio);
    } else {
    	screen_width = screen.width;
    	screen_height = screen.height;
    }

    result['os_name'] = e.os.name;
    result['os_version'] = e.os.version;
    result['browser_name'] = e.browser.name;
    result['browser_version'] = e.browser.version;
    result['screen_width'] = screen_width;
    result['screen_height'] = screen_height;

    return result;
};