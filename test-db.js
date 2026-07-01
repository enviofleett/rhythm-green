import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '/Users/alli/zen_antigravity/zen/rhythm-green/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
  console.log("=== RUNNING DATABASE VERIFICATION TEST ===\\n");

  // 1. Fetch Orders
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*, order_items(*)');
    
  if (ordersError) {
    console.error("Error fetching orders:", ordersError.message);
  } else {
    console.log(`✅ Fetched ${orders.length} Orders.`);
    
    // Calculate metrics exactly like the admin dashboard
    const validOrders = orders.filter(o => ['paid', 'shipped', 'delivered'].includes(o.status));
    const totalRevenue = validOrders.reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);
    const avgOrderValue = validOrders.length > 0 ? totalRevenue / validOrders.length : 0;
    
    console.log(`   - Valid Orders (Paid/Shipped/Delivered): ${validOrders.length}`);
    console.log(`   - Total Revenue: ₦${totalRevenue.toLocaleString()}`);
    console.log(`   - Average Order Value: ₦${avgOrderValue.toLocaleString()}`);
    
    console.log("\\nOrder Sample:");
    orders.slice(0, 3).forEach(o => {
      console.log(`   [${o.status.toUpperCase()}] ₦${o.total_amount} to ${o.shipping_city} (${o.order_items.length} items)`);
    });
  }

  console.log("\\n-----------------------------------\\n");

  // 2. Fetch Discount Codes
  const { data: codes, error: codesError } = await supabase
    .from('discount_codes')
    .select('*');
    
  if (codesError) {
    console.error("Error fetching discount codes:", codesError.message);
  } else {
    console.log(`✅ Fetched ${codes.length} Discount Codes.`);
    codes.forEach(c => {
      console.log(`   - Code: ${c.code} | Value: ${c.discount_value}${c.discount_type === 'percentage' ? '%' : ' flat'} | Used: ${c.usage_count} times`);
    });
  }

  console.log("\\n-----------------------------------\\n");

  // 3. Fetch Partner Applications
  const { data: partners, error: partnersError } = await supabase
    .from('partner_applications')
    .select('*');

  if (partnersError) {
    console.error("Error fetching partners:", partnersError.message);
  } else {
    console.log(`✅ Fetched ${partners.length} Partner Applications.`);
    partners.forEach(p => {
      console.log(`   - [${p.status.toUpperCase()}] ${p.full_name} from ${p.city} (Expected Qty: ${p.expected_purchase_quantity})`);
    });
  }
}

runTest();
