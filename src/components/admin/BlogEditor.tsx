import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, EditorContent, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import Youtube from '@tiptap/extension-youtube';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import DOMPurify from 'dompurify';
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Quote, Link2,
  Image as ImageIcon, Code, Code2, Table as TableIcon, Youtube as YoutubeIcon,
  Heading1, Heading2, Heading3, Heading4, Undo2, Redo2, Smartphone, Tablet,
  Monitor, Save, Send, Calendar as CalendarIcon, Eye, Clock, Hash, X, Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import ImageUpload from './ImageUpload';
import type { Category } from '@/contexts/AdminContext';

const lowlight = createLowlight(common);

export type Lang = 'en' | 'hi' | 'sa';
type TriLang = { en: string; hi: string; sa: string };

export interface BlogEditorData {
  title: TriLang;
  excerpt: TriLang;
  content: TriLang;
  customHtml: TriLang;
  customCss: string;
  thumbnail: string;
  ogImage: string;
  category: string;
  author: string;
  tags: string[];
  seoTitle: TriLang;
  seoDescription: TriLang;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt: string;
  showOnHome: boolean;
}

export const emptyBlogEditorData = (): BlogEditorData => ({
  title: { en: '', hi: '', sa: '' },
  excerpt: { en: '', hi: '', sa: '' },
  content: { en: '', hi: '', sa: '' },
  customHtml: { en: '', hi: '', sa: '' },
  customCss: '',
  thumbnail: '/placeholder.svg',
  ogImage: '',
  category: '',
  author: '',
  tags: [],
  seoTitle: { en: '', hi: '', sa: '' },
  seoDescription: { en: '', hi: '', sa: '' },
  status: 'published',
  scheduledAt: '',
  showOnHome: false,
});

// Sanitizer config: allow common formatting + iframes for embeds; strip scripts/handlers.
const sanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ['iframe', 'style'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'rel'],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur'],
  });

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const readingTime = (text: string) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

// ---------------- Toolbar ----------------
const ToolbarBtn: React.FC<{
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}> = ({ onClick, active, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={cn(
      'h-8 w-8 inline-flex items-center justify-center rounded-md transition-all',
      'hover:bg-muted text-muted-foreground hover:text-foreground',
      active && 'bg-primary/15 text-primary hover:bg-primary/20'
    )}
  >
    {children}
  </button>
);

const EditorToolbar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (!url) return;
    editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run();
  };
  const addImage = () => {
    const url = window.prompt('Enter image URL');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };
  const addYoutube = () => {
    const url = window.prompt('Enter YouTube URL');
    if (url) editor.commands.setYoutubeVideo({ src: url, width: 640, height: 360 });
  };
  const addTable = () =>
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();

  return (
    <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30 sticky top-0 z-10 backdrop-blur">
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1"><Heading1 className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive('heading', { level: 4 })} title="Heading 4"><Heading4 className="h-4 w-4" /></ToolbarBtn>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><Bold className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><Italic className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><UnderlineIcon className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><Code className="h-4 w-4" /></ToolbarBtn>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List"><List className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List"><ListOrdered className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Quote"><Quote className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code Block"><Code2 className="h-4 w-4" /></ToolbarBtn>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <ToolbarBtn onClick={addLink} active={editor.isActive('link')} title="Link"><Link2 className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={addImage} title="Image"><ImageIcon className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={addYoutube} title="YouTube"><YoutubeIcon className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={addTable} title="Table"><TableIcon className="h-4 w-4" /></ToolbarBtn>
      <Separator orientation="vertical" className="h-6 mx-1" />
      <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo2 className="h-4 w-4" /></ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo2 className="h-4 w-4" /></ToolbarBtn>
    </div>
  );
};

// ---------------- Rich editor per-language ----------------
const RichEditor: React.FC<{
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer nofollow' } }),
      Image.configure({ HTMLAttributes: { class: 'rounded-lg my-3 max-w-full h-auto' } }),
      Placeholder.configure({ placeholder: placeholder || 'Start writing your story…' }),
      Table.configure({ resizable: true, HTMLAttributes: { class: 'border-collapse w-full my-3' } }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ width: 640, height: 360, HTMLAttributes: { class: 'rounded-lg my-3 max-w-full' } }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'prose prose-sm md:prose-base dark:prose-invert max-w-none focus:outline-none min-h-[280px] p-4 prose-headings:font-heading prose-img:rounded-lg prose-pre:bg-zinc-900 prose-pre:text-zinc-100',
      },
    },
  });

  // sync external value changes (e.g. language switch)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || '', { emitUpdate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="border rounded-lg overflow-hidden bg-background shadow-sm">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

