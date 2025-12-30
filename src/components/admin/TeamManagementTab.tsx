import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Shield, FileText, BookOpen, UserCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';

type AppRole = 'admin' | 'blog_writer' | 'course_manager' | 'enrollment_manager';

interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
  email?: string;
}

interface TeamManagementTabProps {
  toast: any;
}

const roleLabels: Record<AppRole, { label: string; icon: React.ReactNode; color: string }> = {
  admin: { label: 'Full Admin', icon: <Shield className="h-4 w-4" />, color: 'bg-primary text-primary-foreground' },
  blog_writer: { label: 'Blog Writer', icon: <FileText className="h-4 w-4" />, color: 'bg-blue-100 text-blue-700' },
  course_manager: { label: 'Course Manager', icon: <BookOpen className="h-4 w-4" />, color: 'bg-green-100 text-green-700' },
  enrollment_manager: { label: 'Enrollment Manager', icon: <UserCheck className="h-4 w-4" />, color: 'bg-purple-100 text-purple-700' },
};

const TeamManagementTab: React.FC<TeamManagementTabProps> = ({ toast }) => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<AppRole>('blog_writer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchUserRoles = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch user emails from auth (we can't directly, so we'll show user_id)
      setUserRoles((data || []) as UserRole[]);
    } catch (err) {
      console.error('Error fetching user roles:', err);
      toast({
        title: 'Error',
        description: 'Failed to load team members',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const handleAddRole = async () => {
    if (!newUserEmail.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a user email',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // First, we need to find the user by email
      // Since we can't query auth.users directly, we'll need to use an edge function
      // For now, we'll ask the admin to provide the user ID directly
      // But let's try to look up if there's a way
      
      // For this implementation, we'll assume the admin knows the user ID
      // Or we can create a simple lookup mechanism
      
      toast({
        title: 'Info',
        description: 'Please enter the User ID directly. You can find this when the user signs up.',
      });
      
      setIsSubmitting(false);
      return;
    } catch (err) {
      console.error('Error adding role:', err);
      toast({
        title: 'Error',
        description: 'Failed to add team member',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddRoleById = async (userId: string, role: AppRole) => {
    if (!userId.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a valid User ID',
        variant: 'destructive',
      });
      return;
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      toast({
        title: 'Error',
        description: 'Invalid User ID format. Please enter a valid UUID.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('user_roles').insert({
        user_id: userId,
        role: role,
      });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Error',
            description: 'This user already has this role',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: 'Success',
        description: `Role "${roleLabels[role].label}" assigned successfully`,
      });
      
      setIsAddDialogOpen(false);
      setNewUserEmail('');
      setNewUserRole('blog_writer');
      fetchUserRoles();
    } catch (err) {
      console.error('Error adding role:', err);
      toast({
        title: 'Error',
        description: 'Failed to add role. Make sure the User ID is valid.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!deleteConfirm) return;

    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', deleteConfirm);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Role removed successfully',
      });
      
      fetchUserRoles();
    } catch (err) {
      console.error('Error deleting role:', err);
      toast({
        title: 'Error',
        description: 'Failed to remove role',
        variant: 'destructive',
      });
    } finally {
      setDeleteConfirm(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Team Management</h2>
          <p className="font-body text-muted-foreground">Assign roles to team members for different access levels</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="saffron">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Enter the user's ID and select the role to assign
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="font-body text-sm font-medium mb-2 block">User ID</label>
                <Input
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ask the user to sign in and share their User ID from their profile
                </p>
              </div>
              <div>
                <label className="font-body text-sm font-medium mb-2 block">Role</label>
                <Select value={newUserRole} onValueChange={(v) => setNewUserRole(v as AppRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog_writer">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Blog Writer
                      </div>
                    </SelectItem>
                    <SelectItem value="course_manager">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Course Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="enrollment_manager">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Enrollment Manager
                      </div>
                    </SelectItem>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Full Admin
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                variant="saffron" 
                onClick={() => handleAddRoleById(newUserEmail, newUserRole)}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Add Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Legend */}
      <div className="bg-card rounded-xl p-4 shadow-card border border-border">
        <h3 className="font-heading text-sm font-semibold mb-3">Role Permissions</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(roleLabels).map(([role, info]) => (
            <div key={role} className="flex items-start gap-2">
              <Badge className={info.color}>
                {info.icon}
                <span className="ml-1">{info.label}</span>
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 text-sm text-muted-foreground space-y-1">
          <p><strong>Blog Writer:</strong> Can create and manage blog posts and blog categories</p>
          <p><strong>Course Manager:</strong> Can create and manage courses and course categories</p>
          <p><strong>Enrollment Manager:</strong> Can view and manage course enrollments</p>
          <p><strong>Full Admin:</strong> Has access to all features including team management</p>
        </div>
      </div>

      {/* Team Members Table */}
      <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Added On</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRoles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No team members assigned yet
                </TableCell>
              </TableRow>
            ) : (
              userRoles.map((ur) => (
                <TableRow key={ur.id}>
                  <TableCell className="font-mono text-sm">
                    {ur.user_id.substring(0, 8)}...{ur.user_id.substring(ur.user_id.length - 4)}
                  </TableCell>
                  <TableCell>
                    <Badge className={roleLabels[ur.role as AppRole]?.color || 'bg-muted'}>
                      {roleLabels[ur.role as AppRole]?.icon}
                      <span className="ml-1">{roleLabels[ur.role as AppRole]?.label || ur.role}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(ur.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteConfirm(ur.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation */}
      <DeleteConfirmDialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
        onConfirm={handleDeleteRole}
        title="Remove Role"
        description="Are you sure you want to remove this role? The user will lose access to the associated features."
      />
    </div>
  );
};

export default TeamManagementTab;
