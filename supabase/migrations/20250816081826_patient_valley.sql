/*
  # Insert films data from CSV

  1. Data Insertion
    - Insert all 19 films from the provided CSV data
    - Each film has film_id, center, and dc_film_url
    - Initialize votes and favorites to 0

  2. Data Structure
    - film_id: DCFL01, DCFL02, etc.
    - center: TNP, KOLLU, KAUP, VPM
    - dc_film_url: Google Drive links
*/

INSERT INTO films (film_id, center, dc_film_url, votes, favorites) VALUES
('DCFL01', 'KOLLU', 'https://drive.google.com/file/d/1XNTouFiFBqpMUNAolGYQBB2mya1qnleJ/view?usp=drivesdk', 0, 0),
('DCFL02', 'KOLLU', 'https://drive.google.com/file/d/1XNTouFiFBqpMUNAolGYQBB2mya1qnleJ/view?usp=drivesdk', 0, 0),
('DCFL03', 'TNP', 'https://drive.google.com/file/d/1XEJXrkdGuE9aaEazUbGrnDV1ZMOzU992/view?t=1', 0, 0),
('DCFL04', 'KOLLU', 'https://drive.google.com/file/d/14tdQqWoe8IHFqwL2llPA0VEr0Fg-8UIY/view?usp=drivesdk', 0, 0),
('DCFL05', 'KOLLU', 'https://drive.google.com/file/d/1cD5wu5-WmOGsfLp--uf4uLl6Yy3GRmbO/view?usp=drivesdk', 0, 0),
('DCFL06', 'KOLLU', 'https://drive.google.com/file/d/1cD5wu5-WmOGsfLp--uf4uLl6Yy3GRmbO/view?usp=drivesdk', 0, 0),
('DCFL07', 'KAUP', 'https://drive.google.com/file/d/1AU-skA394iifHLFBGan_iNL9YqLPDLN9/view?usp=sharing', 0, 0),
('DCFL08', 'KAUP', 'https://drive.google.com/file/d/1FZsRmfww0votpMxL2VnGcjvvpfHRJEvQ/view?usp=drive_link', 0, 0),
('DCFL09', 'KAUP', 'https://drive.google.com/file/d/1FZsRmfww0votpMxL2VnGcjvvpfHRJEvQ/view?usp=drive_link', 0, 0),
('DCFL10', 'KOLLU', 'https://drive.google.com/file/d/14tdQqWoe8IHFqwL2llPA0VEr0Fg-8UIY/view?usp=drivesdk', 0, 0),
('DCFL11', 'KOLLU', 'https://drive.google.com/file/d/1ZYQ3zqsnHj_Iw52VPYZbX541J15S6_19/view?usp=drive_link', 0, 0),
('DCFL12', 'TNP', 'https://drive.google.com/drive/folders/12Lz0gv34o5zFoFRa49T9EJoT3wa4d1wK?usp=drive_link', 0, 0),
('DCFL13', 'KOLLU', 'https://drive.google.com/drive/folders/1ZoVItOSfn1mHMsZjGQ3WcN_Wp82tGGj9?usp=sharing', 0, 0),
('DCFL14', 'KAUP', 'https://drive.google.com/file/d/1m1ROC9otxdKHGYXtUVkbwp0Mn_SsGuoM/view?usp=drive_link', 0, 0),
('DCFL15', 'KOLLU', 'https://drive.google.com/drive/folders/1ZoVItOSfn1mHMsZjGQ3WcN_Wp82tGGj9?usp=sharing', 0, 0),
('DCFL16', 'VPM', 'https://drive.google.com/drive/folders/1qnmZ2vMA1IKDG9BeTfYna3NMGGgKKba4?usp=drive_link', 0, 0),
('DCFL17', 'TNP', 'https://drive.google.com/file/d/1bVEKo-2X-oWdlLR3KZBZF1Q2IXP3zvWE/view?usp=sharing', 0, 0),
('DCFL18', 'KOLLU', 'https://drive.google.com/file/d/1cD5wu5-WmOGsfLp--uf4uLl6Yy3GRmbO/view?usp=drivesdk', 0, 0),
('DCFL19', 'KOLLU', 'https://drive.google.com/file/d/14tdQqWoe8IHFqwL2llPA0VEr0Fg-8UIY/view?usp=drivesdk', 0, 0)
ON CONFLICT (film_id) DO NOTHING;