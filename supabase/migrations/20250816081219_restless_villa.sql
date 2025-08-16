/*
  # Insert songs data from CSV

  1. Data Insertion
    - Insert all 63 songs from the provided CSV data
    - Each song has song_id, center, and dc_song_url
    - Initialize votes and favorites to 0

  2. Data Structure
    - song_id: DCSO1, DCSO2, etc.
    - center: TNP, KOLLU, KAUP, VPM, CHENNAI
    - dc_song_url: Google Drive or Suno links
*/

INSERT INTO songs (song_id, center, dc_song_url, votes, favorites) VALUES
('DCSO1', 'TNP', 'https://drive.google.com/file/d/1oBiQAdn5n50hHFucmMnwgGgi4I1bdNZS/view?usp=drive_open', 0, 0),
('DCSO2', 'KOLLU', 'https://drive.google.com/file/d/1DY5UGOUvf7fq9XG0aNglMfoju03rQRnn/view?usp=drivesdk', 0, 0),
('DCSO3', 'TNP', 'https://drive.google.com/drive/folders/1H0T3PJ5W85ohRnjX76KsiV3G82SjUEcP', 0, 0),
('DCSO4', 'KOLLU', 'https://drive.google.com/file/d/14-2uswBOQyUsXxvh-vqDs4c4b0szUbeC/view', 0, 0),
('DCSO5', 'KOLLU', 'https://drive.google.com/file/d/1aPhQwXfJslPy_bRsYL81GwH9-hPrB8zk/view', 0, 0),
('DCSO6', 'KAUP', 'https://drive.google.com/file/d/1gLkVRTRdzsNYPTISXQ4ArG-3PwpzcUMb/view?usp=sharing', 0, 0),
('DCSO7', 'KAUP', 'https://drive.google.com/file/d/1BIP0jNW8PdFFJJkzpahnlvo8WhjiufJv/view?usp=sharing', 0, 0),
('DCSO8', 'KAUP', 'https://drive.google.com/file/d/1ij8BJ36EkPnEjJceQKIay5fEeGBcqzCI/view?usp=drivesdk', 0, 0),
('DCSO9', 'KOLLU', 'https://drive.google.com/file/d/1d-MUHK6z8-ulYXW6b5fyT1nWkwhyex6D/view?usp=drivesdk', 0, 0),
('DCSO10', 'KOLLU', 'https://drive.google.com/file/d/1ryZ-6osReLJeZKcRCgDTVirWrTBs_zJ6/view?usp=drivesdk', 0, 0),
('DCSO11', 'KOLLU', 'https://drive.google.com/file/d/1N6i6cpoX0BA8bnWcZ_OmbQspIfJ4MV6B/view?usp=drivesdk', 0, 0),
('DCSO12', 'KOLLU', 'https://drive.google.com/file/d/1Zm06Bau_y4tx_VpqJdp7NMpWpAIeFgv5/view?usp=drivesdk', 0, 0),
('DCSO13', 'KAUP', 'https://drive.google.com/file/d/1r4H9kF_DAIIxkFUy8Q7FsvuNA9Y_CPTG/view?usp=drive_link', 0, 0),
('DCSO14', 'KAUP', 'https://drive.google.com/file/d/1r4H9kF_DAIIxkFUy8Q7FsvuNA9Y_CPTG/view?usp=drive_link', 0, 0),
('DCSO15', 'TNP', 'https://drive.google.com/drive/folders/1LWDhCJPLv_Y2WnyitXklykbZcxf-XRYX', 0, 0),
('DCSO16', 'KOLLU', 'https://drive.google.com/file/d/17ZNw2rnHiRqC2qs7J7OAuHWUzc2bgEsu/view?usp=drivesdk', 0, 0),
('DCSO17', 'KOLLU', 'https://drive.google.com/file/d/1OZuHm8lfWJaCIU_b8lyATvS0wa61twQE/view?usp=drivesdk', 0, 0),
('DCSO18', 'TNP', 'https://drive.google.com/file/d/1Pdu4RTdALtBfMGesR-EqQSvf2RmSUtsZ/view?usp=drivesdk', 0, 0),
('DCSO19', 'TNP', 'https://drive.google.com/file/d/1ubliZtTEaKymdaPD3AkyH8B1i_gx81G4/view?usp=drivesdk', 0, 0),
('DCSO20', 'TNP', 'https://drive.google.com/file/d/1Th5NDg2wryOUInoipREvRclSAjDGctNs/view?usp=sharing', 0, 0),
('DCSO21', 'TNP', 'https://drive.google.com/drive/folders/1SYPIVIrstR0I3v78VZkZ6_j-WKqLaD0k', 0, 0),
('DCSO22', 'VPM', 'https://drive.google.com/file/d/12nMupuylLXFziJ02H2H9AjNx6VjxJMos/view?usp=sharing', 0, 0),
('DCSO23', 'VPM', 'https://drive.google.com/file/d/1SPEMBQYpc8ysWJmgO9hMOdgoGjHUVUga/view?usp=sharing', 0, 0),
('DCSO24', 'VPM', 'https://drive.google.com/file/d/1eaxhRWOBOZWb4gkDDuQXboqNa_rvOSHd/view?usp=sharing', 0, 0),
('DCSO25', 'VPM', 'https://drive.google.com/file/d/1v6xlB7G_VcJyC1K811afMaseO-vMw0Cz/view?usp=sharing', 0, 0),
('DCSO26', 'VPM', 'https://drive.google.com/file/d/1hlchZau_HXROyMOGURxpatHxglkX3RVi/view?usp=sharing', 0, 0),
('DCSO27', 'VPM', 'https://drive.google.com/file/d/1fzU1PLhRN5OHyOroS96tRkOvOS80VlLI/view?usp=sharing', 0, 0),
('DCSO28', 'VPM', 'https://drive.google.com/file/d/1cWvwcisQxXQozkIz6_MwEC3DJXatoMhE/view?usp=sharing', 0, 0),
('DCSO29', 'KOLLU', 'https://drive.google.com/file/d/1DY5UGOUvf7fq9XG0aNglMfoju03rQRnn/view?usp=drivesdk', 0, 0),
('DCSO30', 'KAUP', 'https://drive.google.com/drive/folders/1-4_8sdlIb24If-fA6jUiEylPdBdOiIVN', 0, 0),
('DCSO31', 'TNP', 'https://drive.google.com/file/d/1sxiM9UUDF944V7oxlmJ_Tjykix5Oa3h6/view?usp=sharing', 0, 0),
('DCSO32', 'VPM', 'https://drive.google.com/file/d/1ARXvHNTmI5M3BZzrmk2tvnJ_FZ6644SI/view?usp=drivesdk', 0, 0),
('DCSO33', 'CHENNAI', 'https://drive.google.com/file/d/12k07Fkt62FTk-6pFN2OBMQpBhHdAtzjO/view?usp=sharing', 0, 0),
('DCSO34', 'VPM', 'https://drive.google.com/file/d/1SH_brjV2Jp0fT1IY9JlQSFyzR_eAtqdw/view?usp=sharing', 0, 0),
('DCSO35', 'KAUP', 'https://drive.google.com/drive/folders/1Z_8gswbsqvfoiDLPtnu9X86W7kjEG6vm', 0, 0),
('DCSO36', 'KAUP', 'https://drive.google.com/file/d/1ZB3ZJdJUbLNhqfVxZ2tm60qRHgXFDMWR/view?usp=drivesdk', 0, 0),
('DCSO37', 'KOLLU', 'https://drive.google.com/file/d/1UN47rbNYemJqL_x3GnoGYIvIVzkNbZUE/view?usp=drivesdk', 0, 0),
('DCSO38', 'KOLLU', 'https://drive.google.com/file/d/1UNvLqL4evxf_8U7ZdIkX_FdAnR9it700/view?usp=drivesdk', 0, 0),
('DCSO39', 'KOLLU', 'https://drive.google.com/file/d/1UVodqffnU9aSFH3x4fdlk4lTPouokw--/view?usp=drivesdk', 0, 0),
('DCSO40', 'KOLLU', 'https://drive.google.com/file/d/1UWiu_0NvZMF5MzEBxtc_z2hW63RESLGC/view?usp=drivesdk', 0, 0),
('DCSO41', 'KOLLU', 'https://drive.google.com/file/d/1ZYQ3zqsnHj_Iw52VPYZbX541J15S6_19/view?usp=drive_link', 0, 0),
('DCSO42', 'KAUP', 'https://suno.com/s/3paUpqDqDnE5haTq', 0, 0),
('DCSO43', 'TNP', 'https://drive.google.com/drive/folders/1-OO5V-RuDwTVzpo-pgoI8Jndo8s51x26?usp=drive_link', 0, 0),
('DCSO44', 'KOLLU', 'https://drive.google.com/drive/folders/1tIppRcKbTtS5BbdXdgIf9H2A9sJRyvcx?usp=sharing', 0, 0),
('DCSO45', 'KAUP', 'https://drive.google.com/file/d/1LFkST_ZEpN_U9JweAYUwiYb_m4BvGHdr/view?usp=drive_link', 0, 0),
('DCSO46', 'TNP', 'https://drive.google.com/drive/folders/1CmWp4ZEr-zTHf4qePvVsGSTpLHlH0ykE', 0, 0),
('DCSO47', 'TNP', 'https://drive.google.com/file/d/1oBiQAdn5n50hHFucmMnwgGgi4I1bdNZS/view?usp=sharing', 0, 0),
('DCSO48', 'KOLLU', 'https://suno.com/s/z64jbgyUXpWQSo9N', 0, 0),
('DCSO49', 'KOLLU', 'https://drive.google.com/drive/folders/1tIppRcKbTtS5BbdXdgIf9H2A9sJRyvcx?usp=sharing', 0, 0),
('DCSO50', 'TNP', 'https://drive.google.com/drive/folders/1X-29Wple864cUS2xq0-iRKlqJ7e8gfHE', 0, 0),
('DCSO51', 'VPM', 'https://drive.google.com/drive/folders/1JOvcV3n-gKt9eLu0OV5YZsIihfyLiUgO?usp=sharing', 0, 0),
('DCSO52', 'VPM', 'https://drive.google.com/drive/folders/1NgitJrY0fmTpWJG-1A3bABDfQ7JhB91L?usp=sharing', 0, 0),
('DCSO53', 'KOLLU', 'https://suno.com/s/UPpptGdVFISQjHFw?time=108', 0, 0),
('DCSO54', 'VPM', 'https://drive.google.com/drive/folders/1y9feQLE4Gk-tnNa9bOlcQbJprxFISvVx?usp=drive_link', 0, 0),
('DCSO55', 'KOLLU', 'https://suno.com/s/6BWpimqzjXpvtvx2', 0, 0),
('DCSO56', 'KOLLU', 'https://suno.com/s/q6eP7A95emMLPxUS', 0, 0),
('DCSO57', 'KOLLU', 'https://drive.google.com/file/d/1LgPL4SX9z40yi8lGoocBlxmBgy_3WDs0/view?usp=drivesdk', 0, 0),
('DCSO58', 'VPM', 'https://drive.google.com/drive/folders/1oK6shrn5ZiCNpj6-ADA1B_r4s9yRVIF6', 0, 0),
('DCSO59', 'VPM', 'https://drive.google.com/drive/folders/1oK6shrn5ZiCNpj6-ADA1B_r4s9yRVIF6', 0, 0),
('DCSO60', 'TNP', 'https://drive.google.com/file/d/1pU9BV_flLD4yiBoGJPkUnjS1TaZKc27m/view?usp=sharingkarandesicrew2161@gmail.com', 0, 0),
('DCSO61', 'TNP', 'https://drive.google.com/file/d/1cusfgIAt645_BnJOm8gNpWA0yCDBOR0d/view?usp=sharing', 0, 0),
('DCSO62', 'KOLLU', 'https://drive.google.com/file/d/1DY5UGOUvf7fq9XG0aNglMfoju03rQRnn/view?usp=drivesdk', 0, 0),
('DCSO63', 'TNP', 'https://drive.google.com/drive/folders/1jxpRM_sPEQCoRiwi-Y3xGL27tmZBqQV-?usp=sharing', 0, 0)
ON CONFLICT (song_id) DO NOTHING;