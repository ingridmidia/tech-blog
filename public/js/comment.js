document.getElementById("comment-button").addEventListener("click", addComment);

async function addComment(event) {
    event.preventDefault();
    
    const content = document.getElementById("comment").value.trim();
    const urlData = window.location.toString().split('/');
    const id = urlData[urlData.length - 1];

    if (content) {
        const response = await fetch(`/api/post/${id}/comment`, {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace(`/post/${id}`);
        } else {
            alert(response.statusText);
        }
    }
}