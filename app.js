const banned_params = [
    // facebook
    "__cft__[0]",
    "__tn__",
    "fbclid",
    // Google Analytics https://support.google.com/analytics/answer/1033863
    "utm_campaign",
    "utm_content",
    "utm_medium",
    "utm_source",
    "utm_term",
    // twitter
    "ref_src",
];

function removeParam(original, target) {
    let replace = new URL(original);
    let params = new URLSearchParams(replace.search);
    let redirect = false;

    if (params.has(target)) {
        params.delete(target);
        replace.search = params;
        redirect = true;
    }

    return {
        redirect: redirect,
        newReplace: replace,
    };
}

function removeParams(original, targets) {
    let replace = new URL(original);
    let ret = false;

    targets.forEach((target) => {
        const { redirect, newReplace } = removeParam(replace.href, target);
        ret |= redirect;
        replace = newReplace;
    });

    return {
        redirect: ret,
        redirectUrl: replace.href,
    };
}

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        const { redirect, redirectUrl } = removeParams(
            details.url,
            banned_params
        );

        if (redirect) {
            console.log("Replace to: " + redirectUrl);
            return { redirectUrl: redirectUrl };
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);
