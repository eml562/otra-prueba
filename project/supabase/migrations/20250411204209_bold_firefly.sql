/*
  # Update Customer Table RLS Policies

  1. Changes
    - Drop existing overly permissive policies
    - Add new policies that properly enforce user ownership
    - Add user_id column to link customers to users
    
  2. Security
    - Enable RLS (already enabled)
    - Add policies for authenticated users to:
      - Create customers (with their user_id)
      - Read their own customers
      - Update their own customers
      - Delete their own customers
*/

-- Add user_id column to link customers to authenticated users
ALTER TABLE customers 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Update existing rows to use the current user's ID (safe no-op if no rows exist)
UPDATE customers 
SET user_id = auth.uid()
WHERE user_id IS NULL;

-- Make user_id required for future rows
ALTER TABLE customers 
ALTER COLUMN user_id SET NOT NULL;

-- Drop existing permissive policies
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON customers;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON customers;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON customers;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON customers;

-- Create new properly scoped policies
CREATE POLICY "Users can create their own customers"
ON customers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own customers"
ON customers FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own customers"
ON customers FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own customers"
ON customers FOR DELETE
TO authenticated
USING (auth.uid() = user_id);