/*
  # Insert sample data for DC Creator Cut competition

  1. Sample Films
    - Insert 6 DC films with details
    
  2. Sample Songs
    - Insert 6 DC soundtrack songs with details

  3. Notes
    - All vote counts start at 0
    - Poster URLs use placeholder images
*/

-- Insert sample films
INSERT INTO films (title, director, year, poster_url) VALUES
('The Dark Knight', 'Christopher Nolan', 2008, 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Wonder Woman', 'Patty Jenkins', 2017, 'https://images.pexels.com/photos/7991188/pexels-photo-7991188.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Justice League', 'Zack Snyder', 2021, 'https://images.pexels.com/photos/7991225/pexels-photo-7991225.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Aquaman', 'James Wan', 2018, 'https://images.pexels.com/photos/7991234/pexels-photo-7991234.jpeg?auto=compress&cs=tinysrgb&w=400'),
('The Flash', 'Andy Muschietti', 2023, 'https://images.pexels.com/photos/7991245/pexels-photo-7991245.jpeg?auto=compress&cs=tinysrgb&w=400'),
('Batman Begins', 'Christopher Nolan', 2005, 'https://images.pexels.com/photos/7991256/pexels-photo-7991256.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT DO NOTHING;

-- Insert sample songs
INSERT INTO songs (title, artist, album, duration) VALUES
('Can You Read My Mind', 'John Williams', 'Superman: The Movie', '4:32'),
('Wonder Woman Theme', 'Hans Zimmer', 'Batman v Superman', '3:28'),
('The Dark Knight Theme', 'Hans Zimmer', 'The Dark Knight', '5:12'),
('At the Speed of Force', 'Benjamin Wallfisch', 'The Flash', '4:45'),
('Ocean to Ocean', 'Rupert Gregson-Williams', 'Aquaman', '3:56'),
('Kal-El Returns', 'Hans Zimmer', 'Man of Steel', '4:18')
ON CONFLICT DO NOTHING;