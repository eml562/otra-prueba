/*
  # Fix RLS policies for customers table

  1. Changes
    - Drop existing RLS policies that are causing access issues
    - Create new policies that properly handle authentication
    - Ensure authenticated users can perform CRUD operations on customers
  
  2. Security
    - Maintain RLS enabled on customers table
    - Add policies for authenticated users to manage customer records
    - Policies allow full access for authenticated users while maintaining security
*/

-- Drop existing policies to recreate them with proper permissions
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON customers;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON customers;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON customers;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON customers;

-- Create new policies with proper permissions
CREATE POLICY "Enable read access for authenticated users" ON customers
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON customers
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON customers
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete access for authenticated users" ON customers
FOR DELETE TO authenticated
USING (true);