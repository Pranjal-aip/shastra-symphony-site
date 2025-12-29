import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

interface Camp {
  id: string;
  title_en: string;
  title_hi: string | null;
  title_sa: string | null;
  description_en: string | null;
  description_hi: string | null;
  description_sa: string | null;
  thumbnail: string | null;
  start_date: string;
  end_date: string;
  age_category: string;
  age_min: number | null;
  age_max: number | null;
  location: string | null;
  price: string | null;
  registration_link: string | null;
  is_active: boolean;
}

interface CampsTabProps {
  toast: any;
}

const ageCategories = [
  { value: 'all', label: 'All Ages' },
  { value: 'kids', label: 'Kids (5-10)' },
  { value: 'teens', label: 'Teens (11-17)' },
  { value: 'adults', label: 'Adults (18+)' },
  { value: 'family', label: 'Family' },
];

const CampsTab: React.FC<CampsTabProps> = ({ toast }) => {
  const [camps, setCamps] = useState<Camp[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCamp, setEditingCamp] = useState<Camp | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title_en: '',
    title_hi: '',
    title_sa: '',
    description_en: '',
    description_hi: '',
    description_sa: '',
    thumbnail: '/placeholder.svg',
    start_date: '',
    end_date: '',
    age_category: 'all',
    age_min: '',
    age_max: '',
    location: '',
    price: '',
    registration_link: '',
    is_active: true,
  });

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('camps')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (data) {
      setCamps(data);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_hi: '',
      title_sa: '',
      description_en: '',
      description_hi: '',
      description_sa: '',
      thumbnail: '/placeholder.svg',
      start_date: '',
      end_date: '',
      age_category: 'all',
      age_min: '',
      age_max: '',
      location: '',
      price: '',
      registration_link: '',
      is_active: true,
    });
  };

  const handleAddCamp = async () => {
    if (!formData.title_en || !formData.start_date || !formData.end_date) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('camps').insert({
        title_en: formData.title_en,
        title_hi: formData.title_hi || null,
        title_sa: formData.title_sa || null,
        description_en: formData.description_en || null,
        description_hi: formData.description_hi || null,
        description_sa: formData.description_sa || null,
        thumbnail: formData.thumbnail || '/placeholder.svg',
        start_date: formData.start_date,
        end_date: formData.end_date,
        age_category: formData.age_category,
        age_min: formData.age_min ? parseInt(formData.age_min) : null,
        age_max: formData.age_max ? parseInt(formData.age_max) : null,
        location: formData.location || null,
        price: formData.price || null,
        registration_link: formData.registration_link || null,
        is_active: formData.is_active,
      });

      if (error) throw error;

      toast({ title: 'Success', description: 'Camp added successfully' });
      setIsAddOpen(false);
      resetForm();
      fetchCamps();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add camp', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = (camp: Camp) => {
    setEditingCamp(camp);
    setFormData({
      title_en: camp.title_en,
      title_hi: camp.title_hi || '',
      title_sa: camp.title_sa || '',
      description_en: camp.description_en || '',
      description_hi: camp.description_hi || '',
      description_sa: camp.description_sa || '',
      thumbnail: camp.thumbnail || '/placeholder.svg',
      start_date: camp.start_date,
      end_date: camp.end_date,
      age_category: camp.age_category,
      age_min: camp.age_min?.toString() || '',
      age_max: camp.age_max?.toString() || '',
      location: camp.location || '',
      price: camp.price || '',
      registration_link: camp.registration_link || '',
      is_active: camp.is_active,
    });
    setIsEditOpen(true);
  };

  const handleUpdateCamp = async () => {
    if (!editingCamp || !formData.title_en || !formData.start_date || !formData.end_date) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('camps').update({
        title_en: formData.title_en,
        title_hi: formData.title_hi || null,
        title_sa: formData.title_sa || null,
        description_en: formData.description_en || null,
        description_hi: formData.description_hi || null,
        description_sa: formData.description_sa || null,
        thumbnail: formData.thumbnail || '/placeholder.svg',
        start_date: formData.start_date,
        end_date: formData.end_date,
        age_category: formData.age_category,
        age_min: formData.age_min ? parseInt(formData.age_min) : null,
        age_max: formData.age_max ? parseInt(formData.age_max) : null,
        location: formData.location || null,
        price: formData.price || null,
        registration_link: formData.registration_link || null,
        is_active: formData.is_active,
      }).eq('id', editingCamp.id);

      if (error) throw error;

      toast({ title: 'Success', description: 'Camp updated successfully' });
      setIsEditOpen(false);
      setEditingCamp(null);
      resetForm();
      fetchCamps();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update camp', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('camps').delete().eq('id', deleteConfirm);
      if (error) throw error;

      toast({ title: 'Deleted', description: 'Camp removed successfully' });
      fetchCamps();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete camp', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
      setDeleteConfirm(null);
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from('camps').update({ is_active: !currentStatus }).eq('id', id);
      if (error) throw error;
      fetchCamps();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  const campFormFieldsJSX = (
    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
      {/* Image URL */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Camp Image URL</label>
        <div className="flex items-start gap-4">
          <img src={formData.thumbnail || '/placeholder.svg'} alt="" className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
          <div className="flex-1">
            <Input 
              placeholder="Paste image URL here" 
              value={formData.thumbnail} 
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })} 
            />
          </div>
        </div>
      </div>

      {/* Titles */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (English) *</label>
        <Input placeholder="Camp Title" value={formData.title_en} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (Hindi)</label>
        <Input placeholder="शिविर का शीर्षक" value={formData.title_hi} onChange={(e) => setFormData({ ...formData, title_hi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Title (Sanskrit)</label>
        <Input placeholder="शिविरस्य शीर्षकम्" value={formData.title_sa} onChange={(e) => setFormData({ ...formData, title_sa: e.target.value })} />
      </div>

      {/* Descriptions */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Description (English)</label>
        <Textarea placeholder="Camp description..." value={formData.description_en} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Hindi)</label>
        <Textarea placeholder="शिविर विवरण..." value={formData.description_hi} onChange={(e) => setFormData({ ...formData, description_hi: e.target.value })} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description (Sanskrit)</label>
        <Textarea placeholder="शिविरविवरणम्..." value={formData.description_sa} onChange={(e) => setFormData({ ...formData, description_sa: e.target.value })} />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date *</label>
          <Input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">End Date *</label>
          <Input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
        </div>
      </div>

      {/* Age Category & Range */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Age Category</label>
        <Select value={formData.age_category} onValueChange={(v) => setFormData({ ...formData, age_category: v })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ageCategories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Age (optional)</label>
          <Input type="number" placeholder="e.g., 5" value={formData.age_min} onChange={(e) => setFormData({ ...formData, age_min: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Age (optional)</label>
          <Input type="number" placeholder="e.g., 12" value={formData.age_max} onChange={(e) => setFormData({ ...formData, age_max: e.target.value })} />
        </div>
      </div>

      {/* Location & Price */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Location</label>
        <Input placeholder="e.g., Vrindavan, UP" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Price</label>
        <Input placeholder="e.g., ₹5000 or Free" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Registration Link</label>
        <Input placeholder="https://..." value={formData.registration_link} onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })} />
      </div>

      {/* Active Toggle */}
      <div className="flex items-center gap-3 pt-2">
        <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
        <Label>Active (visible on frontend)</Label>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="font-body text-muted-foreground">{camps.length} camps</p>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <Button onClick={() => { resetForm(); setIsAddOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" /> Add Camp
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Camp</DialogTitle>
            </DialogHeader>
            {campFormFieldsJSX}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddCamp} disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Camp
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Camps Table */}
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Camp</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Age Group</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {camps.map((camp) => (
              <TableRow key={camp.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img src={camp.thumbnail || '/placeholder.svg'} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <span className="font-body font-medium">{camp.title_en}</span>
                      {camp.price && <p className="text-sm text-muted-foreground">{camp.price}</p>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-body text-sm">
                    {new Date(camp.start_date).toLocaleDateString()} - {new Date(camp.end_date).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-body">
                    {ageCategories.find(c => c.value === camp.age_category)?.label || camp.age_category}
                    {(camp.age_min !== null || camp.age_max !== null) && (
                      <span className="text-muted-foreground text-sm">
                        {' '}({camp.age_min || '?'}-{camp.age_max || '?'} yrs)
                      </span>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-body text-sm">{camp.location || '-'}</span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(camp.id, camp.is_active)}
                    className={camp.is_active ? 'text-green-600' : 'text-muted-foreground'}
                  >
                    {camp.is_active ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                    {camp.is_active ? 'Active' : 'Hidden'}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditClick(camp)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteConfirm(camp.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {camps.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No camps created yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Camp</DialogTitle>
          </DialogHeader>
          {campFormFieldsJSX}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateCamp} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Camp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Camp"
        description="Are you sure you want to delete this camp? This action cannot be undone."
      />
    </div>
  );
};

export default CampsTab;