// ---------------- HTML / CSS editor ----------------
const CodeEditor: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  language: 'html' | 'css';
  error?: string;
}> = ({ label, value, onChange, language, error }) => {
  const format = () => {
    // simple format: collapse multiple blank lines, trim trailing spaces
    const formatted = value
      .split('\n')
      .map((l) => l.replace(/\s+$/g, ''))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n');
    onChange(formatted);
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          {error && <span className="text-xs text-destructive">{error}</span>}
          <Button type="button" variant="ghost" size="sm" onClick={format} className="h-7 text-xs">Auto-format</Button>
        </div>
      </div>
      <Textarea
        spellCheck={false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={language === 'html' ? '<div class="my-block">Custom HTML…</div>' : '.my-block { color: hsl(var(--primary)); }'}
        className="font-mono text-xs leading-relaxed min-h-[260px] bg-zinc-950 text-zinc-100 border-zinc-800 focus-visible:ring-primary/50"
      />
    </div>
  );
};

// ---------------- Device preview ----------------
type Device = 'mobile' | 'tablet' | 'desktop';
const deviceWidth: Record<Device, string> = { mobile: '375px', tablet: '768px', desktop: '100%' };

const LivePreview: React.FC<{
  title: string;
  excerpt: string;
  content: string;
  customHtml: string;
  customCss: string;
  thumbnail: string;
  author: string;
  category: string;
  tags: string[];
}> = ({ title, excerpt, content, customHtml, customCss, thumbnail, author, category, tags }) => {
  const [device, setDevice] = useState<Device>('desktop');
  const safeContent = useMemo(() => sanitize(content), [content]);
  const safeCustomHtml = useMemo(() => sanitize(customHtml), [customHtml]);
  const safeCss = useMemo(() => (customCss || '').replace(/<\/?style[^>]*>/gi, ''), [customCss]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 rounded-lg bg-muted">
          {(['mobile', 'tablet', 'desktop'] as Device[]).map((d) => {
            const Icon = d === 'mobile' ? Smartphone : d === 'tablet' ? Tablet : Monitor;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium inline-flex items-center gap-1.5 transition',
                  device === d ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="h-3.5 w-3.5" /> {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            );
          })}
        </div>
        <span className="text-xs text-muted-foreground">Sanitized live preview</span>
      </div>

      <div className="bg-muted/40 rounded-xl p-3 md:p-6 overflow-auto">
        <div
          className="mx-auto bg-background rounded-lg shadow-lg transition-all duration-300 overflow-hidden"
          style={{ width: deviceWidth[device], maxWidth: '100%' }}
        >
          {thumbnail && thumbnail !== '/placeholder.svg' && (
            <img src={thumbnail} alt={title} className="w-full h-48 md:h-64 object-cover" />
          )}
          <article className="p-5 md:p-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
              {category && <Badge variant="secondary">{category}</Badge>}
              {author && <span>By {author}</span>}
            </div>
            <h1 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-3">
              {title || 'Untitled post'}
            </h1>
            {excerpt && <p className="text-muted-foreground text-base md:text-lg mb-6">{excerpt}</p>}
            {safeCss && <style dangerouslySetInnerHTML={{ __html: safeCss }} />}
            <div
              className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-heading"
              dangerouslySetInnerHTML={{ __html: safeContent }}
            />
            {safeCustomHtml && (
              <div className="mt-6 pt-6 border-t" dangerouslySetInnerHTML={{ __html: safeCustomHtml }} />
            )}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-8 pt-6 border-t">
                {tags.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs"><Hash className="h-3 w-3 mr-0.5" />{t}</Badge>
                ))}
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
};

// ---------------- Tag input ----------------
const TagInput: React.FC<{ tags: string[]; onChange: (t: string[]) => void }> = ({ tags, onChange }) => {
  const [input, setInput] = useState('');
  const add = () => {
    const v = input.trim().replace(/,$/, '');
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput('');
  };
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 p-2 border rounded-md bg-background min-h-[42px]">
        {tags.map((t) => (
          <Badge key={t} variant="secondary" className="gap-1 pl-2 pr-1 py-0.5">
            <Hash className="h-3 w-3 opacity-60" />
            {t}
            <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))} className="ml-0.5 rounded hover:bg-background/60">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
            if (e.key === 'Backspace' && !input && tags.length) onChange(tags.slice(0, -1));
          }}
          onBlur={add}
          placeholder={tags.length ? '' : 'Add tag and press Enter…'}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-sm px-1"
        />
      </div>
    </div>
  );
};

