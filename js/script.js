/* =========================================
   BLOGSPACE - MAIN JAVASCRIPT
========================================= */


/* =========================================
   REGISTER USER
========================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        /* Check password */

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }


        /* Check password length */

        if (password.length < 6) {

            alert("Password must contain at least 6 characters.");

            return;
        }


        /* Create user */

        const user = {

            name: name,
            email: email,
            password: password

        };


        /* Save user */

        localStorage.setItem(
            "blogUser",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully! Please login."
        );


        window.location.href = "login.html";

    });

}



/* =========================================
   LOGIN USER
========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email")
                .value
                .trim();

        const password =
            document.getElementById("password")
                .value;


        const savedUser =
            JSON.parse(
                localStorage.getItem("blogUser")
            );


        /* No registered account */

        if (!savedUser) {

            alert(
                "No account found. Please register first."
            );

            window.location.href =
                "register.html";

            return;

        }


        /* Check login */

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );


            alert(
                "Welcome " +
                savedUser.name +
                "!"
            );


            window.location.href =
                "dashboard.html";

        }

        else {

            alert(
                "Incorrect email or password!"
            );

        }

    });

}



/* =========================================
   SHOW / HIDE PASSWORD
========================================= */

function showPassword() {

    const password =
        document.getElementById("password");

    const button =
        document.getElementById("passwordButton");


    if (!password) {
        return;
    }


    if (password.type === "password") {

        password.type = "text";

        if (button) {
            button.innerText = "Hide";
        }

    }

    else {

        password.type = "password";

        if (button) {
            button.innerText = "Show";
        }

    }

}



/* =========================================
   DISPLAY USER NAME ON DASHBOARD
========================================= */

const dashboardUser =
    document.getElementById("dashboardUser");


if (dashboardUser) {

    const savedUser =
        JSON.parse(
            localStorage.getItem("blogUser")
        );


    if (savedUser) {

        dashboardUser.innerText =
            savedUser.name;

    }

}



/* =========================================
   CREATE / PUBLISH BLOG
========================================= */

const blogForm =
    document.getElementById("blogForm");


if (blogForm) {

    blogForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                document.getElementById("blogTitle")
                    .value
                    .trim();


            const category =
                document.getElementById("blogCategory")
                    .value;


            const description =
                document.getElementById("blogDescription")
                    .value
                    .trim();


            const content =
                document.getElementById("blogContent")
                    .value
                    .trim();


            const tags =
                document.getElementById("blogTags")
                    .value
                    .trim();


            /* Validation */

            if (
                title === "" ||
                category === "" ||
                content === ""
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            /* Create blog object */

            const newBlog = {

                id: Date.now(),

                title: title,

                category: category,

                description: description,

                content: content,

                tags: tags,

                date:
                    new Date()
                        .toLocaleDateString(),

                views: 0,

                likes: 0

            };


            /* Get existing blogs */

            let blogs =
                JSON.parse(
                    localStorage.getItem("blogs")
                ) || [];


            /* Add new blog */

            blogs.unshift(newBlog);


            /* Save */

            localStorage.setItem(
                "blogs",
                JSON.stringify(blogs)
            );


            alert(
                "Blog published successfully!"
            );


            window.location.href =
                "dashboard.html";

        }
    );

}



/* =========================================
   DISPLAY BLOGS ON DASHBOARD
========================================= */

function displayBlogs() {

    const blogList =
        document.getElementById("blogList");


    if (!blogList) {

        return;

    }


    const blogs =
        JSON.parse(
            localStorage.getItem("blogs")
        ) || [];


    /* No blogs */

    if (blogs.length === 0) {

        blogList.innerHTML = `

            <div class="empty-blogs">

                <h3>📝 No blogs yet</h3>

                <p>
                    Create your first story and
                    share it with the world.
                </p>

                <a href="create-blog.html">
                    + Create Your First Blog
                </a>

            </div>

        `;

        return;

    }


    blogList.innerHTML = "";


    blogs.forEach(function (blog) {


        let icon = "📝";


        if (blog.category === "Technology") {

            icon = "💻";

        }

        else if (blog.category === "Travel") {

            icon = "🌴";

        }

        else if (blog.category === "Education") {

            icon = "🎓";

        }

        else if (blog.category === "Career") {

            icon = "💼";

        }

        else if (blog.category === "Lifestyle") {

            icon = "🎨";

        }

        else if (
            blog.category ===
            "Artificial Intelligence"
        ) {

            icon = "🤖";

        }


        blogList.innerHTML += `

            <article class="dashboard-blog-card">

                <div class="dashboard-blog-image">

                    ${icon}

                </div>


                <div class="dashboard-blog-content">

                    <span class="dashboard-category">

                        ${escapeHTML(blog.category)}

                    </span>


                    <h3>

                        ${escapeHTML(blog.title)}

                    </h3>


                    <p>

                        ${
                            escapeHTML(blog.description)
                            ||
                            "No description added."
                        }

                    </p>


                    <div class="blog-information">

                        <span>
                            📅 ${escapeHTML(blog.date)}
                        </span>

                        <span>
                            👁️ ${blog.views} views
                        </span>

                        <span>
                            ❤️ ${blog.likes} likes
                        </span>

                    </div>

                </div>


                <div class="dashboard-actions">

                    <button
                        class="edit-btn"
                        onclick="editBlog(${blog.id})"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteBlog(${blog.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            </article>

        `;

    });


    updateBlogCount();

}



