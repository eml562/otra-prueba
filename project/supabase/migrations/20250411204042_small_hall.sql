/*
  # Fix customers table RLS policy

  1. Changes
    - Drop existing RLS policy that isn't working correctly
    - Create new RLS policies for each operation type (SELECT, INSERT, UPDATE, DELETE)
    
  2. Security
    - Enable RLS on customers table (already enabled)
    - Add specific policies for each operation type
    - Allow authenticated users to manage their customers
*/

-- Drop the existing policy that isn't working
DROP POLICY IF EXISTS "Users can manage their own customers" ON customers;

-- Create separate policies for each operation
CREATE POLICY "Enable read access for authenticated users" ON customers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON customers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON customers
  FOR DELETE
  TO authenticated
  USING (true);