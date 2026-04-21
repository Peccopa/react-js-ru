import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

// Frontend Roadmap Dashboard
// Single-file React component (default export)
// - Uses Tailwind CSS for styling (assumes Tailwind is configured in the project)
// - Persists progress + notes in localStorage
// - Filtering by level, search, progress indicator, links per topic
// - Export / Import JSON of progress

// -------------------------
// Sample topics dataset (derived from your roadmap)
const DEFAULT_TOPICS = [
  { id: "js-basics", title: "JavaScript: основы (переменные, функции)", level: "Junior", area: "JavaScript", links: [
      { title: "learn.javascript.ru", url: "https://learn.javascript.ru/" },
      { title: "MDN JS Guide", url: "https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide" }
    ], notes: "" },
  { id: "js-async", title: "Асинхронность: Promises, async/await, Event Loop", level: "Junior", area: "JavaScript", links: [
      { title: "MDN async", url: "https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous" }
    ], notes: "" },
  { id: "ts-core", title: "TypeScript: типы, интерфейсы, generics", level: "Middle", area: "TypeScript", links: [
      { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/intro.html" },
      { title: "TS Deep Dive (Basarat)", url: "https://basarat.gitbook.io/typescript/" }
    ], notes: "" },
  { id: "react-core", title: "React core: JSX, компоненты, хуки (useState/useEffect)", level: "Junior", area: "React", links: [
      { title: "React Docs", url: "https://react.dev/learn" }
    ], notes: "" },
  { id: "react-advanced", title: "React: useMemo/useCallback/useRef/useReducer", level: "Middle", area: "React", links: [], notes: "" },
  { id: "state-management", title: "State Management: Redux Toolkit / RTK Query", level: "Middle", area: "State", links: [
      { title: "Redux Toolkit", url: "https://redux-toolkit.js.org/" }
    ], notes: "" },
  { id: "html-css", title: "HTML & CSS: Flexbox, Grid, адаптивность", level: "Junior", area: "Frontend", links: [
      { title: "Flexbox Froggy", url: "https://flexboxfroggy.com/" },
      { title: "Grid Garden", url: "https://cssgridgarden.com/" }
    ], notes: "" },
  { id: "build-tools", title: "Сборщики: Webpack / Vite, ESLint, Prettier", level: "Middle", area: "Tooling", links: [], notes: "" },
  { id: "testing", title: "Тестирование: Jest, React Testing Library, Cypress", level: "Middle", area: "Testing", links: [], notes: "" },
  { id: "nextjs", title: "Next.js: SSR/SSG, routing", level: "Middle", area: "React", links: [
      { title: "Next.js Learn", url: "https://nextjs.org/learn" }
    ], notes: "" },
  { id: "performance", title: "Performance: code-splitting, lazy loading, Core Web Vitals", level: "Senior", area: "Performance", links: [], notes: "" },
  { id: "accessibility", title: "Accessibility (a11y) и SEO", level: "Middle", area: "UX", links: [], notes: "" },
  { id: "ci-cd", title: "CI/CD и Docker (основы)", level: "Senior", area: "DevOps", links: [], notes: "" }
];

const STORAGE_KEY = "frontend_roadmap_v1";

export default function FrontendRoadmapDashboard() {
  const [topics, setTopics] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }
    return DEFAULT_TOPICS;
  });

  const [filterLevel, setFilterLevel] = useState("All");
  const [search, setSearch] = useState("");
  const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);

  // save on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(topics));
    } catch (e) {
      console.error("Failed to save", e);
    }
  }, [topics]);

  const toggleComplete = (id) => {
    setTopics((prev) => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const updateNotes = (id, notes) => {
    setTopics(prev => prev.map(t => t.id === id ? { ...t, notes } : t));
  };

  const addTopic = (topic) => {
    setTopics(prev => [{ ...topic, id: topic.id || `topic-${Date.now()}` }, ...prev]);
  };

  const clearAll = () => {
    if (!confirm("Сбросить прогресс и заметки?")) return;
    setTopics(DEFAULT_TOPICS);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(topics, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frontend_roadmap_progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJSON = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed)) setTopics(parsed);
        else alert("Неверный формат файла (ожидается массив тем)");
      } catch (err) {
        alert("Ошибка чтения файла: " + err.message);
      }
    };
    reader.readAsText(file);
  };

  const filtered = useMemo(() => {
    return topics.filter(t => {
      if (filterLevel !== "All" && t.level !== filterLevel) return false;
      if (showOnlyIncomplete && t.done) return false;
      if (!search) return true;
      const s = search.toLowerCase();
      return (t.title.toLowerCase().includes(s) || (t.area || "").toLowerCase().includes(s) || (t.notes || "").toLowerCase().includes(s));
    });
  }, [topics, filterLevel, search, showOnlyIncomplete]);

  const progress = useMemo(() => {
    const total = topics.length || 1;
    const done = topics.filter(t => t.done).length;
    return Math.round((done / total) * 100);
  }, [topics]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <motion.h1 className="text-3xl font-semibold mb-2" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            Frontend Roadmap — React + TypeScript
          </motion.h1>
          <p className="text-sm text-gray-600 mb-4">Интерактивный дашборд для отслеживания прогресса по темам. Сохраняется в localStorage.</p>

          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Прогресс: {progress}%</span>
                <span>{topics.filter(t=>t.done).length}/{topics.length} завершено</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={exportJSON} className="px-3 py-1 bg-white border rounded shadow-sm text-sm">Экспорт</button>
              <label className="px-3 py-1 bg-white border rounded shadow-sm text-sm cursor-pointer">
                Импорт
                <input type="file" accept="application/json" className="hidden" onChange={(e)=> e.target.files?.[0] && importJSON(e.target.files[0])} />
              </label>
              <button onClick={clearAll} className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 rounded text-sm">Сброс</button>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-4">
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Поиск по темам или заметкам..." className="w-full p-2 border rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600">Фильтр по уровню</label>
              <select value={filterLevel} onChange={(e)=>setFilterLevel(e.target.value)} className="w-full mt-1 p-2 border rounded">
                <option>All</option>
                <option>Junior</option>
                <option>Middle</option>
                <option>Senior</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={showOnlyIncomplete} onChange={e=>setShowOnlyIncomplete(e.target.checked)} />
                <span className="text-sm text-gray-600">Показывать только незавершённые</span>
              </label>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Добавить тему вручную</h3>
              <AddTopicForm onAdd={addTopic} />
            </div>
          </aside>

          {/* Topics list */}
          <section className="col-span-1 lg:col-span-3">
            <div className="grid gap-4">
              {filtered.map(topic => (
                <motion.article key={topic.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`bg-white p-4 rounded-lg shadow-sm border ${topic.done ? 'ring-2 ring-emerald-200' : ''}`}>

                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-lg font-semibold">{topic.title}</h4>
                      <div className="text-xs text-gray-500 mt-1 flex gap-2 items-center">
                        <span className="px-2 py-0.5 border rounded">{topic.area}</span>
                        <span className="px-2 py-0.5 border rounded">{topic.level}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <button onClick={()=>toggleComplete(topic.id)} className={`px-3 py-1 rounded text-sm ${topic.done ? 'bg-emerald-50 border-emerald-200' : 'bg-white border'}`}>
                        {topic.done ? 'Отметить незавершённым' : 'Отметить завершённым'}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-700">
                    <div className="mb-2">
                      <strong>Ресурсы:</strong>
                      <ul className="list-disc ml-5 mt-1">
                        {topic.links && topic.links.length ? topic.links.map((l, i) => (
                          <li key={i}><a className="underline" href={l.url} target="_blank" rel="noreferrer">{l.title}</a></li>
                        )) : <li className="text-gray-400">Ссылок пока нет</li>}
                      </ul>
                    </div>

                    <div className="mb-2">
                      <strong>Заметки:</strong>
                      <NotesEditor value={topic.notes || ""} onChange={(val)=>updateNotes(topic.id, val)} />
                    </div>

                    <div className="flex gap-2 mt-2">
                      <a className="text-xs text-indigo-600" href="#" onClick={(e)=>{ e.preventDefault(); alert('В будущем сюда можно привязать тесты по этой теме.'); }}>Пройти тест (скоро)</a>
                      <a className="text-xs text-gray-500" href="#" onClick={(e)=>{ e.preventDefault(); navigator.clipboard?.writeText(topic.title).then(()=>alert('Скопировано название темы')) }}>Копировать название</a>
                    </div>
                  </div>

                </motion.article>
              ))}

              {filtered.length === 0 && (
                <div className="p-6 bg-white rounded shadow-sm text-gray-600">Нет тем, соответствующих фильтру.</div>
              )}
            </div>
          </section>
        </main>

        <footer className="mt-8 text-sm text-gray-500 text-center">Dashboard generated — you can export/import progress as JSON. Save this project and configure Tailwind to run locally.</footer>
      </div>
    </div>
  );
}

// -------------------------
// Small subcomponents
function AddTopicForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [level, setLevel] = useState("Junior");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Введите название темы');
    onAdd({ title: title.trim(), area: area || 'General', level, links: [], notes: '' });
    setTitle(""); setArea(""); setLevel("Junior");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Название темы" className="w-full p-2 border rounded" />
      <div className="flex gap-2">
        <input value={area} onChange={e=>setArea(e.target.value)} placeholder="Область (React, TS...)" className="flex-1 p-2 border rounded" />
        <select value={level} onChange={e=>setLevel(e.target.value)} className="p-2 border rounded">
          <option>Junior</option>
          <option>Middle</option>
          <option>Senior</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded">Добавить</button>
      </div>
    </form>
  );
}

function NotesEditor({ value, onChange }) {
  return (
    <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder="Личные заметки, ссылки на задания, таймплан..." className="w-full p-2 border rounded mt-1 h-20" />
  );
}
