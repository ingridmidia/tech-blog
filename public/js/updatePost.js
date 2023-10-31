document.getElementById("update-form").addEventListener("submit", updatePost);

async function updatePost(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const urlData = window.location.toString().split('/');
    const id = urlData[urlData.length - 1];

    if (title && content) {
        const response = await fetch(`/api/post/${id}`, {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

document.getElementById("delete-button").addEventListener("click", deletePost);

async function deletePost(event) {
    const urlData = window.location.toString().split('/');
    const id = urlData[urlData.length - 1];

    const response = await fetch(`/api/post/${id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert(response.statusText);
    }
}