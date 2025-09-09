-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Acessórios Diversos', 'acessorios-diversos', 'Produtos diversos para informática e uso geral'),
('Impressoras e Leitores', 'impressoras-leitores', 'Impressoras, leitores de código de barras e acessórios'),
('Monitores e Displays', 'monitores-displays', 'Monitores, webcams e acessórios para display'),
('Fontes e Energia', 'fontes-energia', 'Fontes ATX, nobreaks e produtos de energia'),
('Processadores', 'processadores', 'Processadores Intel e AMD');

-- Get category IDs for reference
DO $$
DECLARE
    cat_acessorios uuid;
    cat_impressoras uuid;
    cat_monitores uuid;
    cat_fontes uuid;
    cat_processadores uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO cat_acessorios FROM categories WHERE slug = 'acessorios-diversos';
    SELECT id INTO cat_impressoras FROM categories WHERE slug = 'impressoras-leitores';
    SELECT id INTO cat_monitores FROM categories WHERE slug = 'monitores-displays';
    SELECT id INTO cat_fontes FROM categories WHERE slug = 'fontes-energia';
    SELECT id INTO cat_processadores FROM categories WHERE slug = 'processadores';

    -- Insert products from Acessórios Diversos
    INSERT INTO products (name, description, price_revenda, price_varejo, category_id, sku, is_featured) VALUES
    ('Garrafa Térmica Squeeze 750ml Aço Inox', 'Garrafa térmica de aço inoxidável com capacidade de 750ml', 29.99, 34.49, cat_acessorios, 'GAR-750-INOX', false),
    ('Super Pen drive bootável 5 em 1', 'Pen drive com sistema bootável compatível com Win XP/7/8/10/11', 69.99, 80.49, cat_acessorios, 'PEN-BOOT-5IN1', false),
    ('Mochila preta impermeável para notebook', 'Mochila impermeável para notebook na cor azul', 40.00, 46.00, cat_acessorios, 'MOCH-NB-AZUL', false),
    ('Cheirinho Little Trees Vanilla Pride', 'Aromatizante Little Trees aroma Vanilla Pride', 9.99, 11.49, cat_acessorios, 'AROMA-LT-VAN', false),
    ('Tripé suporte flexível para celular/câmera LE-032', 'Tripé flexível universal para celular e câmera', 9.99, 11.49, cat_acessorios, 'TRIPE-LE032', false),
    ('Switch 8 portas 10/100 RJ-45 KPE08B', 'Switch de 8 portas RJ-45 10/100 Mbps com fonte inclusa', 44.99, 51.74, cat_acessorios, 'SW-8P-KPE08B', false),
    ('Copo Térmico 500ml com tampa e abridor', 'Copo térmico de 500ml com tampa e abridor para cerveja', 19.99, 22.99, cat_acessorios, 'COPO-TERM-500', true),
    ('Blusa masculina P/M/G/GG', 'Blusa masculina em diversos tamanhos', 19.99, 22.99, cat_acessorios, 'BLUSA-MASC-VAR', true),
    ('Switch 8 portas Gigabit 10/100/1000', 'Switch Gigabit de 8 portas RJ-45 10/100/1000 mbps', 99.99, 114.99, cat_acessorios, 'SW-8P-GIGA', false),
    ('Caixa com 100 conectores RJ-45 Cat5e', 'Caixa contendo 100 conectores RJ-45 categoria 5e', 25.00, 28.75, cat_acessorios, 'RJ45-CAT5E-100', false),
    ('Kit mobilador para celular completo', 'Kit completo para mobilador de celular com tripé', 89.99, 103.49, cat_acessorios, 'KIT-MOBIL-CEL', false),
    ('Fita dupla face 12mm x 2m Fertak', 'Fita dupla face transparente fixa forte 12mm x 2m', 9.99, 11.49, cat_acessorios, 'FITA-DF-FERT', false),
    ('Antena Digital Exbom AN-1405A', 'Antena digital VHF/UHF/FM/HDTV com 5 metros', 19.99, 22.99, cat_acessorios, 'ANT-EX-1405A', false),
    ('Raquete elétrica mata mosquito', 'Raquete elétrica para eliminar mosquitos', 19.99, 22.99, cat_acessorios, 'RAQ-ELET-MOSQ', false),
    ('Kit 4 estiletes retráteis Luatek LWJ-181', 'Kit com 4 estiletes retráteis da marca Luatek', 15.00, 17.25, cat_acessorios, 'EST-LWT-181', false),
    ('Carregador portátil Power Bank 10000mAh', 'Power Bank INOVA de 10000mAh com 3 portas USB', 49.99, 57.49, cat_acessorios, 'PB-INOVA-10K', false),
    ('Film PVC 30cm x 300m', 'Filme PVC transparente 30cm x 300 metros', 49.99, 57.49, cat_acessorios, 'FILM-PVC-30X300', false),
    ('Pistola de cola quente 60W GB59022', 'Pistola de cola quente profissional 60W', 24.99, 28.74, cat_acessorios, 'COLA-60W-GB', false),
    ('Desengripante spray 300ml LUB FAST', 'Spray desengripante 300ml marca LUB FAST', 9.99, 11.49, cat_acessorios, 'DESENGRIP-300', false),
    ('Boneco Dragon Ball Z Goku 22cm', 'Boneco anime Dragon Ball Z Goku de 22cm', 79.99, 91.99, cat_acessorios, 'GOKU-DBZ-22CM', false),
    ('Pilha AA ou AAA multimarcas (par)', 'Par de pilhas AA ou AAA de diversas marcas', 2.49, 2.86, cat_acessorios, 'PILHA-AA-AAA', false),
    ('Teclado USB 2.0 ABNT2 KNUP', 'Teclado com fio USB 2.0 padrão ABNT2 para PC e notebook', 19.99, 22.99, cat_acessorios, 'TECL-KNUP-ABNT2', true),
    ('Cabo Botão Power Reset 50cm', 'Cabo botão power/reset on/off para gabinete PC', 8.99, 10.34, cat_acessorios, 'CABO-PWR-50CM', false),
    ('Conversor HDMI para VGA com áudio KP-3468', 'Conversor HDMI para VGA com saída de áudio', 14.99, 17.24, cat_acessorios, 'CONV-HDMI-VGA', false);

    -- Insert products from Impressoras e Leitores
    INSERT INTO products (name, description, price_revenda, price_varejo, category_id, sku, is_featured) VALUES
    ('Impressora Térmica 80mm KP-IM602', 'Impressora térmica 80mm com guilhotina automática USB', 319.99, 367.99, cat_impressoras, 'IMP-TERM-80MM', false),
    ('Leitor Códigos Barras Durawell Laser USB', 'Leitor de códigos de barras laser com cabo USB', 69.99, 80.49, cat_impressoras, 'LEIT-DURA-LASER', false),
    ('Bobina Térmica 58mm ou 80mm', 'Bobina térmica para impressoras 58mm ou 80mm', 3.00, 3.45, cat_impressoras, 'BOB-TERM-5880', false),
    ('Leitor código barras laser USB KP-1017A+ KNUP', 'Leitor código de barras laser USB com suporte', 79.99, 91.99, cat_impressoras, 'LEIT-KP1017A', false),
    ('Mini Impressora Portátil Bluetooth KP-1025', 'Mini impressora portátil bluetooth térmica 58mm', 109.99, 126.49, cat_impressoras, 'MINI-IMP-BT', false),
    ('Leitor Código Barras Netum NT-A5', 'Leitor USB 1D/2D QR automático Netum NT-A5', 189.99, 218.49, cat_impressoras, 'LEIT-NETUM-A5', false),
    ('Suporte para Leitor Código Barras', 'Suporte universal para leitor de código de barras', 29.99, 34.49, cat_impressoras, 'SUP-LEIT-CB', false),
    ('Leitor código barra LCB-150', 'Leitor de código de barras modelo LCB-150', 74.99, 86.24, cat_impressoras, 'LEIT-LCB150', false),
    ('Tintas Impressoras L3250/L3210/L3150/L3110', 'Tintas compatíveis para impressoras Epson série L', 19.99, 22.99, cat_impressoras, 'TINTA-EPSON-L', false),
    ('Leitor Código Barras sem fio KP-1018A', 'Leitor sem fio código de barras KNUP KP-1018A', 139.99, 160.99, cat_impressoras, 'LEIT-KNUP-SF', false),
    ('Impressora Epson Ecotank L1250 Wi-Fi', 'Impressora tanque de tinta Epson Wi-Fi Ecotank L1250', 949.99, 1092.49, cat_impressoras, 'EPSON-L1250', true),
    ('Papel A4 500 folhas', 'Resma papel A4 com 500 folhas', 24.99, 28.74, cat_impressoras, 'PAPEL-A4-500', false),
    ('Impressora Multifuncional Epson L3250', 'Impressora multifuncional Epson Ecotank L3250 Wi-Fi', 1049.99, 1207.49, cat_impressoras, 'EPSON-L3250', false);

    -- Insert products from Monitores e Displays  
    INSERT INTO products (name, description, price_revenda, price_varejo, category_id, sku, is_featured) VALUES
    ('Monitor LED 19" MNBOX D-MN002', 'Monitor LED 19" 60Hz com HDMI e VGA', 244.99, 281.74, cat_monitores, 'MON-MNBOX-19', false),
    ('WebCam Full HD 1080p USB', 'WebCam Full HD 1080p com microfone USB', 49.99, 57.49, cat_monitores, 'WEBCAM-FHD-USB', false),
    ('Monitor LED Bluecase 19" HD 75Hz', 'Monitor LED Bluecase 19" HD 75Hz HDMI/VGA', 259.99, 298.99, cat_monitores, 'MON-BLUE-19HD', false),
    ('Monitor BRX 17" LED 60Hz', 'Monitor BRX 17" LED 60Hz HDMI/VGA preto', 229.99, 264.49, cat_monitores, 'MON-BRX-17', false),
    ('Limpa Tela Clean 60ml com flanela', 'Limpa tela 60ml com flanela antirrisco Implastec', 14.99, 17.24, cat_monitores, 'LIMP-TELA-60ML', false),
    ('Limpa Telas 60ml Clean Implastec', 'Limpa telas 60ml Clean da Implastec', 7.99, 9.19, cat_monitores, 'LIMP-IMPL-60', false),
    ('Suporte articulado 2 monitores TMS 180', 'Suporte articulado para 2 monitores 13" até 27"', 139.99, 160.99, cat_monitores, 'SUP-2MON-TMS', false),
    ('WebCam Multilaser HD 480p USB', 'WebCam Multilaser HD 480p com microfone USB 2.0', 24.99, 28.74, cat_monitores, 'WEBCAM-MULTI-HD', false),
    ('Monitor Gamer GT 24" Full HD 75Hz', 'Monitor Gamer GT 24" LED Full HD 75Hz 1ms', 599.99, 689.99, cat_monitores, 'MON-GAMER-24GT', false),
    ('Monitor VX PRO 22" LED 75Hz VX220X', 'Monitor VX PRO 22" LED 75Hz HDMI/VGA', 329.99, 379.49, cat_monitores, 'MON-VXPRO-22', false),
    ('Monitor 20" Brazil PC M20KWB branco', 'Monitor 20" Brazil PC LED HDMI VGA 75Hz branco', 349.99, 402.49, cat_monitores, 'MON-BRAZIL-20W', false),
    ('Suporte TV MB Tech 26" a 55"', 'Suporte fixo MB Tech para TV 26" a 55"', 54.99, 63.24, cat_monitores, 'SUP-TV-MB2655', false),
    ('Monitor 19" HD LED Mymax rosa', 'Monitor 19" HD LED 60Hz HDMI VGA 3.6ms rosa', 349.99, 402.49, cat_monitores, 'MON-MYMAX-19R', false);

    -- Insert products from Fontes e Energia
    INSERT INTO products (name, description, price_revenda, price_varejo, category_id, sku, is_featured) VALUES
    ('Fonte 200W KNUP KP-517', 'Fonte 200W KNUP sem cabo de força', 54.99, 63.24, cat_fontes, 'FONTE-KNUP-200', false),
    ('Filtro linha 4 tomadas 2P+T', 'Filtro de linha com 4 tomadas 2P+T extensão', 24.99, 28.74, cat_fontes, 'FILTRO-4TOM', false),
    ('Fonte ATX 550W 80 Plus Bronze REVENGER', 'Fonte ATX 550W 80 Plus Bronze PFC Ativo', 239.99, 275.99, cat_fontes, 'FONTE-REV-550', true),
    ('Fonte 500W ATX LED RGB KP-534RGB', 'Fonte 500W ATX Bivolt manual com LED RGB', 169.99, 195.49, cat_fontes, 'FONTE-RGB-500', false),
    ('Fonte ATX Cowboy 500W KP-534', 'Fonte ATX Cowboy 500W Bivolt KNUP', 139.99, 160.99, cat_fontes, 'FONTE-COWBOY-500', false),
    ('Fonte C3Tech ATX 200W PS-200V4', 'Fonte C3Tech ATX 200W sem cabo', 49.99, 57.49, cat_fontes, 'FONTE-C3T-200', false),
    ('Fonte ATX 550W REVENGER FO-MAX04', 'Fonte ATX 550W 80 Plus Bronze PFC Ativo modelo FO-MAX04', 259.99, 298.99, cat_fontes, 'FONTE-MAX04-550', false),
    ('Testador fonte digital LCD AT-01', 'Testador de fonte digital LCD 20/24 pinos ATX', 64.99, 74.74, cat_fontes, 'TEST-FONTE-AT01', false),
    ('Fonte Gamer BRX 500W 80 Plus Bronze', 'Fonte Gamer BRX 500W 80 Plus Bronze auto-bivolt', 179.99, 206.99, cat_fontes, 'FONTE-BRX-500G', false),
    ('Filtro linha 3 tomadas com fusível', 'Filtro de linha 3 tomadas 110/220V com fusível', 14.99, 17.24, cat_fontes, 'FILTRO-3TOM-FUS', false),
    ('Protetor eletrônico PC 500VA Energy Lux', 'Protetor eletrônico para PC 500VA Mono', 74.99, 86.24, cat_fontes, 'PROT-500VA-EL', false),
    ('NoBreak UPS 800VA Goldentec', 'NoBreak UPS 800VA automático 115V 3 tomadas', 429.99, 494.49, cat_fontes, 'NOBREAK-800VA', false),
    ('Multímetro digital DT830B amarelo', 'Multímetro digital portátil DT830B amarelo', 19.99, 22.99, cat_fontes, 'MULTI-DT830B', false);

    -- Insert products from Processadores
    INSERT INTO products (name, description, price_revenda, price_varejo, category_id, sku, is_featured) VALUES
    ('Processador Intel Core i3-2120 3,30GHz', 'Processador Intel Core i3-2120 3,30GHz', 39.99, 45.99, cat_processadores, 'PROC-I3-2120', false),
    ('Processador Intel Core i5-2400', 'Intel Core i5-2400 6MB cache até 3,40GHz', 89.99, 103.49, cat_processadores, 'PROC-I5-2400', false),
    ('Processador Intel Core i5 3ª geração', 'Intel Core i5 3ª geração seminovo', 169.99, 195.49, cat_processadores, 'PROC-I5-3GEN', false),
    ('Processador Intel Core i3-6100', 'Intel Core i3-6100 3M cache 3,70GHz', 179.99, 206.99, cat_processadores, 'PROC-I3-6100', false),
    ('Pasta térmica sachet', 'Pasta térmica para processador em sachet', 2.99, 3.44, cat_processadores, 'PASTA-TERM', false),
    ('AMD Ryzen 5 5600GT 3.6GHz', 'AMD Ryzen 5 5600GT 3.6GHz 4.6GHz Turbo', 929.99, 1069.49, cat_processadores, 'PROC-R5-5600GT', false),
    ('Intel Pentium G3220 3,00GHz', 'Intel Pentium G3220 3M cache 3,00GHz LGA 1150', 49.99, 57.49, cat_processadores, 'PROC-PENT-G3220', false),
    ('Intel Core 2 Duo E7500', 'Intel Core 2 Duo E7500 2,93GHz LGA 775', 19.99, 22.99, cat_processadores, 'PROC-C2D-E7500', false),
    ('Processador Core i5 3470 3ª geração', 'Intel Core i5 3470 3ª geração', 159.99, 183.99, cat_processadores, 'PROC-I5-3470', false),
    ('Intel Core i3-3240 3,4GHz', 'Intel Core i3-3240 3,4GHz LGA 1155 3ª geração', 44.99, 51.74, cat_processadores, 'PROC-I3-3240', false),
    ('AMD Ryzen 5 5500 3,6GHz', 'AMD Ryzen 5 5500 3,6GHz 4.2GHz Turbo 16MB AM4', 629.99, 724.49, cat_processadores, 'PROC-R5-5500', false),
    ('AMD Athlon 3000G 3,5GHz', 'AMD Athlon 3000G 3,5GHz 5MB cache', 349.99, 402.49, cat_processadores, 'PROC-ATH-3000G', false),
    ('Intel i5-4570 3,2GHz 4ª geração', 'Intel i5-4570 3,2GHz 4ª geração', 169.99, 195.49, cat_processadores, 'PROC-I5-4570', false),
    ('Intel Core i3-10100F 4.30GHz', 'Intel Core i3-10100F 6MB cache 4.30GHz LGA 1200', 629.99, 724.49, cat_processadores, 'PROC-I3-10100F', false),
    ('AMD Ryzen 3 3200G 3,6GHz', 'AMD Ryzen 3 3200G 3,6GHz com cooler Wraith AM4', 499.99, 574.99, cat_processadores, 'PROC-R3-3200G', false),
    ('SSD M.2 SATA 256GB KNUP KP-HD814', 'SSD M.2 SATA NGFF 256GB 2280 SATA 3.0', 114.99, 132.24, cat_processadores, 'SSD-M2-256GB', true),
    ('CPU i5 2ª geração Mk 8GB LED RGB', 'CPU i5 2ª geração Mk com 8GB LED RGB frontal', 599.99, 689.99, cat_processadores, 'CPU-I5-MK-8GB', true);

END $$;