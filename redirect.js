(function () {
    let original = new URL(location);
    let replace = new URL(location);
    let target = 'fbclid';

    // found the target
    if (location.search.indexOf(target + '=') !== -1) {
        let params = new URLSearchParams(replace.search);
        params.delete(target);
        replace.search = params;
        window.location = replace.href;
    }

})();
