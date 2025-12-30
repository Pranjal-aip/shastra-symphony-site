import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  ExternalLink,
  Copy,
  Loader2,
  FileText,
  Send,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import AILandingPageGenerator from './AILandingPageGenerator';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface AILandingPage {
  id: string;
  course_name: string;
  slug: string | null;
  status: string;
  course_category: string;
  target_audience: string[];
  tone_style: string;
  created_at: string;
  updated_at: string;
}

interface AILandingPagesTabProps {
  toast: any;
}

const AILandingPagesTab: React.FC<AILandingPagesTabProps> = ({ toast }) => {
  const [pages, setPages] = useState<AILandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_landing_pages')
        .select('id, course_name, slug, status, course_category, target_audience, tone_style, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      console.error('Error fetching pages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load landing pages',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const { error } = await supabase
        .from('ai_landing_pages')
        .delete()
        .eq('id', deleteConfirm);

      if (error) throw error;
      
      toast({ title: 'Deleted', description: 'Landing page removed successfully' });
      fetchPages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to delete landing page',
        variant: 'destructive'
      });
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'draft' | 'published') => {
    try {
      const { error } = await supabase
        .from('ai_landing_pages')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      toast({ 
        title: newStatus === 'published' ? 'Published' : 'Unpublished',
        description: `Landing page ${newStatus === 'published' ? 'is now live' : 'moved to draft'}`
      });
      fetchPages();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive'
      });
    }
  };

  const copyLink = (slug: string | null) => {
    if (!slug) return;
    const url = `${window.location.origin}/lp/${slug}`;
    navigator.clipboard.writeText(url);
    toast({ title: 'Copied!', description: 'Landing page link copied to clipboard' });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getToneLabel = (tone: string) => {
    const tones: Record<string, string> = {
      'calm-spiritual': 'Calm & Spiritual',
      'powerful-transformational': 'Powerful',
      'modern-youthful': 'Modern',
      'traditional-authentic': 'Traditional',
      'parent-friendly': 'Parent-Friendly'
    };
    return tones[tone] || tone;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-semibold">AI Landing Pages</h2>
          <p className="text-sm text-muted-foreground">
            Generate high-converting landing pages with AI
          </p>
        </div>
        <Button onClick={() => setIsGeneratorOpen(true)} className="gap-2">
          <Sparkles className="h-4 w-4" />
          Generate Landing Page with AI
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Pages</p>
          <p className="text-2xl font-bold">{pages.length}</p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Published</p>
          <p className="text-2xl font-bold text-primary">
            {pages.filter(p => p.status === 'published').length}
          </p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Drafts</p>
          <p className="text-2xl font-bold text-muted-foreground">
            {pages.filter(p => p.status === 'draft').length}
          </p>
        </div>
        <div className="bg-card border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">This Month</p>
          <p className="text-2xl font-bold text-accent">
            {pages.filter(p => {
              const created = new Date(p.created_at);
              const now = new Date();
              return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : pages.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Landing Pages Yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first AI-powered landing page to get started
          </p>
          <Button onClick={() => setIsGeneratorOpen(true)} className="gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Your First Page
          </Button>
        </div>
      ) : (
        <div className="bg-card rounded-xl border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Tone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map(page => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.course_name}</TableCell>
                  <TableCell>{page.course_category}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {page.target_audience.slice(0, 2).map(aud => (
                        <Badge key={aud} variant="secondary" className="text-xs">
                          {aud}
                        </Badge>
                      ))}
                      {page.target_audience.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{page.target_audience.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {getToneLabel(page.tone_style)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={page.status === 'published' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                      }
                    >
                      {page.status === 'published' ? 'Live' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(page.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {page.slug && (
                          <>
                            <DropdownMenuItem onClick={() => window.open(`/lp/${page.slug}`, '_blank')}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Page
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyLink(page.slug)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleStatusChange(
                            page.id, 
                            page.status === 'published' ? 'draft' : 'published'
                          )}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {page.status === 'published' ? 'Unpublish' : 'Publish'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setDeleteConfirm(page.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Generator Modal */}
      <AILandingPageGenerator 
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        toast={toast}
        onPageGenerated={fetchPages}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleDelete}
        title="Delete Landing Page"
        description="Are you sure you want to delete this landing page? This action cannot be undone."
      />
    </div>
  );
};

export default AILandingPagesTab;
