function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

const isShowingMenuBox = () => {
    const showingMenuBox = !!document.getElementsByClassName("Bx7THd PBWx0c Uy7Qke XN1AMe").length;
    return showingMenuBox;
}

const getCountBox = () => {
    return document.getElementsByClassName("wnPUne N0PJ8e")[0];
}

const getPeopleButton = () => {
    return document.getElementsByClassName(
        "uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd"
    )[0];
}

const getPeopleContainerButton = () => {
    return document.getElementsByClassName(
        "ThdJC kaAt2 c0XF8e"
    )[0];
}

const getPeopleContainer = () => {
    return document.getElementsByClassName("HALYaf tmIkuc s2gQvd KKjvXb")[0] || document.getElementsByClassName("HALYaf tmIkuc KKjvXb")[0];
}

const getCloseButton = () => {
    return document.getElementsByClassName(
        "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb"
    )[0]
}

const refresh = async () => {
    if (!isShowingMenuBox()) {
        await setTimeout(() => {
            getPeopleButton().click();
        }, 100);
    }
    await setTimeout(() => {
        getPeopleContainerButton().click();
    }, 100);
    await setTimeout(async () => {
        const container = getPeopleContainer();
        await scrollTo(container, container.scrollHeight, null, async () => {
        }, async () => {
            await scrollTo(container, 0, async () => { })
        });
    }, 100);
    if (!isShowingMenuBox()) {
        await setTimeout(() => getCloseButton().click(), 100);
    }
};
