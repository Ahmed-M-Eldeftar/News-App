const form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  showNewsFun();
});
let showNewsFun = async () => {
  try {
    const address = document.getElementById("location").value;
    const res = await fetch("http://localhost:3000/news");
    const news = await res.json();
    const New = news.find((element) => {
      return element.title == address;
    });
    document.getElementById("title").innerText = "Title : " + New.title;
    document.getElementById("publishedAt").innerText = New.publishedAt;
    document.getElementById("content").innerText = "Content : " + New.content;
  } catch (err) {
    console.log(err);
  }
};
