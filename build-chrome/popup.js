document.addEventListener("DOMContentLoaded", () => {
    // Use the appropriate API based on browser
    const browserAPI = chrome || browser;
    
    const saveAllTabsButton = document.getElementById("save-all-tabs-btn");
    const combineAllButton = document.getElementById("combine-all-btn");
  
    saveAllTabsButton.addEventListener("click", () => {
      // Immediately show feedback
      saveAllTabsButton.textContent = "Saving...";
      saveAllTabsButton.disabled = true;
      
      browserAPI.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.log("No tabs to bookmark.");
          saveAllTabsButton.textContent = "No tabs to save";
          setTimeout(() => {
            saveAllTabsButton.textContent = "Save All Tabs";
            saveAllTabsButton.disabled = false;
          }, 2000);
          return;
        }
  
        const today = new Date().toISOString().split("T")[0];
  
        browserAPI.bookmarks.search({ title: "Bookit" }, (results) => {
          let bookitFolder = results.find((folder) => folder.title === "Bookit");
  
          if (!bookitFolder) {
            browserAPI.bookmarks.create({ title: "Bookit" }, (newFolder) => {
              bookitFolder = newFolder;
              saveTabsToFolder(bookitFolder.id, today, tabs, () => {
                saveAllTabsButton.textContent = "All Tabs Saved ✓";
                setTimeout(() => {
                  saveAllTabsButton.textContent = "Save All Tabs";
                  saveAllTabsButton.disabled = false;
                }, 2000);
              });
            });
          } else {
            saveTabsToFolder(bookitFolder.id, today, tabs, () => {
              saveAllTabsButton.textContent = "All Tabs Saved ✓";
              setTimeout(() => {
                saveAllTabsButton.textContent = "Save All Tabs";
                saveAllTabsButton.disabled = false;
              }, 2000);
            });
          }
        });
      });
    });
  
    combineAllButton.addEventListener("click", () => {
      // Immediately show feedback
      combineAllButton.textContent = "Combining...";
      combineAllButton.disabled = true;
      
      browserAPI.bookmarks.search({ title: "Bookit" }, (results) => {
        const bookitFolder = results.find((folder) => folder.title === "Bookit");

        if (!bookitFolder) {
          console.error("No 'Bookit' folder found.");
          combineAllButton.textContent = "No Bookit folder found";
          setTimeout(() => {
            combineAllButton.textContent = "Combine All";
            combineAllButton.disabled = false;
          }, 2000);
          return;
        }

        browserAPI.bookmarks.getChildren(bookitFolder.id, (children) => {
          const archiveFolder = children.find((child) => child.title === "Archive");

          if (!archiveFolder) {
            browserAPI.bookmarks.create({
              parentId: bookitFolder.id,
              title: "Archive",
            }, (newArchiveFolder) => {
              moveFoldersToArchive(children, newArchiveFolder.id, () => {
                combineAllButton.textContent = "All Folders Combined ✓";
                setTimeout(() => {
                  combineAllButton.textContent = "Combine All";
                  combineAllButton.disabled = false;
                }, 2000);
              });
            });
          } else {
            moveFoldersToArchive(children, archiveFolder.id, () => {
              combineAllButton.textContent = "All Folders Combined ✓";
              setTimeout(() => {
                combineAllButton.textContent = "Combine All";
                combineAllButton.disabled = false;
              }, 2000);
            });
          }
        });
      });
    });    function saveTabsToFolder(parentId, date, tabs, callback) {
      browserAPI.bookmarks.getChildren(parentId, (children) => {
        const dateFolders = children.filter((child) => child.title.startsWith(date));
        let folderTitle = date;
  
        if (dateFolders.length > 0) {
          folderTitle = `${date} (${dateFolders.length + 1})`;
        }
  
        browserAPI.bookmarks.create({ parentId: parentId, title: folderTitle }, (dateFolder) => {
          let bookmarksCreated = 0;
          const totalTabs = tabs.length;
          
          tabs.forEach((tab) => {
            browserAPI.bookmarks.create({
              parentId: dateFolder.id,
              title: tab.title,
              url: tab.url,
            }, () => {
              bookmarksCreated++;
              if (bookmarksCreated === totalTabs) {
                console.log(`Bookmarked ${tabs.length} tabs into folder 'Bookit/${folderTitle}'.`);
                if (callback) callback();
              }
            });
          });
        });
      });
    }
  
    function moveFoldersToArchive(folders, archiveFolderId, callback) {
      const foldersToMove = folders.filter(folder => folder.title !== "Archive");
      
      if (foldersToMove.length === 0) {
        if (callback) callback();
        return;
      }

      let foldersMovedCount = 0;
      const totalFolders = foldersToMove.length;

      foldersToMove.forEach((folder) => {
        browserAPI.bookmarks.move(folder.id, { parentId: archiveFolderId }, () => {
          console.log(`Moved folder '${folder.title}' to Archive.`);
          foldersMovedCount++;
          if (foldersMovedCount === totalFolders) {
            if (callback) callback();
          }
        });
      });
    }
  });