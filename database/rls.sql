-- Enable RLS on all tables
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for tables table
CREATE POLICY "Public users can view available tables" ON tables
  FOR SELECT
  USING (status = 'available');

CREATE POLICY "Staff can manage all tables" ON tables
  FOR ALL
  USING (auth.role() = 'staff');

-- Create policies for table_availability table
CREATE POLICY "Public users can view available time slots" ON table_availability
  FOR SELECT
  USING (status = 'available');

CREATE POLICY "Staff can manage all availability" ON table_availability
  FOR ALL
  USING (auth.role() = 'staff');

-- Create policies for reservations table
CREATE POLICY "Users can view their own reservations" ON reservations
  FOR SELECT
  USING (customer_email = auth.email());

CREATE POLICY "Users can create their own reservations" ON reservations
  FOR INSERT
  WITH CHECK (customer_email = auth.email());

CREATE POLICY "Users can update their own reservations" ON reservations
  FOR UPDATE
  USING (customer_email = auth.email())
  WITH CHECK (customer_email = auth.email());

CREATE POLICY "Users can delete their own reservations" ON reservations
  FOR DELETE
  USING (customer_email = auth.email());

CREATE POLICY "Staff can manage all reservations" ON reservations
  FOR ALL
  USING (auth.role() = 'staff');

-- Create policies for notifications table
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT
  USING (
    recipient_email = auth.email() OR
    EXISTS (
      SELECT 1 FROM reservations r
      WHERE r.id = reservation_id
      AND r.customer_email = auth.email()
    )
  );

CREATE POLICY "Staff can manage all notifications" ON notifications
  FOR ALL
  USING (auth.role() = 'staff');

-- Create a function to check if user is staff
CREATE OR REPLACE FUNCTION auth.is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = auth.uid()
    AND raw_user_meta_data->>'role' = 'staff'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update services to handle RLS
CREATE OR REPLACE FUNCTION check_table_availability(
  p_table_id UUID,
  p_date DATE,
  p_time_slot VARCHAR
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM table_availability
    WHERE table_id = p_table_id
    AND date = p_date
    AND time_slot = p_time_slot
    AND status = 'reserved'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;