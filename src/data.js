(function (window) {
    const allData = [
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/b612_270.png",
            "name": "B612"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/line_looks_270x270.png",
            "name": "LOOKS"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/line_android_270x270_1111.png",
            "name": "LINE MAN"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/270X270_line_me.png",
            "name": "Emoji LINE"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/lineat_128.png",
            "name": "LINE@"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/linelogo_128x128.png",
            "name": "LINE TV"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/linecamera_icon_128.png",
            "name": "LINE Camera"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/favicon_enid_128.png",
            "name": "LINE Dictionary English-Indonesian "
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/FreeCoin_CHERRY_128_0314.png",
            "name": "LINE PLAY"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/LP_Family_icon_128_LINE-Antivirus.jpg",
            "name": "LINE Antivirus"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/LP_Family_icon_128_LINE-Tools.jpg",
            "name": "LINE Tools"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/favicon_enth_128.png",
            "name": "LINE Dictionary English-Thai"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/favicon_cnen_128.png",
            "name": "LINE Dictionary Chinese-English"
        },
        {
            "logo": "https://d.line-scdn.net/stf/line-lp/family/en/lineshop_128.png",
            "name": "LINE SHOP"
        }
    ];

    window.fetch = (url) => {
        let key = url.split('key=')[1];
        key = key ? key.toLowerCase() : '';
        const matchData = allData.filter(({ name }) => name.toLowerCase().indexOf(key) !== -1);
        return Promise.resolve({ total: matchData.length, items: matchData })
    }
})(window)
