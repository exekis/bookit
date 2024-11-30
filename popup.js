document.addEventListener("DOMContentLoaded", () => {
    const saveAllTabsButton = document.getElementById("save-all-tabs-btn");
    const combineAllButton = document.getElementById("combine-all-btn");
  
    saveAllTabsButton.addEventListener("click", () => {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.log("No tabs to bookmark.");
          return;
        }
  
        const today = new Date().toISOString().split("T")[0];
  
        chrome.bookmarks.search({ title: "Bookit" }, (results) => {
          let bookitFolder = results.find((folder) => folder.title === "Bookit");
  
          if (!bookitFolder) {
            chrome.bookmarks.create({ title: "Bookit" }, (newFolder) => {
              bookitFolder = newFolder;
              saveTabsToFolder(bookitFolder.id, today, tabs);
            });
          } else {
            saveTabsToFolder(bookitFolder.id, today, tabs);
          }
        });
      });
    });
  
    combineAllButton.addEventListener("click", () => {
      chrome.bookmarks.search({ title: "Bookit" }, (results) => {
        const bookitFolder = results.find((folder) => folder.title === "Bookit");
  
        if (!bookitFolder) {
          console.error("No 'Bookit' folder found.");
          return;
        }
  
        chrome.bookmarks.getChildren(bookitFolder.id, (children) => {
          const archiveFolder = children.find((child) => child.title === "Archive");
  
          if (!archiveFolder) {
            chrome.bookmarks.create({
              parentId: bookitFolder.id,
              title: "Archive",
            }, (newArchiveFolder) => {
              moveFoldersToArchive(children, newArchiveFolder.id);
            });
          } else {
            moveFoldersToArchive(children, archiveFolder.id);
          }
        });
      });
    });
  
    function saveTabsToFolder(parentId, date, tabs) {
      chrome.bookmarks.getChildren(parentId, (children) => {
        const dateFolders = children.filter((child) => child.title.startsWith(date));
        let folderTitle = date;
  
        if (dateFolders.length > 0) {
          folderTitle = `${date} (${dateFolders.length + 1})`;
        }
  
        chrome.bookmarks.create({ parentId: parentId, title: folderTitle }, (dateFolder) => {
          tabs.forEach((tab) => {
            chrome.bookmarks.create({
              parentId: dateFolder.id,
              title: tab.title,
              url: tab.url,
            });
          });
          console.log(`Bookmarked ${tabs.length} tabs into folder 'Bookit/${folderTitle}'.`);
        });
      });
    }
  
    function moveFoldersToArchive(folders, archiveFolderId) {
      folders.forEach((folder) => {
        if (folder.title === "Archive") {
          return;
        }
  
        chrome.bookmarks.move(folder.id, { parentId: archiveFolderId }, () => {
          console.log(`Moved folder '${folder.title}' to Archive.`);
        });
      });
    }
  });