/* =========================================
   DELETE BLOG
========================================= */

function deleteBlog(blogId) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmation) {

        return;

    }


    let blogs =
        JSON.parse(
            localStorage.getItem("blogs")
        ) || [];


    blogs =
        blogs.filter(
            function (blog) {

                return blog.id !== blogId;

            }
        );


    localStorage.setItem(
        "blogs",
        JSON.stringify(blogs)
    );


    displayBlogs();


    alert(
        "Blog deleted successfully!"
    );

}



/* =========================================
   EDIT BLOG
========================================= */

function editBlog(blogId) {

    localStorage.setItem(
        "editBlogId",
        blogId
    );


    alert(
        "Edit feature selected."
    );

}



/* =========================================
   UPDATE BLOG COUNT
========================================= */

function updateBlogCount() {

    const totalBlogs =
        document.getElementById("totalBlogs");


    if (!totalBlogs) {

        return;

    }


    const blogs =
        JSON.parse(
            localStorage.getItem("blogs")
        ) || [];


    totalBlogs.innerText =
        blogs.length;

}



/* =========================================
   SAVE DRAFT
========================================= */

function saveDraft() {

    const title =
        document.getElementById("blogTitle");


    if (!title) {

        return;

    }


    if (title.value.trim() === "") {

        alert(
            "Please enter a blog title first."
        );

        return;

    }


    const draft = {

        title:
            title.value,

        category:
            document.getElementById("blogCategory")
                .value,

        description:
            document.getElementById("blogDescription")
                .value,

        content:
            document.getElementById("blogContent")
                .value,

        tags:
            document.getElementById("blogTags")
                .value

    };


    localStorage.setItem(
        "blogDraft",
        JSON.stringify(draft)
    );


    const status =
        document.getElementById("blogStatus");


    if (status) {

        status.innerText =
            "Saved Draft";

    }


    alert(
        "Blog saved as draft!"
    );

}



/* =========================================
   LIVE CREATE BLOG PREVIEW
========================================= */

const blogTitle =
    document.getElementById("blogTitle");


if (blogTitle) {

    blogTitle.addEventListener(
        "input",
        function () {

            const preview =
                document.getElementById(
                    "previewTitle"
                );


            if (preview) {

                preview.innerText =
                    blogTitle.value ||
                    "Your blog title will appear here";

            }

        }
    );

}



const blogCategory =
    document.getElementById("blogCategory");


if (blogCategory) {

    blogCategory.addEventListener(
        "change",
        function () {

            const preview =
                document.getElementById(
                    "previewCategory"
                );


            if (preview) {

                preview.innerText =
                    blogCategory.value ||
                    "Category";

            }

        }
    );

}



const blogDescription =
    document.getElementById(
        "blogDescription"
    );


if (blogDescription) {

    blogDescription.addEventListener(
        "input",
        function () {

            const preview =
                document.getElementById(
                    "previewDescription"
                );


            const counter =
                document.getElementById(
                    "descriptionCount"
                );


            if (preview) {

                preview.innerText =
                    blogDescription.value ||
                    "Your short description will appear here.";

            }


            if (counter) {

                counter.innerText =
                    blogDescription.value.length +
                    " / 180";

            }

        }
    );

}



/* =========================================
   BLOG IMAGE PREVIEW
========================================= */

const blogImage =
    document.getElementById("blogImage");


if (blogImage) {

    blogImage.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function (event) {

                    const preview =
                        document.getElementById(
                            "imagePreview"
                        );


                    if (preview) {

                        preview.innerHTML = `

                            <img
                                src="${event.target.result}"
                                alt="Blog Cover Preview"
                            >

                        `;

                    }

                };


            reader.readAsDataURL(file);

        }
    );

}



/* =========================================
   SIMPLE EDITOR BUTTON
========================================= */

function insertText(text) {

    const textarea =
        document.getElementById(
            "blogContent"
        );


    if (!textarea) {

        return;

    }


    const start =
        textarea.selectionStart;

    const end =
        textarea.selectionEnd;


    textarea.value =

        textarea.value.substring(
            0,
            start
        )

        +

        text

        +

        textarea.value.substring(
            end
        );


    textarea.focus();

}



/* =========================================
   LOGOUT
========================================= */

function logout() {

    localStorage.setItem(
        "loggedIn",
        "false"
    );


    alert(
        "You have been logged out."
    );


    window.location.href =
        "login.html";

}



/* =========================================
   BASIC HTML SAFETY
========================================= */

function escapeHTML(value) {

    if (!value) {

        return "";

    }


    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}



/* =========================================
   RUN DASHBOARD
========================================= */

displayBlogs();

updateBlogCount();