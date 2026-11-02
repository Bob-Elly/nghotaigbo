# Nghotaigbo Website — Master Project Guide

## Overview
A responsive multi-page website for **"Nghọta na Mmụta Asụsụ Igbo"** — an Igbo language learning book series and cultural education initiative by **Mrs. Chinyere Obianụjụ Bob-Madumere (Nee Ozonzeadi)**, published through **Nghotaigbo Educational Services**.

---

## 🏛️ Architecture: Multi-Page Structure

```
Nghotaigbo/
├── index.html          ← Welcome / Home Page with preview cards to all sections
├── books.html          ← The Book Collection (curricula, levels, companion workbooks)
├── stories.html        ← Stories, Songs & Rhymes (Akụkọ, Egwu na Nkụzi) video showcase
├── about.html          ← About the Author & Nghotaigbo Educational Services
├── community.html      ← In Schools & Communities (classroom moments, pupil reading sessions)
├── contact.html        ← Inquiries, direct book orders, school visits
│
├── css/
│   └── styles.css      ← Master stylesheet with Light & Dark (Warm Brown Earth) themes
├── js/
│   └── main.js         ← Dark mode toggle, mobile nav, YouTube player, Lightbox, forms
│
└── images/
    ├── README.md       ← Instructions on where to drop new photos
    ├── author.jpg      ← Official launch portrait of Mrs. Chinyere
    ├── books.webp      ← Book series photo
    ├── books/          ← Individual book covers (book1.jpg, book2.jpg, etc.)
    ├── author/         ← Portraits, speaking engagements, headshots
    ├── events/         ← School visits, book launch, presentations
    ├── media/          ← Press, TV, interview photos
    └── gallery/        ← General photo archive
```

---

## 🎨 Theme & Styling
- **Default Theme (Light)**: Clean white background (`#FFFFFF`) with Igbo red (`#B22234`), forest green (`#2E7D32`), and warm gold (`#E6A817`).
- **Dark Mode (Warm Brown Earth)**: Rich Igbo earthen tones (`#1A1210` dark base, `#2A1E17` warm cocoa cards, gold highlights).
- **Persistent Toggle**: Remembers user choice across page transitions using `localStorage`.

---

## 🎥 YouTube Videos (Stories, Rhymes & Lessons)
In `stories.html`, the video cards are categorized:
1. **Folklore & Moral Stories (Akụkọ)**
2. **Children's Songs & Rhymes (Egwu & Abụ)**
3. **Spoken Lessons & Pronunciation (Nkụzi)**

### How to activate your actual YouTube videos:
In `stories.html`, replace `VIDEO_ID_1`, `VIDEO_ID_2`, and `VIDEO_ID_3` with the real YouTube IDs:
- For `https://www.youtube.com/watch?v=AbCd1234EfG`, the ID is `AbCd1234EfG`.
- When clicked, the video plays right inside the browser window without leaving the page.
- There is also a red button for visitors who prefer to watch directly on YouTube.

---

## 🏫 Incorporating School Visits & Children Photos
In `community.html`:
- Naturally highlights Mrs. Chinyere taking books into schools, reading with pupils, and celebrating cultural events with young learners.
- When new school photos arrive, place them in `images/events/` and link them into `community.html`.
- Visitors can click any photo to enlarge it in the built-in Lightbox viewer.

---

## 📚 Adding More Books
In `books.html`:
- The collection is not restricted to 3 books. You can duplicate any `<div class="book-card">` block to add workbooks, advanced volumes, dictionaries, or audiobooks as the series expands.

---

## ✉️ Contact & Orders
- Visitors can pick a topic from the dropdown (Individual purchase, School bulk order, School visit invitation, Speaking engagement).
- Submitting the form opens their pre-filled email client addressed to `nghotaigbo@gmail.com`.

---

## 🚀 Deployment
Because this site is built purely in standard HTML5, CSS3, and JavaScript:
- **Netlify**: Simply drag and drop the `Nghotaigbo` folder into the Netlify dashboard.
- **GitHub Pages**: Push this folder to a GitHub repository and turn on Pages in settings.
- **Vercel / Firebase Hosting**: Deploy with zero build steps needed.
