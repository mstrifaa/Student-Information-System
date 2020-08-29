function openNav() {
    if (screen.availWidth < 760) {     // if omitted, menu will be similar to that of codeforces
        // this is suppossed to make the menu take the entire screen when opened
        document.getElementById("side_bar").style.width = screen.availWidth + "px";
        document.getElementById("side_bar").style.zIndex = 1;
        document.getElementById("main_section").style.zIndex = 0;
        document.getElementById("main_section").style.position = "relative";
        document.getElementById("heading").style.position = "relative";
        document.getElementById("heading").style.zIndex = 0;
    }
    else {
        document.getElementById("side_bar").style.width = "250px";
        document.getElementById("main_section").style.width = "79%";
        document.getElementById("main_section").style.marginLeft = "270px";
        document.getElementById("heading").style.width = "79%";
        document.getElementById("heading").style.marginLeft = "270px";
    }
}

function closeNav() {
    document.getElementById("main_section").style.width = "80%";
    document.getElementById("side_bar").style.width = "0";
    document.getElementById("main_section").style.marginLeft = "auto";
    document.getElementById("heading").style.width = "80%";
    document.getElementById("heading").style.marginLeft = "auto";
}
