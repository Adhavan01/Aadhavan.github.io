// Function to show the pop-up form
function showPopup() {
    var popup = document.getElementById('popupForm');
    popup.style.display = 'block';
}

// Function to hide the pop-up form
function hidePopup() {
    var popup = document.getElementById('popupForm');
    popup.style.display = 'none';
}

// Function to add a new grid item
function addGridItem(url, title, imageUrl) {
    var gridContainer = document.getElementById('gridContainer');
    
    var gridItem = document.createElement('a');
    gridItem.setAttribute('target', '_blank');
    gridItem.setAttribute('href', url);
    gridItem.classList.add('grid-item');

    var img = document.createElement('img');
    img.setAttribute('src', imageUrl);
    img.setAttribute('alt', title);

    var infoDiv = document.createElement('div');
    infoDiv.classList.add('URl_info');

    var h3 = document.createElement('h3');
    h3.textContent = title;

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = `&#10008;`
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        gridItem.remove(); 
    };

    infoDiv.appendChild(h3);
    gridItem.appendChild(img);
    gridItem.appendChild(infoDiv);
    gridItem.appendChild(deleteButton);

    gridContainer.appendChild(gridItem);
    gridContainer.appendChild(document.querySelector('.popUp'));

}

// Function to save the bookmark data to localStorage
function saveBookmark(url, title, imageUrl) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    
    // Check if the bookmark already exists
    var existingBookmark = bookmarks.find(function(bookmark) {
        return bookmark.url === url && bookmark.title === title && bookmark.imageUrl === imageUrl;
    });

    // If bookmark doesn't exist, add it
    if (!existingBookmark) {
        var newBookmark = {
            url: url,
            title: title,
            imageUrl: imageUrl
        };
        bookmarks.push(newBookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

// Function to load bookmarks from localStorage
function loadBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.forEach(function(bookmark) {
        addGridItem(bookmark.url, bookmark.title, bookmark.imageUrl);
    });
}

// Handle form submission
document.getElementById('bookmarkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var url = document.getElementById('url').value;
    var title = document.getElementById('title').value;
    var imageUrl = document.getElementById('image').value;

    addGridItem(url, title, imageUrl);
    saveBookmark(url, title, imageUrl); // Save the bookmark
    hidePopup();

    // Reset form fields
    document.getElementById('url').value = '';
    document.getElementById('title').value = '';
    document.getElementById('image').value = '';
});

// Load bookmarks when the page loads
window.onload = loadBookmarks;
