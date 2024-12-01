// Выпадающее меню навигации по разделам в руководстве

window.addEventListener("load", initGuideNav);

let foldoutHeights = new Map;
let currentFoldoutHeights = new Map;
function initGuideNav()
{
    let contentsTable = document.getElementsByClassName("contents-table")[0];
    contentsTable.addEventListener("click", onFoldoutButtonClick);
    // contentsTable.addEventListener();
    for (let element of contentsTable.getElementsByTagName("li"))
    {
        if (element.getElementsByTagName("ul").length === 0) continue

        let foldoutButton = document.createElement("div");
        foldoutButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"18px\" viewBox=\"0 -960 960 960\" width=\"24px\"\n" +
            "                     fill=\"#ffffff\">\n" +
            "                    <path d=\"m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z\"/>\n" +
            "                </svg>";
        foldoutButton.classList.add("btn");
        foldoutButton.classList.add("closed");

        element.appendChild(foldoutButton);
    }

    let foldedLists = Array.from(contentsTable.getElementsByTagName("ul"));
    for (let i = 1; i < foldedLists.length; i++)
    {
        foldoutHeights.set(foldedLists[i], foldedLists[i].clientHeight);
        currentFoldoutHeights.set(foldedLists[i], 0);
        foldedLists[i].classList.add("closed");
    }
}

function adjustFoldoutsFromLeaf(foldout)
{
    while (foldout)
    {
        let finalHeight = foldoutHeights.get(foldout);
        for (const listItem of foldout.children)
        {
            let innerFoldout = listItem.children[1];
            if (!innerFoldout) continue;
            finalHeight -= foldoutHeights.get(innerFoldout);
            finalHeight += currentFoldoutHeights.get(innerFoldout);
        }
        foldout.style.height = finalHeight.toString() + "px";
        currentFoldoutHeights.set(foldout, finalHeight);
        foldout = foldout.parentElement.closest("ul ul");
    }
}

function onFoldoutButtonClick(event)
{
    let button = event.target.closest(".btn");
    if (!button) return;

    let openContentsButton = button.parentElement
    if (openContentsButton.classList[0] === "contents-table")
    {
        if (openContentsButton.classList.contains("closed"))
        {
            openContentsButton.classList.remove("closed");
        }
        else
        {
            openContentsButton.classList.add("closed");
        }
        return;
    }

    let foldout = button.parentElement.children[1];
    if (foldout.classList.contains("closed"))
    {
        button.classList.remove("closed");
        foldout.classList.remove("closed");
        adjustFoldoutsFromLeaf(foldout);
    }
    else
    {
        button.classList.add("closed");
        foldout.classList.add("closed");
        foldout.style.removeProperty("height");
        currentFoldoutHeights.set(foldout, 0);
        adjustFoldoutsFromLeaf(foldout.parentElement.parentElement);
    }
}