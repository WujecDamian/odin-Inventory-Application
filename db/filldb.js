const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL UNIQUE,
    image_url TEXT,
    image_public_id TEXT
);

CREATE TABLE IF NOT EXISTS subcategories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    image_url TEXT,
    image_public_id TEXT,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS parts(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    brand VARCHAR (255) NOT NULL,
    model VARCHAR (255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    image_url TEXT,
    image_public_id TEXT,
    subcategory_id INTEGER NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS attributes(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL
);
CREATE TABLE IF NOT EXISTS part_attributes(
    part_id INTEGER NOT NULL,
    attribute_id INTEGER NOT NULL,
    value_text TEXT,
    value_number NUMERIC,

    PRIMARY KEY (part_id,attribute_id),
    FOREIGN KEY (part_id) REFERENCES parts(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS subcategory_attributes(
    subcategory_id INTEGER NOT NULL,
    attribute_id INTEGER NOT NULL,

    PRIMARY KEY (subcategory_id,attribute_id),

    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE
);

INSERT INTO categories (name,image_url,image_public_id) VALUES
('Engine','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263057/engine_rd57vv.webp','engine_rd57vv'),
('Braking System','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263068/braking-system_ekffbd.png','braking-system_ekffbd'),
('Suspension','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263060/suspension_heuum9.png','suspension_heuum9'),
('Electrical','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263063/electrical_feiums.png','electrical_feiums'),
('Fluids','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263060/fluids_hndjrg.avif','fluids_hndjrg'),
('Filters','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263060/filters_bzlsyl.png','filters_bzlsyl');

INSERT INTO subcategories (name,image_url,image_public_id, category_id) VALUES
('Engine Oil','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263138/engine_oil_g6ywtf.jpg','engine_oil_g6ywtf', 5),
('Coolant','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263085/coolant_vxjmbq.jpg','coolant_vxjmbq', 5),
('Brake Fluid','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263140/brake-fluid_iwqnlc.png','brake-fluid_iwqnlc', 5),

('Brake Pads','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263108/brake-pads_ruyvm2.webp','brake-pads_ruyvm2', 2),
('Brake Discs','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263075/brake_discs_dlaqk8.png','brake_discs_dlaqk8', 2),

('Shock Absorbers','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263111/shock-absorbers_tolcpr.webp','shock-absorbers_tolcpr', 3),
('Springs','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263115/springs_rioeaw.webp','springs_rioeaw', 3),

('Alternators','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263078/alternator_ke6hax.png','alternator_ke6hax', 4),
('Starter Motors','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263116/starter-motors_tca5pi.webp','starter-motors_tca5pi', 4),
('Car Batteries','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263088/car-battery_yzwbow.webp','car-battery_yzwbow', 4),

('Air Filters','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263117/air-filter_il4pju.png','air-filter_il4pju', 6),
('Oil Filters','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263081/oil-filter_zh2lvw.avif','oil-filter_zh2lvw', 6),

('Spark Plugs','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263080/spark-plugs_g05no1.png','spark-plugs_g05no1', 1),
('Timing Belts','https://res.cloudinary.com/dzictnnqo/image/upload/v1781263107/timing-belt_aiwiir.png','timing-belt_aiwiir', 1);

INSERT INTO attributes (name) VALUES
('Viscosity'),
('Capacity'),
('Voltage'),
('Diameter'),
('Thickness'),
('Material'),
('Power'),
('Compatibility'),
('Weight Rating'),
('OEM Number');

-- Engine Oil
INSERT INTO subcategory_attributes VALUES
(1, 1), -- viscosity
(1, 2); -- capacity

-- Coolant
INSERT INTO subcategory_attributes VALUES
(2, 2);

-- Brake Fluid
INSERT INTO subcategory_attributes VALUES
(3, 2);

-- Brake Pads
INSERT INTO subcategory_attributes VALUES
(4, 6),
(4, 5);

-- Brake Discs
INSERT INTO subcategory_attributes VALUES
(5, 4),
(5, 5);

-- Shock Absorbers
INSERT INTO subcategory_attributes VALUES
(6, 9);

-- Batteries
INSERT INTO subcategory_attributes VALUES
(10, 3),
(10, 7);

-- Filters
INSERT INTO subcategory_attributes VALUES
(11, 8),
(12, 8);

-- Spark Plugs
INSERT INTO subcategory_attributes VALUES
(13, 10);

-- Timing Belts
INSERT INTO subcategory_attributes VALUES
(14, 10);

INSERT INTO parts (brand, model, price, quantity,image_url,image_public_id,subcategory_id) VALUES
('Castrol', 'Edge 5W30 LL', 42.99, 60,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126111/Castrol_Edge_5W30_LL_jvvozs.jpg','Castrol_Edge_5W30_LL_jvvozs', 1),
('Castrol', 'Magnatec 10W40', 32.50, 80,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126108/Castrol_Magnatec_10W40_cjh6h8.jpg','Castrol_Magnatec_10W40_cjh6h8', 1),
('Motul', '8100 X-clean 5W40', 46.90, 55,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126107/Motul_8100_X-clean_5W40_i2mcpq.jpg','Motul_8100_X-clean_5W40_i2mcpq', 1),
('Motul', 'Specific 5W30', 49.99, 40,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126113/Motul_Specific_5W30_cxkxov.jpg','Motul_Specific_5W30_cxkxov', 1),
('Liqui Moly', 'Top Tec 4200 5W30', 52.00, 50,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126106/Liqui_Moly_Top_Tec_4200_5W30_xvpu8w.jpg','Liqui_Moly_Top_Tec_4200_5W30_xvpu8w', 1),
('Liqui Moly', 'Molygen 5W40', 48.50, 45,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126106/Liqui_Moly_Molygen_5W40_xuwve7.jpg','Liqui_Moly_Molygen_5W40_xuwve7', 1),
('Shell', 'Helix Ultra 5W40', 41.90, 70,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126107/Shell_Helix_Ultra_5W40_cfkpyu.jpg','Shell_Helix_Ultra_5W40_cfkpyu', 1),
('Shell', 'Helix HX7 10W40', 29.90, 90, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126107/Shell_Helix_HX7_10W40_ivgcm3.jpg','Shell_Helix_HX7_10W40_ivgcm3',1),
('TotalEnergies', 'Quartz 9000 5W40', 37.50, 65,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126106/TotalEnergies_Quartz_9000_5W40_otxzzz.jpg','TotalEnergies_Quartz_9000_5W40_otxzzz', 1),
('Ravenol', 'VMP 5W30', 55.00, 35,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126105/Ravenol_VMP_5W30_jmarpt.jpg','Ravenol_VMP_5W30_jmarpt', 1);

INSERT INTO parts (brand, model, price, quantity, image_url, image_public_id, subcategory_id) VALUES
('Prestone', 'AF2100 Ready Mix', 18.99, 100, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126103/Prestone_AF2100_Ready_Mix_wwvyee.webp', 'Prestone_AF2100_Ready_Mix_wwvyee', 2),
('Febi', 'G12 Evo Coolant', 21.50, 80, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/Febi_G12_Evo_Coolant_glg6di.jpg', 'Febi_G12_Evo_Coolant_glg6di', 2),
('Liqui Moly', 'KFS 12+ Concentrate', 24.90, 70, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/Liqui_Moly_KFS_12_Concentrate_yynjwq.jpg', 'Liqui_Moly_KFS_12_Concentrate_yynjwq', 2),
('Liqui Moly', 'KFS 13 Plus', 26.00, 60, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126106/Liqui_Moly_KFS_13_Plus_x6yqea.jpg', 'Liqui_Moly_KFS_13_Plus_x6yqea', 2),
('Comma', 'Xstream G40', 17.90, 90, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/Comma_Xstream_G40_zzitcc.webp', 'Comma_Xstream_G40_zzitcc', 2),
('Valeo', 'Protectiv G13', 22.50, 75, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/Valeo_Protectiv_G13_dfsjvy.jpg', 'Valeo_Protectiv_G13_dfsjvy', 2),
('BASF', 'G12+ Antifreeze', 20.00, 85, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/BASF_G12_Antifreeze_dw1meq.jpg', 'BASF_G12_Antifreeze_dw1meq', 2),
('Shell', 'Zone Coolant Long Life', 23.00, 65, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126105/Shell_Zone_Coolant_Long_Life_rpm0qm.jpg', 'Shell_Zone_Coolant_Long_Life_rpm0qm', 2),
('Castrol', 'Radicool SF Premix', 19.50, 95, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/Castrol_Radicool_SF_Premix_kbjzne.jpg', 'Castrol_Radicool_SF_Premix_kbjzne', 2),
('TotalEnergies', 'Glacelf Auto Supra', 21.00, 70, 'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/TotalEnergies_Glacelf_Auto_Supra_zh1jat.jpg', 'TotalEnergies_Glacelf_Auto_Supra_zh1jat', 2);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('ATE', 'DOT4 SL.6', 14.99, 120,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126100/ATE_DOT4_SL_z5k3pm.jpg','ATE_DOT4_SL_z5k3pm', 3),
('Bosch', 'DOT4 Brake Fluid', 12.50, 140,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126098/Bosch_DOT4_Brake_Fluid_hirmci.jpg','Bosch_DOT4_Brake_Fluid_hirmci', 3),
('Motul', 'RBF 600 Racing', 24.90, 60,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126099/Motul_RBF_600_Racing_kcluwr.jpg','Motul_RBF_600_Racing_kcluwr', 3),
('Motul', 'DOT5.1 High Perf', 19.99, 80,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126099/MOTUL_DOT_51_HIGH_PEFORMANCE_j9tj8u.jpg','MOTUL_DOT_51_HIGH_PEFORMANCE_j9tj8u', 3),
('Castrol', 'React DOT4', 15.50, 110,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126102/Castrol_React_DOT4_reujtl.jpg','Castrol_React_DOT4_reujtl', 3),
('Ferodo', 'DOT4 Premium', 13.90, 100,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126098/Ferodo_DOT4_Premium_pjbqqy.jpg','Ferodo_DOT4_Premium_pjbqqy', 3),
('TRW', 'DOT4 Brake Fluid', 11.90, 130,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126099/TRW_DOT4_Brake_Fluid_bzlvox.jpg','TRW_DOT4_Brake_Fluid_bzlvox', 3),
('Liqui Moly', 'Bremsflüssigkeit DOT4', 16.00, 90,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126098/Liqui_Moly_DOT4_Brake_Fluid_hxgj5k.jpg','Liqui_Moly_DOT4_Brake_Fluid_hxgj5k', 3),
('ATE', 'Super Blue Racing DOT4', 18.50, 70,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126099/ATE_Super_Blue_Racing_DOT4_kibano.jpg','ATE_Super_Blue_Racing_DOT4_kibano', 3),
('Textar', 'DOT4 Brake Fluid', 12.99, 105,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126094/Textar_DOT4_Brake_Fluid_n2orbg.jpg','Textar_DOT4_Brake_Fluid_n2orbg', 3);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Brembo', 'P50024 Front Pads', 59.99, 40,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126103/Brembo_P50024_Front_Pads_lg5ikv.jpg','Brembo_P50024_Front_Pads_lg5ikv', 4),
('TRW', 'GDB1550 Ceramic', 49.50, 55,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126101/TRW_GDB1550_Ceramic_g2ndf3.jpg','TRW_GDB1550_Ceramic_g2ndf3', 4),
('ATE', 'Ceramic Brake Pads', 62.00, 35,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126102/ATE_Ceramic_Brake_Pads_g7o2vi.jpg','ATE_Ceramic_Brake_Pads_g7o2vi', 4),
('Ferodo', 'Premier Eco Friction', 45.00, 70,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126101/Ferodo_Premier_Eco_Friction_m7y4xf.jpg','Ferodo_Premier_Eco_Friction_m7y4xf', 4),
('Zimmermann', 'Sport Pads Front', 58.90, 30,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126104/Zimmermann_Sport_Pads_Front_w9ekgn.jpg','Zimmermann_Sport_Pads_Front_w9ekgn', 4),
('Textar', 'Pro+ Brake Pads', 52.50, 60,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126100/Textar_Pro_Brake_Pads_w3mood.jpg','Textar_Pro_Brake_Pads_w3mood', 4),
('Akebono', 'EURO Ultra Premium', 68.00, 25,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126102/Akebono_EURO_Ultra_Premium_hk034p.jpg','Akebono_EURO_Ultra_Premium_hk034p', 4),
('Delphi', 'LP3210 Standard', 42.00, 80,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126103/Delphi_LP3210_Standard_jdobeo.jpg','Delphi_LP3210_Standard_jdobeo', 4),
('Nisshinbo', 'OEM Replacement Pads', 47.90, 65,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126102/Nisshinbo_OEM_Replacement_Pads_vqalmy.jpg','Nisshinbo_OEM_Replacement_Pads_vqalmy', 4),
('Pagid', 'Street Performance RS', 72.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126103/Pagid_Street_Performance_RS_xwr9od.webp','Pagid_Street_Performance_RS_xwr9od', 4);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Brembo', 'MAX Ventilated 288mm', 89.99, 25,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126081/Brembo_MAX_Ventilated_288mm_mixnl0.jpg','Brembo_MAX_Ventilated_288mm_mixnl0', 5),
('ATE', 'PowerDisc 312mm', 95.50, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126088/ATE_PowerDisc_312mm_l0qhsd.jpg','ATE_PowerDisc_312mm_l0qhsd', 5),
('Zimmermann', 'Coated Disc 300mm', 84.00, 28,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126094/Zimmermann_Coated_Disc_300mm_wnbtap.jpg','Zimmermann_Coated_Disc_300mm_wnbtap', 5),
('TRW', 'DF4382 Standard Disc', 78.90, 30,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126092/TRW_DF4382_Standard_Disc_g1pmjp.jpg','TRW_DF4382_Standard_Disc_g1pmjp', 5),
('Febi', 'Front Brake Disc 286mm', 69.90, 35,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126093/Febi_Front_Brake_Disc_286mm_zfz0oj.jpg','Febi_Front_Brake_Disc_286mm_zfz0oj', 5),
('Delphi', 'BG4123 Premium Disc', 82.50, 22,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126091/Delphi_BG4123_Premium_Disc_kfkeco.jpg','Delphi_BG4123_Premium_Disc_kfkeco', 5),
('NK', 'High Carbon Disc 310mm', 75.00, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126095/NK_High_Carbon_Disc_310mm_yu9q1t.jpg','NK_High_Carbon_Disc_310mm_yu9q1t', 5),
('Mapco', 'Standard Rotor 295mm', 64.50, 40,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126094/Mapco_Standard_Rotor_295mm_qozi4n.jpg','Mapco_Standard_Rotor_295mm_qozi4n', 5),
('Bosch', 'QuietCast Disc', 88.00, 26,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126091/Bosch_QuietCast_Disc_zpvxxz.jpg','Bosch_QuietCast_Disc_zpvxxz', 5),
('Textar', 'Coated Brake Disc', 91.00, 24,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126081/Textar_Coated_Brake_Disc_opvdsb.jpg','Textar_Coated_Brake_Disc_opvdsb', 5);

INSERT INTO parts (brand, model, price, quantity,image_url,image_public_id, subcategory_id) VALUES
('Bilstein', 'B4 Front Shock', 110.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126118/Bilstein_B4_Front_Shock_n4nfmm.jpg','Bilstein_B4_Front_Shock_n4nfmm', 6),
('Bilstein', 'B6 Sport Shock', 145.00, 12,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126123/Bilstein_B6_Sport_Shock_vlk90w.jpg','Bilstein_B6_Sport_Shock_vlk90w', 6),
('KYB', 'Excel-G Front', 92.00, 25,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126120/KYB_Excel-G_Front_gyn6f4.jpg','KYB_Excel-G_Front_gyn6f4', 6),
('KYB', 'Gas-A-Just Rear', 88.00, 30,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126119/KYB_Gas-A-Just_Rear_zfxl5i.jpg','KYB_Gas-A-Just_Rear_zfxl5i', 6),
('Sachs', 'Super Touring Shock', 85.50, 28,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126122/Sachs_Super_Touring_Shock_y4gssh.jpg','Sachs_Super_Touring_Shock_y4gssh', 6),
('Monroe', 'Original Gas Shock', 90.00, 22,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126124/Monroe_Original_Gas_Shock_nwwanc.jpg','Monroe_Original_Gas_Shock_nwwanc', 6),
('Monroe', 'Reflex Premium', 95.00, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126119/Monroe_Reflex_Premium_sw9p5k.jpg','Monroe_Reflex_Premium_sw9p5k', 6),
('Febi', 'Shock Absorber Front', 78.00, 35,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126123/Febi_Shock_Absorber_Front_siyavk.jpg','Febi_Shock_Absorber_Front_siyavk', 6),
('TRW', 'Front Damper Unit', 83.50, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126121/TRW_Front_Damper_Unit_knxnqc.jpg','TRW_Front_Damper_Unit_knxnqc', 6),
('Optimal', 'Standard Shock', 70.00, 40,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126123/Optimal_Standard_Shock_kalqvp.jpg','Optimal_Standard_Shock_kalqvp', 6);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Eibach', 'Pro-Kit Lowering Springs', 180.00, 15,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126134/Eibach_Pro-Kit_Lowering_Springs_q2tkda.jpg','Eibach_Pro-Kit_Lowering_Springs_q2tkda', 7),
('H&R', 'Sport Springs 35mm Drop', 175.50, 12,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126137/H_R_Sport_Springs_35mm_Drop_cbcp00.jpg','H_R_Sport_Springs_35mm_Drop_cbcp00', 7),
('Bilstein', 'B3 OEM Replacement Spring', 95.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126139/Bilstein_B3_OEM_Replacement_Spring_pjm3g6.jpg','Bilstein_B3_OEM_Replacement_Spring_pjm3g6', 7),
('Kilen', 'Coil Spring Front Standard', 65.00, 30,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126136/Kilen_Coil_Spring_Front_Standard_s8smca.jpg','Kilen_Coil_Spring_Front_Standard_s8smca', 7),
('Lesjöfors', 'Rear Coil Spring OE Fit', 70.00, 28,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126134/Lesjo%CC%88fors_Rear_Coil_Spring_OE_Fit_sz4g1v.jpg','Lesjöfors_Rear_Coil_Spring_OE_Fit_sz4g1v', 7),
('Sachs', 'Standard Suspension Spring', 85.00, 22,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126134/Sachs_Standard_Suspension_Spring_efejwq.jpg','Sachs_Standard_Suspension_Spring_efejwq', 7),
('KYB', 'Heavy Duty Coil Spring', 88.50, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126138/KYB_Heavy_Duty_Coil_Spring_yehlqx.jpg','KYB_Heavy_Duty_Coil_Spring_yehlqx', 7),
('Monroe', 'Original Ride Spring', 90.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126136/Monroe_Original_Ride_Spring_xtfasv.jpg','Monroe_Original_Ride_Spring_xtfasv', 7),
('Suplex', 'Front Axle Coil Spring', 78.00, 25,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126134/Suplex_Front_Axle_Coil_Spring_cq2oma.webp','Suplex_Front_Axle_Coil_Spring_cq2oma', 7),
('Febi', 'Suspension Coil Spring OEM', 82.00, 24,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126137/Febi_Suspension_Coil_Spring_OEM_fkaq6o.jpg','Febi_Suspension_Coil_Spring_OEM_fkaq6o', 7);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Bosch', 'AL0121X 120A Alternator', 220.00, 10,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126073/Bosch_AL0121X_120A_Alternator_drx3jd.jpg','Bosch_AL0121X_120A_Alternator_drx3jd', 8),
('Valeo', 'TG12C064 150A Alternator', 240.00, 8,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126076/Valeo_TG12C064_150A_Alternator_a0z9j7.jpg','Valeo_TG12C064_150A_Alternator_a0z9j7', 8),
('Denso', '100211-9630 Alternator', 210.00, 12,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126073/Denso_100211-9630_Alternator_ekb8gu.jpg','Denso_100211-9630_Alternator_ekb8gu', 8),
('Mitsubishi', 'A3TJ0891 OEM Alternator', 195.00, 14,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126076/Mitsubishi_A3TJ0891_OEM_Alternator_wdslkm.jpg','Mitsubishi_A3TJ0891_OEM_Alternator_wdslkm', 8),
('Lucas', 'LRA03357 140A Alternator', 180.00, 15,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126075/Lucas_LRA03357_140A_Alternator_to2sa0.jpg','Lucas_LRA03357_140A_Alternator_to2sa0', 8),
('Magneti Marelli', 'A1150 Alternator', 205.00, 11,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126076/Magneti_Marelli_A1150_Alternator_f9axjt.jpg','Magneti_Marelli_A1150_Alternator_f9axjt', 8),
('Delco Remy', 'DRS1125 Alternator', 230.00, 9,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126075/Delco_Remy_DRS1125_Alternator_tojes8.png','Delco_Remy_DRS1125_Alternator_tojes8', 8),
('HC-Cargo', '110643 Alternator', 175.00, 16,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126075/HC-Cargo_110643_Alternator_l4pgza.png','HC-Cargo_110643_Alternator_l4pgza', 8),
('AS-PL', 'A2025 Alternator 140A', 165.00, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126074/AS-PL_A2025_Alternator_140A_gjipwn.jpg','AS-PL_A2025_Alternator_140A_gjipwn', 8),
('Hitachi', 'LR1100-502 Alternator', 250.00, 7,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126075/Hitachi_LR1100-502_Alternator_ktgbp1.jpg','Hitachi_LR1100-502_Alternator_ktgbp1', 8);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Bosch', 'SR0447X Starter Motor', 160.00, 12,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126149/Bosch_SR0447X_Starter_Motor_nsow5l.jpg','Bosch_SR0447X_Starter_Motor_nsow5l', 9),
('Valeo', 'D7R27 Starter Motor', 170.00, 10,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126146/Valeo_D7R27_Starter_Motor_prcncx.jpg','Valeo_D7R27_Starter_Motor_prcncx', 9),
('Denso', '428000-1230 Starter', 155.00, 14,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126143/Denso_428000-1230_Starter_umzmjo.webp','Denso_428000-1230_Starter_umzmjo', 9),
('Delco Remy', 'DRS3890 Starter', 165.00, 11,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126143/Delco_Remy_DRS3890_Starter_blsdbv.webp','Delco_Remy_DRS3890_Starter_blsdbv', 9),
('Lucas', 'LRS02345 Starter Motor', 140.00, 16,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126144/Lucas_LRS02345_Starter_Motor_kzpp1g.jpg','Lucas_LRS02345_Starter_Motor_kzpp1g', 9),
('Magneti Marelli', 'M000T32071 Starter', 150.00, 13,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126147/Magneti_Marelli_M000T32071_Starter_auobhe.jpg','Magneti_Marelli_M000T32071_Starter_auobhe', 9),
('HC-Cargo', '113112 Starter Motor', 135.00, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126146/HC-Cargo_113112_Starter_Motor_ajapto.jpg','HC-Cargo_113112_Starter_Motor_ajapto', 9),
('AS-PL', 'S3005 Starter Motor', 125.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126144/AS-PL_S3005_Starter_Motor_achfwu.jpg','AS-PL_S3005_Starter_Motor_achfwu', 9),
('Hitachi', 'S114-860 Starter', 180.00, 9,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126145/Hitachi_S114-860_Starter_p5uvfw.jpg','Hitachi_S114-860_Starter_p5uvfw', 9),
('Nippondenso', 'Starter Unit 128000-2750', 190.00, 8,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126143/Nippondenso_Starter_Unit_128000-2750_vq6cpy.webp','Nippondenso_Starter_Unit_128000-2750_vq6cpy', 9);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Varta', 'Blue Dynamic 60Ah', 95.00, 25,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126077/Varta_Blue_Dynamic_60Ah_nrhvfk.jpg','Varta_Blue_Dynamic_60Ah_nrhvfk', 10),
('Varta', 'Silver Dynamic 74Ah', 120.00, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126076/Varta_Silver_Dynamic_74Ah_gd4ivu.jpg','Varta_Silver_Dynamic_74Ah_gd4ivu', 10),
('Bosch', 'S4 72Ah', 105.50, 22,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126077/Bosch_S4_72Ah_mpsx61.jpg','Bosch_S4_72Ah_mpsx61', 10),
('Bosch', 'S5 AGM 80Ah', 155.00, 15,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126077/Bosch_S5_AGM_80Ah_arewt2.jpg','Bosch_S5_AGM_80Ah_arewt2', 10),
('Exide', 'Premium Carbon 70Ah', 110.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126081/Exide_Premium_Carbon_70Ah_evgpiu.jpg','Exide_Premium_Carbon_70Ah_evgpiu', 10),
('Exide', 'Start-Stop AGM 80Ah', 160.00, 12,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126088/Exide_Start-Stop_AGM_80Ah_zpridr.jpg','Exide_Start-Stop_AGM_80Ah_zpridr', 10),
('Banner', 'Power Bull 74Ah', 112.00, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126077/Banner_Power_Bull_74Ah_kvenet.jpg','Banner_Power_Bull_74Ah_kvenet', 10),
('Yuasa', 'YBX5096 65Ah', 98.90, 25,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126077/Yuasa_YBX5096_65Ah_tl6zhx.jpg','Yuasa_YBX5096_65Ah_tl6zhx', 10),
('Rocket', 'SMF 60Ah Battery', 85.00, 30,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126076/Rocket_SMF_60Ah_Battery_iywxml.jpg','Rocket_SMF_60Ah_Battery_iywxml', 10),
('Centra', 'Futura 72Ah', 102.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126078/Centra_Futura_72Ah_jjjugb.jpg','Centra_Futura_72Ah_jjjugb', 10);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Mann Filter', 'C 35 154', 19.50, 90,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126057/Mann_Filter_C_35_154_ruxoko.jpg','Mann_Filter_C_35_154_ruxoko', 11),
('Bosch', 'F026400123', 17.90, 95,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126069/Bosch_F026400123_slolv7.jpg','Bosch_F026400123_slolv7', 11),
('Mahle', 'LX 2018', 18.20, 80,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126055/Mahle_LX_2018_gmiwnj.jpg','Mahle_LX_2018_gmiwnj', 11),
('Hengst', 'E500L', 16.50, 100,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126054/Hengst_E500L_wgxxj6.jpg','Hengst_E500L_wgxxj6', 11),
('K&N', 'Performance Panel Filter', 45.00, 40,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126058/K_N_Performance_Panel_Filter_eq0ie9.jpg','K_N_Performance_Panel_Filter_eq0ie9', 11),
('Febi', 'Engine Air Filter', 15.90, 110,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126073/Febi_Engine_Air_Filter_bvf94t.jpg','Febi_Engine_Air_Filter_bvf94t', 11),
('Purflux', 'A1234 Air Filter', 17.00, 85,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126056/Purflux_A1234_Air_Filter_czm7un.jpg','Purflux_A1234_Air_Filter_czm7un', 11),
('Blue Print', 'ADG02234 Filter', 16.80, 70,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126070/Blue_Print_ADG02234_Filter_pwuand.jpg','Blue_Print_ADG02234_Filter_pwuand', 11),
('Valeo', 'Air Intake Filter', 18.90, 75,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126073/Valeo_Air_Intake_Filter_oddbwf.jpg','Valeo_Air_Intake_Filter_oddbwf', 11),
('Optimal', 'Air Filter Element', 14.50, 120,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126056/Optimal_Air_Filter_Element_xx1l9p.jpg','Optimal_Air_Filter_Element_xx1l9p', 11);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Mann Filter', 'W 719/45', 11.90, 140,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126123/Mann_Filter_W_719_45_szr9o7.jpg','Mann_Filter_W_719_45_szr9o7', 12),
('Bosch', 'F026407123', 13.50, 120,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126110/Bosch_F026407123_vem0cx.jpg','Bosch_F026407123_vem0cx', 12),
('Mahle', 'OC 1051', 10.80, 160,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126118/Mahle_OC_1051_cq4pec.jpg','Mahle_OC_1051_cq4pec', 12),
('Purflux', 'LS867B', 12.20, 110,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126118/Purflux_LS867B_gdscom.jpg','Purflux_LS867B_gdscom', 12),
('Febi', 'Oil Filter 32145', 9.90, 150,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126113/Febi_Oil_Filter_32145_olk9x1.jpg','Febi_Oil_Filter_32145_olk9x1', 12),
('Hengst', 'H90W13', 11.50, 130,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126122/Hengst_H90W13_jox6zt.jpg','Hengst_H90W13_jox6zt', 12),
('Blue Print', 'ADG02125', 10.50, 140,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126111/Blue_Print_ADG02125_lsjlcf.jpg','Blue_Print_ADG02125_lsjlcf', 12),
('Valeo', '586001 Oil Filter', 12.00, 100,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126112/Valeo_586001_Oil_Filter_y7p1we.jpg','Valeo_586001_Oil_Filter_y7p1we', 12),
('Filtron', 'OP540/1', 8.90, 170,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126113/Filtron_OP540_1_a57dhz.jpg','Filtron_OP540_1_a57dhz', 12),
('Knecht', 'OC 467', 13.00, 120,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126120/Knecht_OC_467_xhhgyh.jpg','Knecht_OC_467_xhhgyh', 12);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('NGK', 'Iridium IX BKR6EIX', 9.99, 200,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126130/NGK_Iridium_IX_BKR6EIX_k652gj.jpg','NGK_Iridium_IX_BKR6EIX_k652gj', 13),
('NGK', 'Laser Iridium SILZKBR8D8S', 14.50, 180,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126133/NGK_Laser_Iridium_SILZKBR8D8S_laj8n1.jpg','NGK_Laser_Iridium_SILZKBR8D8S_laj8n1', 13),
('Bosch', 'Super Plus FR7NI33', 8.90, 210,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126130/Bosch_Super_Plus_FR7NI33_cbn5aa.jpg','Bosch_Super_Plus_FR7NI33_cbn5aa', 13),
('Bosch', 'Platinum FR7DPX', 9.50, 190,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126130/Bosch_Platinum_FR7DPX_d2qi1v.jpg','Bosch_Platinum_FR7DPX_d2qi1v', 13),
('Denso', 'Iridium Power IK20', 11.20, 170,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126131/Denso_Iridium_Power_IK20_cjvojk.jpg','Denso_Iridium_Power_IK20_cjvojk', 13),
('Denso', 'VK20TT Twin Tip', 12.50, 160,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126126/Denso_VK20TT_Twin_Tip_s44fyq.jpg','Denso_VK20TT_Twin_Tip_s44fyq', 13),
('Champion', 'OE+ RC10PYPB4', 8.50, 200,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126128/Champion_OE_RC10PYPB4_ci9cg6.jpg','Champion_OE_RC10PYPB4_ci9cg6', 13),
('Beru', 'Ultra Z255', 10.00, 150,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126128/Beru_Ultra_Z255_go5ufs.jpg','Beru_Ultra_Z255_go5ufs', 13),
('Eyquem', 'RFC58LZ2E', 7.90, 180,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126134/Eyquem_RFC58LZ2E_xqjk2c.jpg','Eyquem_RFC58LZ2E_xqjk2c', 13),
('Torch', 'Iridium Spark Plug', 6.50, 220,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126125/Torch_Iridium_Spark_Plug_mbsiru.jpg','Torch_Iridium_Spark_Plug_mbsiru', 13);

INSERT INTO parts (brand, model, price, quantity, image_url,image_public_id,subcategory_id) VALUES
('Gates', 'PowerGrip KP15569XS', 135.00, 15,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126153/Gates_PowerGrip_KP15569XS_wvkbsl.jpg','Gates_PowerGrip_KP15569XS_wvkbsl', 14),
('Gates', 'Timing Belt Kit K015569XS', 145.00, 12,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126148/Gates_Timing_Belt_Kit_K015569XS_wizegc.jpg','Gates_Timing_Belt_Kit_K015569XS_wizegc', 14),
('Dayco', 'KTB528 Kit', 120.50, 18,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126151/Dayco_KTB528_Kit_tbzs6s.jpg','Dayco_KTB528_Kit_tbzs6s', 14),
('Dayco', 'Timing Belt 94987', 110.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126154/Dayco_Timing_Belt_94987_pmr9yw.jpg','Dayco_Timing_Belt_94987_pmr9yw', 14),
('Continental', 'CT1102WP1 Kit', 148.00, 10,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126147/Continental_CT1102WP1_Kit_mukrrh.jpg','Continental_CT1102WP1_Kit_mukrrh', 14),
('ContiTech', 'CT1028WP1', 155.00, 9,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126153/ContiTech_CT1028WP1_g23ekq.jpg','ContiTech_CT1028WP1_g23ekq', 14),
('INA', '530 0571 10 Kit', 132.90, 14,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126149/INA_530_0571_10_Kit_p6qbov.jpg','INA_530_0571_10_Kit_p6qbov', 14),
('SKF', 'VKMA 03259 Kit', 140.00, 13,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126153/SKF_VKMA_03259_Kit_leqtnk.jpg','SKF_VKMA_03259_Kit_leqtnk', 14),
('Bosch', 'Timing Belt Set 1987949461', 125.00, 16,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126149/Bosch_Timing_Belt_Set_1987949461_khikdd.jpg','Bosch_Timing_Belt_Set_1987949461_khikdd', 14),
('Febi', 'Timing Kit 23456', 118.00, 20,'https://res.cloudinary.com/dzictnnqo/image/upload/v1781126152/Febi_Timing_Kit_23456_yf29g0.jpg','Febi_Timing_Kit_23456_yf29g0', 14);

--INSERTING ACTUAL PART ATTRIBUTES

INSERT INTO part_attributes VALUES
(1,1,'5W30',NULL),(1,2,NULL,5),
(2,1,'10W40',NULL),(2,2,NULL,5),
(3,1,'5W40',NULL),(3,2,NULL,5),
(4,1,'5W30',NULL),(4,2,NULL,5),
(5,1,'5W30',NULL),(5,2,NULL,5),
(6,1,'5W40',NULL),(6,2,NULL,5),
(7,1,'5W40',NULL),(7,2,NULL,5),
(8,1,'10W40',NULL),(8,2,NULL,5),
(9,1,'5W40',NULL),(9,2,NULL,5),
(10,1,'5W30',NULL),(10,2,NULL,5);

INSERT INTO part_attributes VALUES
(11,2,NULL,5),(12,2,NULL,5),
(13,2,NULL,5),(14,2,NULL,5),
(15,2,NULL,5),(16,2,NULL,5),
(17,2,NULL,5),(18,2,NULL,5),
(19,2,NULL,5),(20,2,NULL,5);

INSERT INTO part_attributes VALUES
(21,2,NULL,1),(22,2,NULL,1),
(23,2,NULL,1),(24,2,NULL,1),
(25,2,NULL,1),(26,2,NULL,1),
(27,2,NULL,1),(28,2,NULL,1),
(29,2,NULL,1),(30,2,NULL,1);

INSERT INTO part_attributes VALUES
(31,6,'Ceramic',NULL),(31,5,NULL,18),
(32,6,'Ceramic',NULL),(32,5,NULL,17),
(33,6,'Ceramic',NULL),(33,5,NULL,19),
(34,6,'Organic',NULL),(34,5,NULL,17),
(35,6,'Sport',NULL),(35,5,NULL,20),
(36,6,'Ceramic',NULL),(36,5,NULL,18),
(37,6,'Low Metal',NULL),(37,5,NULL,16),
(38,6,'Standard',NULL),(38,5,NULL,17),
(39,6,'OEM',NULL),(39,5,NULL,18),
(40,6,'Sport',NULL),(40,5,NULL,21);

INSERT INTO part_attributes VALUES
(41,4,NULL,288),(41,5,NULL,25),
(42,4,NULL,312),(42,5,NULL,26),
(43,4,NULL,300),(43,5,NULL,24),
(44,4,NULL,288),(44,5,NULL,23),
(45,4,NULL,286),(45,5,NULL,22),
(46,4,NULL,310),(46,5,NULL,25),
(47,4,NULL,310),(47,5,NULL,24),
(48,4,NULL,295),(48,5,NULL,22),
(49,4,NULL,288),(49,5,NULL,25),
(50,4,NULL,300),(50,5,NULL,24);

INSERT INTO part_attributes VALUES
(51,9,NULL,450),
(52,9,NULL,500),
(53,9,NULL,420),
(54,9,NULL,430),
(55,9,NULL,410),
(56,9,NULL,440),
(57,9,NULL,460),
(58,9,NULL,400),
(59,9,NULL,420),
(60,9,NULL,380);

INSERT INTO part_attributes VALUES
(61,9,NULL,500),
(62,9,NULL,480),
(63,9,NULL,450),
(64,9,NULL,420),
(65,9,NULL,430),
(66,9,NULL,440),
(67,9,NULL,460),
(68,9,NULL,470),
(69,9,NULL,410),
(70,9,NULL,420);

INSERT INTO part_attributes VALUES
(71,3,NULL,14),(71,7,NULL,120),
(72,3,NULL,14),(72,7,NULL,150),
(73,3,NULL,14),(73,7,NULL,110),
(74,3,NULL,14),(74,7,NULL,130),
(75,3,NULL,14),(75,7,NULL,140),
(76,3,NULL,14),(76,7,NULL,150),
(77,3,NULL,14),(77,7,NULL,160),
(78,3,NULL,14),(78,7,NULL,120),
(79,3,NULL,14),(79,7,NULL,140),
(80,3,NULL,14),(80,7,NULL,150);

INSERT INTO part_attributes VALUES
(81,7,NULL,2.0),
(82,7,NULL,2.2),
(83,7,NULL,1.8),
(84,7,NULL,2.0),
(85,7,NULL,1.7),
(86,7,NULL,1.9),
(87,7,NULL,1.6),
(88,7,NULL,1.5),
(89,7,NULL,2.1),
(90,7,NULL,2.3);

INSERT INTO part_attributes VALUES
(91,3,NULL,12),(91,7,NULL,60),
(92,3,NULL,12),(92,7,NULL,74),
(93,3,NULL,12),(93,7,NULL,72),
(94,3,NULL,12),(94,7,NULL,80),
(95,3,NULL,12),(95,7,NULL,70),
(96,3,NULL,12),(96,7,NULL,80),
(97,3,NULL,12),(97,7,NULL,74),
(98,3,NULL,12),(98,7,NULL,65),
(99,3,NULL,12),(99,7,NULL,60),
(100,3,NULL,12),(100,7,NULL,72);

INSERT INTO part_attributes VALUES
(101,8,'BMW E90',NULL),
(102,8,'VW Golf 7',NULL),
(103,8,'Audi A4 B8',NULL),
(104,8,'Ford Focus MK3',NULL),
(105,8,'Universal',NULL),
(106,8,'Opel Astra J',NULL),
(107,8,'Peugeot 308',NULL),
(108,8,'Skoda Octavia',NULL),
(109,8,'Toyota Corolla',NULL),
(110,8,'Honda Civic',NULL);

INSERT INTO part_attributes VALUES
(111,8,'BMW N47',NULL),
(112,8,'VW 2.0 TDI',NULL),
(113,8,'Audi 2.0 TFSI',NULL),
(114,8,'Ford EcoBoost',NULL),
(115,8,'Opel 1.6 CDTI',NULL),
(116,8,'Peugeot HDi',NULL),
(117,8,'Skoda TDI',NULL),
(118,8,'Toyota VVTi',NULL),
(119,8,'Honda i-VTEC',NULL),
(120,8,'Universal',NULL);

INSERT INTO part_attributes VALUES
(121,10,'BKR6EIX',NULL),
(122,10,'SILZKBR8D8S',NULL),
(123,10,'FR7NI33',NULL),
(124,10,'FR7DPX',NULL),
(125,10,'IK20',NULL),
(126,10,'VK20TT',NULL),
(127,10,'RC10PYPB4',NULL),
(128,10,'Z255',NULL),
(129,10,'RFC58LZ2E',NULL),
(130,10,'Torch-Iridium',NULL);

INSERT INTO part_attributes VALUES
(131,10,'KP15569XS',NULL),
(132,10,'K015569XS',NULL),
(133,10,'KTB528',NULL),
(134,10,'94987',NULL),
(135,10,'CT1102WP1',NULL),
(136,10,'CT1028WP1',NULL),
(137,10,'530057110',NULL),
(138,10,'VKMA03259',NULL),
(139,10,'1987949461',NULL),
(140,10,'23456',NULL);
`;

async function main() {
  console.log("..seeding");
  const client = new Client({
    connectionString: process.env.DB_EXT,
    ssl: { rejectUnauthorized: false },
  });
  try {
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  } catch (err) {
    console.log("Error! | " + err);
    console.log(err);
  }
}

main();
