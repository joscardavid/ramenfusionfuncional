-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tables for restaurant management
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  number VARCHAR(10) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL,
  seats INTEGER NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_status CHECK (status IN ('available', 'reserved', 'blocked', 'maintenance'))
);

-- Reservations
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID NOT NULL REFERENCES tables(id),
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  time_slot VARCHAR(10) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'confirmed',
  purpose VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_status CHECK (status IN ('confirmed', 'cancelled', 'completed'))
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  recipient_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_type CHECK (type IN ('confirmation', 'cancellation', 'reminder')),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'sent', 'failed'))
);

-- Insert initial table data
INSERT INTO tables (number, type, seats, status) VALUES
  ('BAR-01', 'bar', 4, 'available'),
  ('T4-01', '4-seater', 4, 'available'),
  ('T4-02', '4-seater', 4, 'available'),
  ('T2-01', '2-seater', 2, 'available'),
  ('T2-02', '2-seater', 2, 'available'),
  ('T5-01', '5-seater', 5, 'available'),
  ('T5-02', '5-seater', 5, 'available'),
  ('VIP-01', '8-seater', 8, 'available');

-- Create indexes
CREATE INDEX idx_reservations_date_time ON reservations(date, time_slot);
CREATE INDEX idx_reservations_table ON reservations(table_id);
CREATE INDEX idx_notifications_status ON notifications(status);