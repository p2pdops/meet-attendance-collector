function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

const refresh = async () => {
    const getIsShowingMenuBox = !!document.getElementsByClassName("Bx7THd PBWx0c Uy7Qke XN1AMe").length;
    if (!getIsShowingMenuBox) {
        await setTimeout(() => {
            document.getElementsByClassName(
                "uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd"
            )[0].click();
        }, 100);
    }
    await setTimeout(() => {
        document.getElementsByClassName(
            "ThdJC kaAt2 c0XF8e s7PhZd sVoT0c Z9zn3b sUgV6e KKjvXb LdTVNd"
        )[0].click();
    }, 100);
    await setTimeout(async () => {
        const container = document.getElementsByClassName("HALYaf tmIkuc s2gQvd KKjvXb")[0];
        await scrollTo(container, container.scrollHeight, async () => {
        }, async () => {

        });
    }, 100);
    if (!getIsShowingMenuBox) {
        await setTimeout(() => {
            document.getElementsByClassName(
                "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb"
            )[0].click();
        }, 100);
    }
};
