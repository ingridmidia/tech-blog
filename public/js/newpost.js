document.getElementById("newpost-form").addEventListener("submit", newPost);

async function newPost(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    console.log(title, content);

    if (title && content) {
        const response = await fetch("/api/post", {
            method: "POST",
            body: JSON.stringify({ title, content}),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}