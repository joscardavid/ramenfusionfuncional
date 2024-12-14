import { supabase } from '../config/supabase.js';

export async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
}

export async function requireStaff(req, res, next) {
  try {
    if (req.user?.user_metadata?.role !== 'staff') {
      return res.status(403).json({ message: 'Staff access required' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
}