-- Insert sample restaurants
INSERT INTO restaurants (name, cuisine, description, address, phone, email, rating, review_count, delivery_fee, min_delivery_time, max_delivery_time, featured, image_url) VALUES
('Mario''s Italian Kitchen', 'Italian', 'Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.', '123 Main Street, Downtown', '(555) 123-4567', 'info@mariositalian.com', 4.5, 324, 2.99, 25, 35, true, '/placeholder.svg?height=200&width=300'),
('Dragon Palace', 'Chinese', 'Traditional Chinese dishes with modern presentation and authentic flavors.', '456 Oak Avenue, Chinatown', '(555) 234-5678', 'orders@dragonpalace.com', 4.3, 256, 1.99, 30, 40, false, '/placeholder.svg?height=200&width=300'),
('Burger Junction', 'American', 'Gourmet burgers made with premium ingredients and served with crispy fries.', '789 Elm Street, Food District', '(555) 345-6789', 'hello@burgerjunction.com', 4.7, 189, 3.49, 20, 30, true, '/placeholder.svg?height=200&width=300'),
('Spice Garden', 'Indian', 'Aromatic Indian cuisine with authentic spices and traditional cooking methods.', '321 Pine Road, Little India', '(555) 456-7890', 'contact@spicegarden.com', 4.4, 142, 2.49, 35, 45, false, '/placeholder.svg?height=200&width=300');

-- Insert menu categories for Mario's Italian Kitchen
INSERT INTO menu_categories (restaurant_id, name, description, sort_order) VALUES
(1, 'Appetizers', 'Start your meal with our delicious appetizers', 1),
(1, 'Main Courses', 'Our signature pasta dishes and entrees', 2),
(1, 'Desserts', 'Sweet endings to your perfect meal', 3);

-- Insert menu items for Mario's Italian Kitchen
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image_url, preparation_time) VALUES
(1, 1, 'Bruschetta', 'Grilled bread topped with fresh tomatoes, basil, and mozzarella', 8.99, '/placeholder.svg?height=150&width=200', 10),
(1, 1, 'Calamari Rings', 'Crispy fried squid rings served with marinara sauce', 12.99, '/placeholder.svg?height=150&width=200', 12),
(1, 2, 'Spaghetti Carbonara', 'Classic pasta with eggs, cheese, pancetta, and black pepper', 16.99, '/placeholder.svg?height=150&width=200', 18),
(1, 2, 'Margherita Pizza', 'Traditional pizza with tomato sauce, mozzarella, and fresh basil', 14.99, '/placeholder.svg?height=150&width=200', 20),
(1, 2, 'Chicken Parmigiana', 'Breaded chicken breast with marinara sauce and melted cheese', 19.99, '/placeholder.svg?height=150&width=200', 25),
(1, 3, 'Tiramisu', 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone', 7.99, '/placeholder.svg?height=150&width=200', 5);

-- Insert menu categories for Dragon Palace
INSERT INTO menu_categories (restaurant_id, name, description, sort_order) VALUES
(2, 'Appetizers', 'Traditional Chinese starters', 1),
(2, 'Main Dishes', 'Authentic Chinese entrees', 2),
(2, 'Rice & Noodles', 'Fried rice and noodle dishes', 3);

-- Insert menu items for Dragon Palace
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image_url, preparation_time) VALUES
(2, 4, 'Spring Rolls', 'Crispy vegetable spring rolls with sweet and sour sauce', 6.99, '/placeholder.svg?height=150&width=200', 8),
(2, 4, 'Pot Stickers', 'Pan-fried dumplings filled with pork and vegetables', 9.99, '/placeholder.svg?height=150&width=200', 12),
(2, 5, 'Kung Pao Chicken', 'Spicy chicken with peanuts and vegetables in savory sauce', 15.99, '/placeholder.svg?height=150&width=200', 20),
(2, 5, 'Sweet and Sour Pork', 'Battered pork with bell peppers and pineapple', 14.99, '/placeholder.svg?height=150&width=200', 18),
(2, 6, 'Fried Rice', 'Wok-fried rice with eggs, vegetables, and your choice of protein', 12.99, '/placeholder.svg?height=150&width=200', 15),
(2, 6, 'Lo Mein Noodles', 'Soft noodles stir-fried with vegetables and sauce', 13.99, '/placeholder.svg?height=150&width=200', 16);

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, phone) VALUES
('john.doe@email.com', '$2b$10$example_hash_1', 'John', 'Doe', '(555) 111-2222'),
('jane.smith@email.com', '$2b$10$example_hash_2', 'Jane', 'Smith', '(555) 333-4444'),
('mike.johnson@email.com', '$2b$10$example_hash_3', 'Mike', 'Johnson', '(555) 555-6666');

-- Insert sample orders
INSERT INTO orders (user_id, restaurant_id, status, subtotal, delivery_fee, tax, total, delivery_address, payment_method, payment_status, created_at) VALUES
(1, 1, 'delivered', 31.98, 2.99, 2.56, 37.53, '123 Customer Street, Apt 4B', 'card', 'completed', '2024-01-15 19:00:00'),
(2, 2, 'delivered', 25.98, 1.99, 2.08, 30.05, '456 User Avenue, Unit 2A', 'paypal', 'completed', '2024-01-12 18:30:00'),
(1, 1, 'preparing', 16.99, 2.99, 1.36, 21.34, '123 Customer Street, Apt 4B', 'card', 'completed', CURRENT_TIMESTAMP);

-- Insert order items
INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price, total_price) VALUES
(1, 3, 1, 16.99, 16.99),
(1, 4, 1, 14.99, 14.99),
(2, 7, 1, 15.99, 15.99),
(2, 11, 1, 12.99, 12.99),
(3, 3, 1, 16.99, 16.99);

-- Insert sample reviews
INSERT INTO reviews (user_id, restaurant_id, order_id, rating, comment) VALUES
(1, 1, 1, 5, 'Amazing food! The carbonara was perfectly creamy and the pizza was authentic. Will definitely order again!'),
(2, 2, 2, 4, 'Good Chinese food with generous portions. The Kung Pao chicken had the right amount of spice.'),
(1, 1, NULL, 5, 'My go-to Italian restaurant. Never disappoints!');

-- Insert order status history
INSERT INTO order_status_history (order_id, status, timestamp) VALUES
(1, 'confirmed', '2024-01-15 19:01:00'),
(1, 'preparing', '2024-01-15 19:05:00'),
(1, 'ready', '2024-01-15 19:20:00'),
(1, 'picked_up', '2024-01-15 19:25:00'),
(1, 'delivered', '2024-01-15 19:45:00'),
(2, 'confirmed', '2024-01-12 18:31:00'),
(2, 'preparing', '2024-01-12 18:35:00'),
(2, 'ready', '2024-01-12 18:50:00'),
(2, 'picked_up', '2024-01-12 18:55:00'),
(2, 'delivered', '2024-01-12 19:15:00'),
(3, 'confirmed', CURRENT_TIMESTAMP),
(3, 'preparing', CURRENT_TIMESTAMP + INTERVAL '5 minutes');