// ---------------- Main BlogEditor ----------------
const LANG_LABEL: Record<Lang, string> = { en: 'English', hi: 'हिंदी', sa: 'संस्कृतम्' };

interface Props {
  data: BlogEditorData;
  setData: (d: BlogEditorData) => void;
  categories: Category[];
  autosaveKey?: string;
}

const BlogEditor: React.FC<Props> = ({ data, setData, categories, autosaveKey }) => {
  const [lang, setLang] = useState<Lang>('en');
  const [autosavedAt, setAutosavedAt] = useState<Date | null>(null);
  const dataRef = useRef(data);
  dataRef.current = data;

  // autosave to localStorage
  useEffect(() => {
    if (!autosaveKey) return;
    const t = setInterval(() => {
      try {
        localStorage.setItem(autosaveKey, JSON.stringify(dataRef.current));
        setAutosavedAt(new Date());
      } catch { /* ignore */ }
    }, 5000);
    return () => clearInterval(t);
  }, [autosaveKey]);

  // restore once
  useEffect(() => {
    if (!autosaveKey) return;
    const has = (data.title.en || data.content.en);
    if (has) return;
    try {
      const raw = localStorage.getItem(autosaveKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') setData({ ...emptyBlogEditorData(), ...parsed });
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = <K extends keyof BlogEditorData>(k: K, v: BlogEditorData[K]) => setData({ ...data, [k]: v });
  const setTri = (k: 'title' | 'excerpt' | 'content' | 'customHtml' | 'seoTitle' | 'seoDescription', v: string) =>
    setData({ ...data, [k]: { ...data[k], [lang]: v } });

  // Validation for HTML/CSS
  const htmlError = useMemo(() => {
    const html = data.customHtml[lang] || '';
    if (!html) return '';
    if (/<script[\s>]/i.test(html)) return 'Script tags are not allowed';
    const opens = (html.match(/</g) || []).length;
    const closes = (html.match(/>/g) || []).length;
    if (opens !== closes) return 'Unbalanced angle brackets';
    return '';
  }, [data.customHtml, lang]);

  const cssError = useMemo(() => {
    const css = data.customCss || '';
    if (!css) return '';
    if (/<\/?script/i.test(css) || /javascript:/i.test(css) || /expression\(/i.test(css)) return 'Unsafe CSS';
    const op = (css.match(/{/g) || []).length;
    const cl = (css.match(/}/g) || []).length;
    if (op !== cl) return 'Unbalanced braces';
    return '';
  }, [data.customCss]);

  const plainText = useMemo(() => stripHtml(data.content[lang] || ''), [data.content, lang]);
  const chars = plainText.length;
  const minutes = readingTime(plainText);

  return (
    <div className="space-y-5">
      {/* Top meta strip */}
      <Card className="p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-primary/20">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Featured Image *</Label>
            <ImageUpload
              value={data.thumbnail}
              onChange={(url) => set('thumbnail', url || '/placeholder.svg')}
              label=""
              hint="Recommended 1200×630px"
            />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Category *</Label>
                <Select value={data.category} onValueChange={(v) => set('category', v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c.id} value={c.name.en}>{c.name.en}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Author</Label>
                <Input value={data.author} onChange={(e) => set('author', e.target.value)} placeholder="Shastrakulam Team" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tags</Label>
              <TagInput tags={data.tags} onChange={(t) => set('tags', t)} />
            </div>
            <div className="flex items-center justify-between pt-1">
              <Label htmlFor="showOnHome" className="text-sm">Show on home page</Label>
              <Switch id="showOnHome" checked={data.showOnHome} onCheckedChange={(v) => set('showOnHome', v)} />
            </div>
          </div>
        </div>
      </Card>

      {/* Language pills */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="inline-flex p-1 rounded-lg bg-muted">
          {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={cn(
                'px-4 py-1.5 rounded-md text-sm font-medium transition',
                lang === l ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {LANG_LABEL[l]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Hash className="h-3 w-3" />{chars} chars</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{minutes} min read</span>
          {autosavedAt && (
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <Save className="h-3 w-3" /> Autosaved {autosavedAt.toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Title + excerpt */}
      <div className="space-y-3">
        <Input
          value={data.title[lang]}
          onChange={(e) => setTri('title', e.target.value)}
          placeholder={lang === 'en' ? 'Your captivating title…' : lang === 'hi' ? 'आकर्षक शीर्षक…' : 'मनोहरं शीर्षकम्…'}
          className="text-2xl md:text-3xl font-heading font-bold h-auto py-3 border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
        />
        <Textarea
          value={data.excerpt[lang]}
          onChange={(e) => setTri('excerpt', e.target.value)}
          placeholder="Short excerpt — appears on cards and previews"
          className="border-0 border-b rounded-none px-0 resize-none focus-visible:ring-0 focus-visible:border-primary bg-transparent text-base"
          rows={2}
        />
      </div>

      {/* Editor tabs */}
      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 md:grid-cols-3">
          <TabsTrigger value="visual" className="gap-1.5"><Bold className="h-3.5 w-3.5" />Visual Editor</TabsTrigger>
          <TabsTrigger value="code" className="gap-1.5"><Code2 className="h-3.5 w-3.5" />HTML / CSS</TabsTrigger>
          <TabsTrigger value="preview" className="gap-1.5"><Eye className="h-3.5 w-3.5" />Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="mt-4">
          <RichEditor
            value={data.content[lang]}
            onChange={(html) => setTri('content', html)}
            placeholder={lang === 'en' ? 'Tell your story…' : lang === 'hi' ? 'अपनी कहानी लिखें…' : 'स्वकथां लिखतु…'}
          />
        </TabsContent>

        <TabsContent value="code" className="mt-4 space-y-4">
          <CodeEditor
            label={`Custom HTML (${LANG_LABEL[lang]})`}
            value={data.customHtml[lang]}
            onChange={(v) => setTri('customHtml', v)}
            language="html"
            error={htmlError}
          />
          <CodeEditor
            label="Custom CSS (applied to all languages)"
            value={data.customCss}
            onChange={(v) => set('customCss', v)}
            language="css"
            error={cssError}
          />
          <p className="text-xs text-muted-foreground">
            All custom HTML/CSS is sanitized before rendering. Scripts, event handlers, and unsafe URLs are stripped.
          </p>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <LivePreview
            title={data.title[lang]}
            excerpt={data.excerpt[lang]}
            content={data.content[lang]}
            customHtml={data.customHtml[lang]}
            customCss={data.customCss}
            thumbnail={data.thumbnail}
            author={data.author}
            category={data.category}
            tags={data.tags}
          />
        </TabsContent>
      </Tabs>

      {/* SEO + OG */}
      <Card className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary/10 text-primary inline-flex items-center justify-center">
            <Eye className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-heading font-semibold">SEO &amp; Social</h4>
            <p className="text-xs text-muted-foreground">Optimize how this post appears in search and shares</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">SEO Title ({LANG_LABEL[lang]})</Label>
            <Input
              value={data.seoTitle[lang]}
              onChange={(e) => setTri('seoTitle', e.target.value)}
              placeholder={data.title[lang] || 'Defaults to post title'}
              maxLength={70}
            />
            <p className="text-[10px] text-muted-foreground text-right">{data.seoTitle[lang].length}/70</p>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">SEO Meta Description ({LANG_LABEL[lang]})</Label>
            <Textarea
              value={data.seoDescription[lang]}
              onChange={(e) => setTri('seoDescription', e.target.value)}
              placeholder={data.excerpt[lang] || 'Short description for search engines'}
              rows={2}
              maxLength={160}
            />
            <p className="text-[10px] text-muted-foreground text-right">{data.seoDescription[lang].length}/160</p>
          </div>
        </div>
        <ImageUpload
          value={data.ogImage}
          onChange={(url) => set('ogImage', url)}
          label="Social Share Image (OG)"
          hint="1200×630px. Falls back to featured image if empty."
        />
      </Card>

      {/* Schedule */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-accent/10 text-accent-foreground inline-flex items-center justify-center">
              <CalendarIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm">Schedule publish</h4>
              <p className="text-xs text-muted-foreground">Leave empty to publish immediately</p>
            </div>
          </div>
          <Input
            type="datetime-local"
            value={data.scheduledAt}
            onChange={(e) => set('scheduledAt', e.target.value)}
            className="md:w-72"
          />
        </div>
      </Card>
    </div>
  );
};

export default BlogEditor;

export { sanitize as sanitizeBlogHtml };
