const delay = (time = 0) => new Promise((resolve, _) => setTimeout(resolve, time))

function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
}

const isNewUI = () => !document.getElementsByClassName('Jrb8ue').length

const isShowingMenuBox = () => {
    const oldShowingMenuBox = !!document.getElementsByClassName("Bx7THd PBWx0c Uy7Qke XN1AMe").length;

    let newShowingMenuBox = (document.getElementsByClassName("WUFI9b")[0]);

    newShowingMenuBox = newShowingMenuBox ? !newShowingMenuBox?.classList.contains('qdulke') : false;

    return isNewUI() ? newShowingMenuBox : oldShowingMenuBox;
}

const getCountBox = () => {
    const oldBox = document.getElementsByClassName("wnPUne N0PJ8e")[0];
    const newBox = document.getElementsByClassName("uGOf1d")[0];
    return isNewUI() ? newBox : oldBox;

}

const getPeopleButton = () => {
    const oldBtn = document.getElementsByClassName(
        "uArJ5e UQuaGc kCyAyd QU4Gid foXzLb IeuGXd"
    )[0];

    return isNewUI() ? null : oldBtn;

}

const getPeopleContainerButton = () => {
    const oldContainerBtn = document.getElementsByClassName(
        "ThdJC kaAt2 c0XF8e"
    )[0];
    const newContainerBtn = document.getElementsByClassName('VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ JsuyRc boDUxc')[1];
    return isNewUI() ? newContainerBtn : oldContainerBtn;

}

const getPeopleContainer = () => {
    const oldContainer = document.getElementsByClassName("HALYaf tmIkuc s2gQvd KKjvXb")[0] || document.getElementsByClassName("HALYaf tmIkuc KKjvXb")[0];
    const newContainer = document.getElementsByClassName("GvcuGe")[0];
    console.log({ newContainer });
    return isNewUI() ? newContainer : oldContainer;

}

const getCloseButton = () => {
    return document.getElementsByClassName(
        "VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ IWtuld wBYOYb"
    )[0];
}

const refresh = async () => {
    if (!isShowingMenuBox()) {
        await delay(500)
        getPeopleButton()?.click();
        console.log('Opened box')
    }

    await delay(500)
    getPeopleContainerButton().click();
    console.log('Opened people tab')

    await delay(500)
    const container = getPeopleContainer();
    console.log({ container });
    await scrollTo(container, container?.scrollHeight, null, async () => {
    }, async () => {
        await scrollTo(container, 0, async () => { })
    });

    if (!isShowingMenuBox()) {
        await setTimeout(() => getCloseButton().click(), 500);
    }
};
