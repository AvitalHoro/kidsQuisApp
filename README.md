
# Kids Quiz App

אפליקציית שאלות אינטראקטיבית עם זיהוי קולי לילדים.

## 📦 הפעלה מקומית

```bash
npm install
npm start
```

## 🚀 פריסה ל-Vercel

1. העלה את הקבצים ל-GitHub
2. התחבר ל-[vercel.com](https://vercel.com) ובחר את הריפוזיטורי
3. פרוס את האפליקציה → קבל קישור לשיתוף עם הילדים

## 🎬 ניהול שאלות

הוסף שאלות בקובץ `questions.json` בפורמט הבא:

```json
[
  {
    "videoUrl": "https://drive.google.com/uc?export=download&id=XXXXX",
    "expectedAnswer": "תשובה"
  }
]
```

## 🧠 הערה

האפליקציה משתמשת בזיהוי קולי מובנה בדפדפן (Web Speech API), מומלץ להשתמש בכרום.
