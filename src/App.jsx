import { useState, createContext, useContext } from "react";
const AuthCtx = createContext(null);
const useAuth = () => useContext(AuthCtx);

const CUISINES = [
  { key:"all",        label:"All Recipes",  emoji:"📖" },
  { key:"classic",    label:"Classic",      emoji:"🍳" },
  { key:"bbq",        label:"BBQ",          emoji:"🔥" },
  { key:"arabic",     label:"Arabic",       emoji:"🥘" },
  { key:"indian",     label:"Indian",       emoji:"🌶️" },
  { key:"pakistani",  label:"Pakistani",    emoji:"🇵🇰" },
  { key:"asian",      label:"Asian",        emoji:"🍜" },
  { key:"portuguese", label:"Portuguese",   emoji:"🇵🇹" },
  { key:"bosnian",    label:"Bosnian",      emoji:"🇧🇦" },
  { key:"luxembourg", label:"Luxembourgish",emoji:"🇱🇺" }];
const DIFF_COLOR = { Easy:"#3D7A4E", Medium:"#D97950", Advanced:"#C0392B" };
const DIFF_BG    = { Easy:"#EFF6EC",  Medium:"#FEF5EE", Advanced:"#FEF0EE" };

const ALL_RECIPES = {
  flock: [
    { id:"f1", cuisine:"classic", name:"Roast Whole Chicken", emoji:"🍋", time:"1h 20min", servings:4, difficulty:"Easy", tag:"whole chicken", desc:"The Sunday classic. Crispy skin, juicy meat, unbeatable aroma.", ingredients:["1 whole chicken (1.2–1.5 kg)","3 tbsp olive oil","1 lemon, halved","4 garlic cloves, crushed","Fresh thyme and rosemary","Salt and black pepper"], steps:[{title:"Prep",desc:"Preheat oven to 200°C. Pat chicken dry — dry skin = crispy skin."},{title:"Season",desc:"Rub all over with olive oil, generous salt and pepper. Stuff cavity with lemon, garlic and herbs."},{title:"Roast",desc:"Place breast-side up in a roasting tray. Roast 1h 10min until juices run clear when you pierce the thigh."},{title:"Rest",desc:"Cover loosely with foil. Rest 10 minutes before carving — this keeps it juicy."},{title:"Serve",desc:"Carve and serve with roasting juices poured over. Perfect with roasted potatoes."}], tip:"Rub herb butter under the skin before roasting for next-level flavour." },
    { id:"f2", cuisine:"classic", name:"Pan-Seared Chicken Filets", emoji:"🧈", time:"18 min", servings:2, difficulty:"Easy", tag:"chicken filets", desc:"Weeknight hero. Golden outside, impossibly juicy inside.", ingredients:["300g chicken filets","2 tbsp butter","2 garlic cloves, sliced","Fresh thyme sprigs","Salt and pepper","Squeeze of lemon"], steps:[{title:"Flatten",desc:"Place filets between cling film and bash lightly to even thickness."},{title:"Season",desc:"Season generously on both sides with salt and pepper just before cooking."},{title:"Sear",desc:"Heat pan until very hot. Add oil. Sear filets 4 min undisturbed."},{title:"Butter-baste",desc:"Flip, add butter, garlic and thyme. Tilt pan and spoon butter over chicken for 3 min."},{title:"Rest",desc:"Rest 3 min off heat. Finish with a squeeze of lemon."}], tip:"Never press down on chicken in the pan — it squeezes out the juices." },
    { id:"f3", cuisine:"bbq", name:"BBQ Spatchcock Chicken", emoji:"🔥", time:"50 min", servings:4, difficulty:"Medium", tag:"whole chicken", desc:"Butterflied for faster, even cooking. Maximum char, maximum flavour.", ingredients:["1 whole chicken","3 tbsp smoked paprika","2 tbsp olive oil","1 tbsp garlic powder","1 tbsp onion powder","1 tsp cayenne","Salt and pepper"], steps:[{title:"Spatchcock",desc:"Use scissors to cut along both sides of backbone and remove it. Press flat."},{title:"Marinade",desc:"Mix paprika, garlic powder, onion powder, cayenne, oil, salt. Rub all over. Marinate 30 min."},{title:"Preheat grill",desc:"Set up two-zone grill — high heat one side, indirect the other."},{title:"Grill",desc:"Skin-side down on high heat 5 min to char. Move to indirect side, cook 30–35 min."},{title:"Finish",desc:"Return to direct heat 2 min for final char. Rest 10 min."}], tip:"Brining overnight in salted water gives you ultra-juicy BBQ chicken." },
    { id:"f4", cuisine:"bbq", name:"Smoky BBQ Chicken Legs", emoji:"🍗", time:"45 min", servings:4, difficulty:"Easy", tag:"chicken legs", desc:"Falling-off-the-bone tender with a sticky, caramelised BBQ glaze.", ingredients:["8 chicken legs","4 tbsp honey","3 tbsp soy sauce","2 tbsp apple cider vinegar","2 tbsp tomato ketchup","1 tbsp smoked paprika","Garlic powder, salt"], steps:[{title:"Score",desc:"Score each leg 2–3 times with a knife so marinade penetrates deep."},{title:"Marinade",desc:"Mix honey, soy, vinegar, ketchup, paprika and garlic. Coat legs fully. Marinate 2 hours."},{title:"Grill low",desc:"Cook over medium-low grill heat 30 min, turning every 10 min."},{title:"Glaze",desc:"Brush extra marinade on during last 10 min. Increase heat to caramelise."},{title:"Rest",desc:"Rest 5 min. Serve with coleslaw and grilled bread."}], tip:"Save the marinade, reduce it in a pan and serve as extra dipping sauce." },
    { id:"f5", cuisine:"arabic", name:"Chicken Shawarma", emoji:"🥙", time:"35 min", servings:4, difficulty:"Easy", tag:"chicken filets", desc:"The legendary Levantine street food. Spiced, juicy, absolutely addictive.", ingredients:["500g chicken filets","1 tsp cumin","1 tsp coriander","1 tsp turmeric","1 tsp cinnamon","½ tsp cardamom","3 tbsp olive oil","3 garlic cloves, minced","Juice of 1 lemon","Yogurt, flatbread, tomato, onion to serve"], steps:[{title:"Spice mix",desc:"Combine all spices with olive oil, garlic and lemon juice into a paste."},{title:"Marinate",desc:"Coat chicken filets in the paste. Leave at least 30 min — overnight is best."},{title:"Cook",desc:"Grill or pan-fry over medium-high heat 5–6 min per side until slightly charred."},{title:"Slice",desc:"Rest 3 min then slice into thin strips for maximum surface area."},{title:"Assemble",desc:"Warm flatbread, spread garlic yogurt, pile on chicken, top with sliced tomato and onion."}], tip:"A few drops of pomegranate molasses in the marinade adds incredible depth." },
    { id:"f6", cuisine:"arabic", name:"Shish Tawook", emoji:"🍢", time:"30 min", servings:4, difficulty:"Easy", tag:"chicken filets", desc:"Lebanese grilled chicken skewers — tender, aromatic, flame-kissed.", ingredients:["500g chicken filets, cubed","4 tbsp plain yogurt","3 tbsp tomato paste","3 garlic cloves","Juice of 1 lemon","1 tsp paprika","1 tsp allspice","½ tsp white pepper","Olive oil"], steps:[{title:"Marinade",desc:"Blend yogurt, tomato paste, garlic, lemon, spices and olive oil into a smooth marinade."},{title:"Marinate",desc:"Add chicken cubes, mix well, cover and refrigerate at least 2 hours."},{title:"Skewer",desc:"Thread onto metal skewers. Leave small gaps so heat circulates around each piece."},{title:"Grill",desc:"Grill on medium-high heat, turning every 3 min. Total cook time 12–15 min."},{title:"Serve",desc:"Serve immediately with garlic sauce (toum), pickled vegetables and flatbread."}], tip:"Toum (Lebanese garlic sauce) is non-negotiable. Blend garlic, oil, lemon and salt." },
    { id:"f7", cuisine:"indian", name:"Chicken Tikka Masala", emoji:"🍛", time:"45 min", servings:4, difficulty:"Medium", tag:"chicken filets", desc:"The world's most beloved curry. Smoky chicken in a velvety spiced tomato cream sauce.", ingredients:["500g chicken filets, cubed","200ml passata","150ml double cream","1 onion, diced","3 garlic cloves","2cm ginger, grated","2 tsp garam masala","1 tsp cumin","1 tsp turmeric","1 tsp paprika","Yogurt for marinade","Fresh coriander"], steps:[{title:"Marinate",desc:"Mix chicken with yogurt, 1 tsp garam masala, paprika, salt. Marinate 30 min."},{title:"Char chicken",desc:"Grill or pan-fry marinated chicken on high heat until charred. Set aside."},{title:"Build sauce",desc:"Fry onion 8 min until golden. Add garlic and ginger 2 min. Add dry spices, cook 1 min."},{title:"Simmer",desc:"Add passata, cook 10 min on low. Add cream and charred chicken. Simmer 5 min."},{title:"Finish",desc:"Taste, adjust salt. Finish with butter. Garnish coriander. Serve with rice and naan."}], tip:"Charring the chicken before adding to sauce is the secret to authentic tikka masala." },
    { id:"f8", cuisine:"indian", name:"Chicken Biryani", emoji:"🍚", time:"1h 10min", servings:4, difficulty:"Advanced", tag:"whole chicken", desc:"The king of rice dishes. Aromatic basmati layered with spiced chicken.", ingredients:["800g chicken pieces","400g basmati rice","2 large onions, thinly sliced","4 tbsp ghee","1 tsp cumin seeds","3 cardamom pods","2 bay leaves","1 tsp turmeric","2 tsp biryani masala","Saffron in warm milk","Fresh mint and coriander"], steps:[{title:"Fry onions",desc:"Fry sliced onions in ghee on medium-low 25 min until deep golden and crisp. Remove half."},{title:"Cook chicken",desc:"In remaining ghee add whole spices, then chicken. Cook 10 min. Add biryani masala, yogurt. Cook 15 min."},{title:"Par-boil rice",desc:"Boil salted water with bay leaves. Add washed rice, cook exactly 6 min. Drain."},{title:"Layer",desc:"In a heavy pot: layer chicken, then rice, then crispy onions, mint, coriander. Drizzle saffron milk."},{title:"Dum cook",desc:"Seal pot with foil then lid. Cook on very low heat 25 min."}], tip:"Never skip the dum (steam) stage — it's what makes biryani biryani." },
    { id:"f9", cuisine:"asian", name:"Teriyaki Chicken", emoji:"🍱", time:"25 min", servings:2, difficulty:"Easy", tag:"chicken filets", desc:"Sticky, glossy, sweet-savoury perfection. The Japanese classic.", ingredients:["300g chicken filets","4 tbsp soy sauce","3 tbsp mirin","2 tbsp sake","1 tbsp sugar","1 tsp sesame oil","Sesame seeds","Spring onions to garnish"], steps:[{title:"Make sauce",desc:"Combine soy, mirin, sake and sugar. Stir until sugar dissolves."},{title:"Sear",desc:"Score chicken skin. Sear in lightly oiled pan skin-side down 5 min until golden."},{title:"Glaze",desc:"Flip, add sauce to pan. Cook 4–5 min, spooning sauce over repeatedly as it reduces."},{title:"Reduce",desc:"Let sauce thicken into a glossy glaze. Remove chicken when fully coated."},{title:"Serve",desc:"Slice and serve over steamed rice. Finish with sesame seeds and spring onion."}], tip:"Score the chicken so it stays flat and the glaze clings to every crevice." },
    { id:"f10", cuisine:"asian", name:"Thai Basil Chicken (Pad Krapow)", emoji:"🌿", time:"15 min", servings:2, difficulty:"Easy", tag:"chicken filets", desc:"Thailand's most popular street food. 15 minutes, explosive flavour.", ingredients:["300g chicken filets, finely chopped","3 garlic cloves","3 bird's eye chillies","2 tbsp oyster sauce","1 tbsp fish sauce","1 tsp soy sauce","1 tsp sugar","Large handful Thai basil","Fried eggs to serve"], steps:[{title:"Prep",desc:"Pound garlic and chillies in a mortar — rough texture is better than smooth."},{title:"Fry aromatics",desc:"Fry garlic-chilli paste in very hot oil 30 seconds until fragrant."},{title:"Cook chicken",desc:"Add chicken. Stir-fry on high heat 4–5 min, breaking up any lumps."},{title:"Sauce",desc:"Add oyster sauce, fish sauce, soy and sugar. Toss everything together 1 min."},{title:"Basil finish",desc:"Remove from heat. Add basil leaves and toss — residual heat wilts them perfectly. Serve over rice with a fried egg."}], tip:"The high heat is everything. If your pan isn't smoking, it's not hot enough." }],
  riot: [
    { id:"r1", cuisine:"classic", name:"Classic Grilled Lamb Chops", emoji:"🌿", time:"20 min", servings:2, difficulty:"Easy", tag:"lamb chops", desc:"Simple, perfect, timeless. The best lamb chops you'll ever make.", ingredients:["4 lamb chops","3 tbsp olive oil","3 garlic cloves, minced","Fresh rosemary","Fresh thyme","Salt and black pepper","Lemon to serve"], steps:[{title:"Bring to temp",desc:"Remove chops from fridge 30 min before cooking. Cold meat = uneven cooking."},{title:"Marinate",desc:"Coat chops with olive oil, garlic, rosemary, thyme, salt and pepper."},{title:"Preheat",desc:"Get your grill or cast iron pan screaming hot."},{title:"Grill",desc:"Grill 3 min per side for medium-rare. Press bone-side down 1 min to render fat."},{title:"Rest",desc:"Rest 5 min on a warm plate. Squeeze fresh lemon over."}], tip:"Medium-rare is 57°C internal. A meat thermometer is the best kitchen investment." },
    { id:"r2", cuisine:"classic", name:"Beef & Lamb Kofta", emoji:"🥙", time:"30 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"Middle-Eastern spiced meatballs on skewers. Packed with cumin, coriander and herbs.", ingredients:["300g minced beef","200g lamb mince","1 onion, grated","3 garlic cloves, minced","2 tsp cumin","1 tsp coriander","½ tsp cinnamon","½ tsp allspice","Fresh parsley and mint","Salt and pepper"], steps:[{title:"Mix",desc:"Combine all ingredients. Knead like dough for 2 min."},{title:"Rest",desc:"Refrigerate mixture 30 min. Cold fat = kofta that holds its shape."},{title:"Shape",desc:"Wet your hands. Shape around skewers into 12cm sausages, pressing firmly."},{title:"Grill",desc:"Grill on high heat, turning every 2–3 min. Total 10–12 min."},{title:"Serve",desc:"Serve with flatbread, grilled tomatoes and yogurt dip."}], tip:"Grating rather than chopping the onion prevents kofta from falling apart." },
    { id:"r3", cuisine:"bbq", name:"BBQ Sirloin with Chimichurri", emoji:"🔥", time:"30 min", servings:2, difficulty:"Medium", tag:"beef sirloin", desc:"Argentine-style grilled beef with vibrant green herb sauce.", ingredients:["400g beef sirloin","Sea salt and black pepper","Bunch flat-leaf parsley","4 garlic cloves","1 shallot","3 tbsp red wine vinegar","6 tbsp olive oil","1 tsp chilli flakes"], steps:[{title:"Chimichurri",desc:"Finely chop parsley, garlic, shallot. Mix with vinegar, oil, chilli, salt. Make first — it needs time to meld."},{title:"Season steak",desc:"Season sirloin generously with sea salt and pepper."},{title:"Grill",desc:"Grill on highest heat 3–4 min per side for medium-rare."},{title:"Rest",desc:"Rest on a board 5 min."},{title:"Serve",desc:"Slice against the grain. Spoon chimichurri generously."}], tip:"Always slice beef against the grain — it shortens muscle fibres making every bite tender." },
    { id:"r4", cuisine:"bbq", name:"Smoky Lamb Shoulder Sliders", emoji:"🍔", time:"3h 30min", servings:6, difficulty:"Medium", tag:"lamb shoulder", desc:"Low and slow smoked lamb shoulder, pulled and piled into soft buns.", ingredients:["600g lamb shoulder","2 tbsp smoked paprika","1 tbsp cumin","1 tbsp brown sugar","1 tsp garlic powder","Salt and pepper","Brioche buns, slaw, pickles"], steps:[{title:"Dry rub",desc:"Mix all spices and sugar. Rub all over lamb. Refrigerate overnight ideally."},{title:"Slow cook",desc:"Roast at 150°C for 3 hours covered. Internal temp target: 85–90°C."},{title:"Unwrap and char",desc:"Remove foil, blast at 220°C for 15 min to form a crust."},{title:"Pull",desc:"Rest 15 min then pull apart with two forks."},{title:"Build sliders",desc:"Toast brioche buns. Load with pulled lamb, crunchy slaw and pickles."}], tip:"The longer the rest after pulling, the more juices redistribute into the meat." },
    { id:"r5", cuisine:"arabic", name:"Lamb Mansaf", emoji:"🫕", time:"1h 30min", servings:6, difficulty:"Advanced", tag:"lamb shoulder", desc:"Jordan's national dish. Lamb slow-cooked in yogurt sauce, served on flatbread and rice.", ingredients:["600g lamb shoulder, large chunks","500ml plain yogurt","1 tsp turmeric","1 tsp allspice","2 bay leaves","Toasted almonds and pine nuts","Long-grain rice","Flatbread"], steps:[{title:"Brown lamb",desc:"Brown lamb in ghee with onion. Season with allspice, turmeric, bay. Cover with water. Simmer 1 hour."},{title:"Yogurt sauce",desc:"Whisk yogurt with ½ cup water. Heat slowly while stirring constantly — never let it boil or it splits."},{title:"Combine",desc:"Add cooked lamb to yogurt sauce. Simmer gently 20 min, stirring regularly."},{title:"Cook rice",desc:"Cook rice in the lamb cooking broth for maximum flavour."},{title:"Assemble",desc:"Layer flatbread on a platter, then rice, then lamb, pour sauce over, top with toasted nuts."}], tip:"Adding a tablespoon of cornstarch to the yogurt prevents it splitting when heated." },
    { id:"r6", cuisine:"arabic", name:"Beef Ouzi", emoji:"🥘", time:"2h 30min", servings:6, difficulty:"Medium", tag:"beef sirloin", desc:"Gulf-style slow-roasted beef over spiced rice with nuts and raisins.", ingredients:["500g beef sirloin","400g basmati rice","1 onion","½ cup raisins","½ cup toasted pine nuts and almonds","2 tsp baharat","1 tsp turmeric","Ghee","Beef stock"], steps:[{title:"Season beef",desc:"Rub beef with baharat, salt and pepper. Brown in ghee all over."},{title:"Slow roast",desc:"Add beef stock to a deep pan. Cover and roast at 170°C for 1.5–2 hours."},{title:"Spiced rice",desc:"Fry onion in ghee. Add rice, turmeric, raisins. Toast 2 min. Add beef broth and cook."},{title:"Slice beef",desc:"Rest beef 15 min. Slice into thick pieces."},{title:"Plate",desc:"Mound spiced rice on a large platter. Lay beef slices over. Scatter toasted nuts. Pour over beef juices."}], tip:"Baharat is a blend of black pepper, coriander, cinnamon, cloves and nutmeg." },
    { id:"r7", cuisine:"indian", name:"Lamb Rogan Josh", emoji:"🌶️", time:"1h 15min", servings:4, difficulty:"Medium", tag:"lamb chops", desc:"The jewel of Kashmiri cuisine. Deeply aromatic, ruby-red lamb curry.", ingredients:["500g lamb","1 large onion","4 garlic cloves","2cm ginger","4 tbsp Kashmiri chilli powder","2 tsp coriander powder","1 tsp cumin","½ tsp fennel seeds","2 cardamom pods","1 cup plain yogurt","Ghee"], steps:[{title:"Whole spices",desc:"Heat ghee. Fry cardamom and fennel seeds 30 sec until fragrant."},{title:"Onion base",desc:"Add finely sliced onion. Cook 20 min on low until deep golden brown."},{title:"Aromatics",desc:"Add ginger-garlic paste. Cook 3 min. Add all dry spices. Cook 2 min."},{title:"Add lamb",desc:"Add lamb pieces. Fry on medium-high 8–10 min until browned all over."},{title:"Simmer",desc:"Whisk in yogurt gradually. Add ½ cup water. Cover and simmer 45 min until lamb is very tender."}], tip:"Kashmiri chilli gives the iconic red colour without intense heat — it's essential." },
    { id:"r8", cuisine:"indian", name:"Keema Curry", emoji:"🍛", time:"35 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"Spiced minced beef with peas. The ultimate quick weeknight curry.", ingredients:["400g minced beef","200g frozen peas","2 onions, diced","3 garlic cloves","2cm ginger","2 tomatoes, chopped","1 tsp cumin seeds","2 tsp garam masala","1 tsp turmeric","1 tsp chilli powder","Fresh coriander"], steps:[{title:"Fry cumin",desc:"Heat oil. Add cumin seeds and let them sizzle and pop 30 sec."},{title:"Onions",desc:"Add diced onions. Cook 10 min until golden. Add garlic and ginger, cook 2 min."},{title:"Tomatoes",desc:"Add chopped tomatoes and all dry spices. Cook 5 min until tomatoes break down."},{title:"Mince",desc:"Add beef mince. Break up and fry on high heat 8 min until browned and dry."},{title:"Peas",desc:"Add frozen peas and 100ml water. Simmer 5 min. Top with fresh coriander."}], tip:"Cooking on high heat until mince is quite dry concentrates all the flavour." },
    { id:"r9", cuisine:"asian", name:"Korean Beef Bulgogi", emoji:"🥢", time:"25 min", servings:4, difficulty:"Easy", tag:"beef sirloin", desc:"Sweet, savoury, slightly smoky Korean BBQ beef. Best thing you'll put in a pan.", ingredients:["400g beef sirloin, very thinly sliced","5 tbsp soy sauce","3 tbsp brown sugar","2 tbsp sesame oil","4 garlic cloves, grated","2cm ginger, grated","1 Asian pear (or kiwi), grated","Sesame seeds, spring onions"], steps:[{title:"Slice thin",desc:"Slice beef paper-thin — freeze for 30 min first to make slicing easier."},{title:"Marinade",desc:"Mix soy, sugar, sesame oil, garlic, ginger and grated pear."},{title:"Marinate",desc:"Coat beef well. Marinate minimum 30 min, up to 24 hours."},{title:"Cook hot",desc:"Cook in batches in a smoking-hot pan. Do not overcrowd — you want char, not steam."},{title:"Serve",desc:"Serve over steamed rice with kimchi, sliced spring onions and sesame seeds."}], tip:"The grated Asian pear is the traditional tenderiser — absolutely worth finding." },
    { id:"r10", cuisine:"asian", name:"Mongolian Lamb Stir-Fry", emoji:"🍜", time:"20 min", servings:2, difficulty:"Easy", tag:"lamb chops", desc:"Bold Chinese-American takeaway classic. Tender lamb with a glossy hoisin sauce.", ingredients:["300g lamb, thinly sliced","3 tbsp hoisin sauce","2 tbsp soy sauce","1 tbsp oyster sauce","1 tsp cornstarch","3 garlic cloves","2cm ginger","4 spring onions","1 tsp sesame oil","Chilli flakes"], steps:[{title:"Velvet the lamb",desc:"Toss sliced lamb with cornstarch and a pinch of salt."},{title:"Make sauce",desc:"Mix hoisin, soy, oyster sauce and sesame oil in a bowl."},{title:"Sear",desc:"Cook lamb in very hot wok, in a single layer, 2 min. Remove and set aside."},{title:"Aromatics",desc:"Add garlic, ginger and white parts of spring onion. Fry 1 min."},{title:"Finish",desc:"Return lamb. Add sauce. Toss 1 min until coated and glossy."}], tip:"Velveting is the restaurant secret that makes stir-fry meat tender, not chewy." }],
  bull: [
    { id:"b1", cuisine:"classic", name:"Perfect Cast Iron Ribeye", emoji:"🧈", time:"20 min", servings:2, difficulty:"Medium", tag:"ribeye steak", desc:"The definitive steakhouse ribeye at home. Crust like glass, pink inside.", ingredients:["400g ribeye steak (3cm thick)","Coarse sea salt","Cracked black pepper","3 tbsp butter","4 garlic cloves, crushed","Fresh thyme","Beef dripping or high-smoke oil"], steps:[{title:"Dry and season",desc:"Pat steak completely dry. Season with salt 45 min before cooking. Pepper just before pan."},{title:"Ripping hot pan",desc:"Get cast iron screaming hot for 3 min — until smoking."},{title:"First sear",desc:"Add a drop of beef dripping. Lay steak away from you. Do not move for 2.5 min."},{title:"Butter baste",desc:"Flip. Add butter, garlic and thyme immediately. Tilt pan, baste continuously 2 min."},{title:"Rest",desc:"Rest on a rack (not a plate) for 8 min. Slice against grain."}], tip:"Never cook a cold steak. Room temperature for 1 hour before = even cooking all the way through." },
    { id:"b2", cuisine:"classic", name:"Smash Burgers", emoji:"🍔", time:"18 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"The diner-style smash burger that changed burger culture forever.", ingredients:["600g minced beef (20% fat)","8 slices American cheese","4 brioche buns","Shredded lettuce","Sliced pickles","Burger sauce: mayo, ketchup, mustard, pickle juice, paprika"], steps:[{title:"Balls not patties",desc:"Divide mince into 150g loose balls. Do NOT compress or season yet."},{title:"Scorching griddle",desc:"Get a heavy griddle or cast iron pan as hot as it will go. Lightly oil."},{title:"SMASH",desc:"Place ball on griddle. Immediately smash flat with a spatula. Season with salt. Cook 90 seconds until edges look crispy."},{title:"Flip and cheese",desc:"Flip once, lay cheese on immediately. Cook 45 seconds. Remove."},{title:"Stack and serve",desc:"Toast buns. Sauce the bottom. Stack two patties per burger. Serve immediately."}], tip:"20% fat mince is essential. Lean mince makes dry, sad burgers." },
    { id:"b3", cuisine:"bbq", name:"Cowboy Ribeye on the Bone", emoji:"🤠", time:"40 min", servings:2, difficulty:"Medium", tag:"ribeye steak", desc:"Thick-cut, bone-in ribeye cooked over live fire. Prehistoric, magnificent.", ingredients:["400g thick bone-in ribeye","Coarse salt","Black pepper","Garlic powder","Fresh rosemary for basting","Butter"], steps:[{title:"Season",desc:"Season ribeye on all sides with salt, pepper and garlic powder. Refrigerate uncovered overnight."},{title:"Reverse sear start",desc:"Roast at 110°C for 25 min until internal temp hits 45°C."},{title:"Ripping grill",desc:"Get your grill as hot as possible while steak rests."},{title:"Hard sear",desc:"Sear on screaming grill 2 min per side. Sear the fat cap too."},{title:"Rest and serve",desc:"Rest 10 min. Finish with a pat of butter."}], tip:"The reverse-sear method gives perfect edge-to-edge doneness." },
    { id:"b4", cuisine:"bbq", name:"Coffee-Rubbed BBQ Brisket", emoji:"☕", time:"4h", servings:6, difficulty:"Advanced", tag:"slow-cook beef", desc:"Dark, crackling bark outside. Meltingly tender inside.", ingredients:["800g beef brisket","2 tbsp ground coffee","2 tbsp smoked paprika","1 tbsp brown sugar","1 tbsp black pepper","1 tbsp salt","1 tsp garlic powder","1 tsp onion powder"], steps:[{title:"Rub",desc:"Mix all dry ingredients. Rub generously all over brisket. Refrigerate uncovered overnight."},{title:"Low and slow",desc:"Cook at 120°C (indirect heat or low oven) for 3–3.5 hours until internal temp is 75°C."},{title:"Wrap",desc:"Wrap tightly in butcher paper. Cook further 1 hour until internal temp hits 92°C."},{title:"Rest",desc:"Rest wrapped for 1 hour minimum."},{title:"Slice",desc:"Slice across the grain into pencil-thick slices. Serve with pickles and white bread."}], tip:"If brisket temperature stalls around 70°C, push through — it WILL rise again." },
    { id:"b5", cuisine:"arabic", name:"Beef Shawarma", emoji:"🥙", time:"40 min", servings:4, difficulty:"Easy", tag:"beef sirloin", desc:"The Levantine street food icon. Spiced sliced beef in flatbread with tahini and pickles.", ingredients:["400g beef sirloin, thinly sliced","1 tsp cumin","1 tsp coriander","1 tsp cinnamon","½ tsp cardamom","½ tsp turmeric","3 tbsp vinegar","3 tbsp olive oil","Garlic","Flatbread, tomato, pickled turnip, tahini sauce"], steps:[{title:"Marinade",desc:"Mix spices, vinegar, oil and garlic. Coat beef slices. Marinate 2 hours."},{title:"Stack and roast",desc:"Stack marinated slices tightly on a skewer or in a loaf tin. Roast at 220°C for 25 min."},{title:"Slice thin",desc:"Shave thin slices off the outside of the cooked stack."},{title:"Char",desc:"Flash the shaved slices in a very hot pan 1 min for extra char."},{title:"Assemble",desc:"Warm flatbread. Spread tahini sauce. Add beef, tomato, pickled turnip and fresh parsley."}], tip:"The layering and roasting technique mimics a shawarma spit at home — it actually works." },
    { id:"b6", cuisine:"arabic", name:"Hawawshi (Stuffed Egyptian Bread)", emoji:"🫓", time:"35 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"Crispy Egyptian flatbread stuffed with spiced minced beef. Street food perfection.", ingredients:["400g minced beef","1 onion, finely diced","2 tomatoes, diced","2 green chillies","1 tsp cumin","1 tsp coriander","½ tsp cinnamon","Fresh parsley","4 flatbreads or pitta"], steps:[{title:"Mix filling",desc:"Combine raw minced beef with all ingredients — don't cook the meat first."},{title:"Stuff",desc:"Open flatbread. Fill one half with the raw beef mixture. Press other half down firmly."},{title:"Pan fry",desc:"In a dry pan on medium heat, cook stuffed bread 6–7 min per side, pressing down with a spatula."},{title:"Finish",desc:"Bread should be crispy. Beef inside should be fully cooked."},{title:"Serve",desc:"Cut into wedges. Serve with fresh tomato salad and tahini."}], tip:"Using raw meat in the filling is traditional — it steams from inside and stays incredibly juicy." },
    { id:"b7", cuisine:"indian", name:"Beef Madras Curry", emoji:"🌶️", time:"50 min", servings:4, difficulty:"Medium", tag:"slow-cook beef", desc:"South Indian-style hot, tangy beef curry with a deep, complex sauce.", ingredients:["500g beef, cubed","2 onions","4 garlic cloves","2cm ginger","3 tsp Madras curry powder","1 tsp turmeric","1 tin chopped tomatoes","1 tbsp tamarind paste","Curry leaves","Coconut oil"], steps:[{title:"Curry base",desc:"Fry diced onion in coconut oil 15 min until deep brown. Add curry leaves."},{title:"Paste",desc:"Add garlic, ginger paste and all spices. Fry 3 min until oil separates."},{title:"Beef",desc:"Add beef cubes. Brown all over 8 min on high heat."},{title:"Simmer",desc:"Add tomatoes and tamarind. Cover and simmer on low 30–35 min until beef is very tender."},{title:"Finish",desc:"Uncover and cook 5 min to reduce and intensify."}], tip:"Tamarind is essential for the sour note that defines Madras — don't skip it." },
    { id:"b8", cuisine:"indian", name:"Beef Seekh Kebab", emoji:"🍢", time:"30 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"Charred minced beef kebabs spiced with ginger, chilli and garam masala.", ingredients:["500g minced beef","1 onion, grated","3 garlic cloves","2cm ginger, grated","1 tsp garam masala","1 tsp cumin","½ tsp chilli powder","Fresh coriander and mint","1 tbsp chickpea flour","Salt"], steps:[{title:"Mix",desc:"Combine mince with all ingredients. Knead 2 minutes. Refrigerate 30 min."},{title:"Skewer",desc:"Wet hands. Divide into 8. Shape around flat metal skewers into 15cm cylinders."},{title:"Grill",desc:"Grill on high heat, turning every 2 min. Total 10–12 min."},{title:"Char",desc:"Blast over highest heat the last 2 min for charred spots."},{title:"Serve",desc:"Serve with mint chutney, sliced onion soaked in lemon juice, and warmed naan."}], tip:"Chickpea flour binds the kebab and adds a subtle nuttiness." },
    { id:"b9", cuisine:"asian", name:"Japanese Gyudon (Beef Bowl)", emoji:"🍚", time:"20 min", servings:2, difficulty:"Easy", tag:"beef sirloin", desc:"Tokyo's iconic beef and onion rice bowl. The fastest comfort food in existence.", ingredients:["300g beef sirloin, paper thin","1 large onion, sliced","300ml dashi or chicken stock","4 tbsp soy sauce","3 tbsp mirin","2 tbsp sake","1 tbsp sugar","Steamed Japanese rice","Pickled ginger, soft-boiled egg"], steps:[{title:"Simmer onions",desc:"Simmer sliced onions in dashi, soy, mirin, sake and sugar for 10 min until translucent."},{title:"Add beef",desc:"Add paper-thin beef slices. Cook only 2–3 min."},{title:"Taste",desc:"Taste broth — should be sweet, savoury. Adjust soy or sugar."},{title:"Assemble",desc:"Spoon rice into bowls. Ladle beef and onions over with generous broth."},{title:"Top",desc:"Add a soft-boiled egg (6.5 min), pickled ginger and spring onion."}], tip:"Ask your butcher to slice the sirloin paper-thin, or semi-freeze it to slice at home." },
    { id:"b10", cuisine:"asian", name:"Vietnamese Beef Pho", emoji:"🍲", time:"1h 20min", servings:4, difficulty:"Medium", tag:"slow-cook beef", desc:"Vietnam's soul-warming noodle soup. A deeply fragrant, clear broth with tender beef.", ingredients:["500g beef bones or slow-cook beef","200g rice noodles","1 onion, charred","5cm ginger, charred","3 star anise","3 cloves","1 cinnamon stick","Fish sauce","Bean sprouts, basil, lime, chilli to serve"], steps:[{title:"Char aromatics",desc:"Char onion and ginger directly over flame until blackened. This gives pho its smoky depth."},{title:"Toast spices",desc:"Toast star anise, cloves and cinnamon in a dry pan 1 min until fragrant."},{title:"Build broth",desc:"Simmer beef bones/meat with charred veg, toasted spices and fish sauce for 1 hour. Skim constantly."},{title:"Strain",desc:"Strain broth — it should be crystal clear. Season with fish sauce and a touch of sugar."},{title:"Serve",desc:"Soak noodles per packet. Bowl them up. Pour hot broth over. Add raw-sliced beef — it cooks in the broth."}], tip:"A great pho broth should be clear, not cloudy. Constant skimming is the key." }],
  crown: [
    { id:"a1", cuisine:"classic", name:"Sunday Roast Feast", emoji:"🏆", time:"2h 30min", servings:6, difficulty:"Medium", tag:"chicken + beef", desc:"The full Sunday roast — chicken AND beef, all the trimmings.", ingredients:["1 whole chicken","400g beef sirloin","Roasting vegetables: carrots, parsnips, onions","Roasting potatoes","Fresh thyme and rosemary","Butter","Beef stock for gravy"], steps:[{title:"Plan ahead",desc:"Start beef first — it needs longer. Season both meats with salt 1 hour before."},{title:"Roast chicken",desc:"Stuff cavity with herbs and lemon. Rub with butter. Roast at 200°C for 1h 15min."},{title:"Roast beef",desc:"Sear sirloin in a hot pan. Roast at 200°C for 20 min per 500g for medium-rare. Rest 15 min."},{title:"Roast veg",desc:"Par-boil potatoes 7 min. Roast in beef fat at 220°C for 40 min until golden and crunchy."},{title:"Gravy",desc:"Deglaze roasting trays with red wine and beef stock. Reduce and strain."}], tip:"Resting the beef is as important as cooking it. Never skip it." },
    { id:"a2", cuisine:"classic", name:"Mixed Grill Platter", emoji:"🔥", time:"45 min", servings:4, difficulty:"Medium", tag:"everything", desc:"The whole box on one platter. Every protein, perfectly cooked, served together.", ingredients:["Chicken legs and filets","Beef sirloin","Lamb chops","Olive oil, salt, pepper","Lemon","Fresh herbs","Grilled bread and salad"], steps:[{title:"Sequence plan",desc:"Start lamb chops first (15 min), then beef (10 min), then chicken pieces (20 min). Stagger starts."},{title:"Season",desc:"Season everything simply — olive oil, salt, pepper. Let the quality of the meat speak."},{title:"Grill chicken",desc:"Grill chicken legs on indirect heat 20 min, finishing over direct heat 5 min."},{title:"Grill beef and lamb",desc:"Grill sirloin 3 min per side. Grill lamb chops 3 min per side. Rest all meat."},{title:"Platter",desc:"Arrange on a large board with grilled lemons, fresh herbs and a large salad."}], tip:"Let each piece rest before adding to the platter — a warm oven at 60°C keeps everything hot." },
    { id:"a3", cuisine:"bbq", name:"The Ultimate Garden Party BBQ", emoji:"🎉", time:"1h", servings:8, difficulty:"Medium", tag:"everything", desc:"Chicken, beef, lamb — all on the grill at once. Feed a crowd, impress everyone.", ingredients:["Whole chicken legs","Beef sirloin","Lamb chops","Minced beef for burgers","BBQ spice rub","Honey glaze","Burger buns and sides"], steps:[{title:"Prep day before",desc:"Marinate chicken legs in spice rub overnight. Form burger patties, refrigerate."},{title:"Timing chart",desc:"Chicken needs 40 min, lamb chops 12 min, beef 8 min, burgers 10 min. Work backwards from serving time."},{title:"Two-zone grill",desc:"Set up indirect and direct zones. Slow zone for chicken, hot zone for beef and lamb."},{title:"Cook in waves",desc:"Chicken goes on first. Add lamb and beef in final 15 min. Smash burgers last."},{title:"Serve",desc:"Set out all sauces, salads and sides. Let guests build their plates."}], tip:"Write out your timing plan before you start. Chaos kills a BBQ faster than bad meat." },
    { id:"a4", cuisine:"arabic", name:"Musakhan (Palestinian Roast Chicken)", emoji:"🧅", time:"1h", servings:4, difficulty:"Medium", tag:"whole chicken", desc:"Palestine's national dish. Chicken roasted with mountains of caramelised onion and sumac.", ingredients:["1 whole chicken, jointed","1 kg onions, thinly sliced","3 tbsp sumac","1 tsp allspice","½ tsp cinnamon","4 tbsp olive oil","Flatbread","Toasted pine nuts and almonds"], steps:[{title:"Caramelise onions",desc:"Cook sliced onions in olive oil on medium-low for 40 min until very soft and golden."},{title:"Season chicken",desc:"Rub chicken pieces with sumac, allspice, cinnamon, salt and olive oil."},{title:"Combine",desc:"Mix half the cooked onions with the chicken. Roast at 200°C for 35–40 min."},{title:"Flatbread layer",desc:"Lay flatbread on serving platter. Cover with remaining caramelised onions."},{title:"Serve",desc:"Place roast chicken on the onion-covered bread. Scatter toasted nuts. Drizzle olive oil over."}], tip:"More sumac than you think. Be bold with it — it's what makes musakhan extraordinary." },
    { id:"a5", cuisine:"indian", name:"Crown Biryani", emoji:"🍚", time:"2h", servings:6, difficulty:"Advanced", tag:"chicken + lamb", desc:"Mixed meat biryani — chicken and lamb layered with fragrant basmati.", ingredients:["400g chicken pieces","300g lamb chops","500g basmati rice","3 large onions","Ghee","Saffron in warm milk","Biryani spice mix","Fresh mint and coriander"], steps:[{title:"Cook meats separately",desc:"Braise chicken in spiced yogurt sauce 20 min. Braise lamb in separate spiced sauce 35 min."},{title:"Fry onions",desc:"Fry thinly sliced onions in ghee until deep golden and crisp. Takes 25 min."},{title:"Par-cook rice",desc:"Boil salted water with cardamom. Cook rice exactly 6 min — drain while slightly undercooked."},{title:"Layer",desc:"Pot: layer chicken, then lamb, then rice, then saffron milk, then fried onions, then herbs."},{title:"Dum",desc:"Seal pot tightly. Cook on very low heat 25 min."}], tip:"Two separate meat preparations take time but create an unmatchable depth of flavour." },
    { id:"a6", cuisine:"asian", name:"Hot Pot Night", emoji:"🍲", time:"30 min", servings:4, difficulty:"Easy", tag:"everything", desc:"Interactive Chinese hot pot — paper-thin meats cooked by everyone at the table.", ingredients:["Thinly sliced beef sirloin","Thinly sliced chicken filets","Lamb, thinly sliced","Hot pot broth: stock, ginger, garlic, chilli, soy","Rice noodles, tofu, mushrooms","Dipping sauces: sesame paste, hoisin, chilli oil"], steps:[{title:"Prep the broth",desc:"Simmer stock with ginger, garlic, chilli bean paste, soy and sesame oil."},{title:"Slice meats thin",desc:"Freeze meats 30 min then slice paper-thin. Arrange on platters around the table."},{title:"Set up table",desc:"Place electric hot pot or portable burner in table centre. Arrange all ingredients around it."},{title:"Make dips",desc:"Individual dipping bowls: sesame paste thinned with broth, hoisin, chilli oil."},{title:"Cook and eat",desc:"Everyone cooks their own pieces by swishing in the hot broth 30–60 seconds."}], tip:"Hot pot is an event, not just a meal. Dim the lights, pour drinks, and let it run for 2 hours." },
    { id:"a7", cuisine:"bbq", name:"Korean BBQ Night (Gogigui)", emoji:"🥢", time:"30 min", servings:4, difficulty:"Easy", tag:"beef + chicken", desc:"Korean BBQ at home — marinated meats grilled at the table.", ingredients:["Thinly sliced beef sirloin","Chicken filets","Bulgogi marinade: soy, pear, sugar, sesame","Chicken marinade: gochujang, garlic, sugar, oil","Lettuce leaves, rice, kimchi","Dipping sauces"], steps:[{title:"Marinades",desc:"Prepare both marinades. Marinate beef and chicken separately for at least 2 hours."},{title:"Set up",desc:"Heat a grill pan or tabletop grill. Prepare lettuce, rice, kimchi and all sides."},{title:"Grill beef",desc:"Cook bulgogi beef in batches on high heat 2 min per side."},{title:"Grill chicken",desc:"Cook gochujang chicken 4 min per side until charred and glossy."},{title:"Ssam wraps",desc:"Wrap grilled meat in lettuce leaf with rice, kimchi, sliced garlic and ssamjang paste."}], tip:"The ssam wrap (lettuce cup) balances the richness of the meat perfectly." },
    { id:"a8", cuisine:"indian", name:"Mixed Tandoori Platter", emoji:"🫙", time:"45 min", servings:4, difficulty:"Medium", tag:"chicken + lamb", desc:"A full tandoori platter — marinated chicken and lamb, char-grilled to perfection.", ingredients:["Chicken legs and filets","Lamb chops","200ml plain yogurt","2 tsp tandoori masala","1 tsp turmeric","1 tsp paprika","Ginger-garlic paste","Lemon juice","Mint chutney, sliced onions"], steps:[{title:"Score meats",desc:"Score chicken and lamb deeply with a knife so marinade penetrates to the bone."},{title:"Marinade",desc:"Mix yogurt, all spices, ginger-garlic paste and lemon juice. Coat meats completely."},{title:"Marinate",desc:"Refrigerate at least 4 hours — overnight transforms the meat."},{title:"High heat",desc:"Grill or oven at maximum heat (250°C+). Cook chicken 25 min, lamb chops 10 min."},{title:"Serve",desc:"Arrange on a platter with sliced onion, lemon wedges and fresh mint chutney."}], tip:"The yogurt marinade tenderises through enzymes AND protects from fierce heat." }],
};

const TIERS = [
  { key:"lite",  label:"Beast Lite",  sub:"2 kg",    range:"~2 kg",    icon:"⚡", note:"1–2 people" },
  { key:"max",   label:"Beast Max",   sub:"4–5 kg",  range:"~4–5 kg",  icon:"🔥", note:"3–4 people", popular:true },
  { key:"ultra", label:"Beast Ultra", sub:"8–10 kg", range:"~8–10 kg", icon:"💪", note:"Family size" }];
const BOXES = [
  { key:"flock", name:"The Flock",   tagline:"Pure poultry power",    icon:"🍗", color:"#B87333", bg:"#FDF6EE", desc:"All bird, all day. Whole chicken, juicy legs and tender filets — the clean protein pick.", categories:["Poultry Only"], contents:{ lite:["1 whole chicken (1 kg)","4 chicken legs","200g chicken filets"], max:["2 whole chickens (2 kg)","6 chicken legs","500g chicken filets","4 turkey escalopes"], ultra:["3 whole chickens (3.5 kg)","10 chicken legs","1 kg chicken filets","6 turkey escalopes"] }, price:{ lite:39, max:72, ultra:128 } },
  { key:"riot",  name:"Red Riot",    tagline:"Beef meets lamb",        icon:"🥩", color:"#9B3A3A", bg:"#FEF0EE", desc:"The boldest duo in the box. Heritage beef and aromatic lamb — for when you mean business.", categories:["Red Meat Mix"], contents:{ lite:["250g beef sirloin","200g minced beef","2 lamb chops"], max:["500g beef sirloin","400g minced beef","4 lamb chops","300g lamb shoulder"], ultra:["1 kg beef sirloin","800g minced beef","8 lamb chops","600g lamb shoulder","2 lamb racks"] }, price:{ lite:48, max:89, ultra:158 } },
  { key:"bull",  name:"The Bull",    tagline:"Beef. Just beef.",       icon:"🎯", color:"#C0392B", bg:"#FEF2F2", desc:"No distractions. No compromises. Premium dry-aged beef cuts for the serious carnivore.", categories:["Beef Only"], contents:{ lite:["200g ribeye steak","300g minced beef","150g beef tenderloin"], max:["400g ribeye steak","600g minced beef","300g beef tenderloin","300g beef sirloin"], ultra:["800g ribeye steak","1.2 kg minced beef","600g beef tenderloin","600g beef sirloin","400g slow-cook beef"] }, price:{ lite:52, max:96, ultra:172 } },
  { key:"crown", name:"The Crown",  tagline:"The complete box",  icon:"👑", color:"#1C1917", bg:"#F5F2EE", desc:"The whole show — poultry, beef, veal and lamb. Maximum variety, maximum satisfaction.", categories:["Total Assortment"], contents:{ lite:["1 whole chicken","200g beef sirloin","200g veal escalope","2 lamb chops","200g minced beef"], max:["2 whole chickens","400g beef sirloin","400g veal escalope","4 lamb chops","400g minced beef","4 chicken legs","2 lamb chops"], ultra:["3 whole chickens","800g beef sirloin","600g veal escalope","300g veal tenderloin","8 lamb chops","800g minced beef","8 chicken legs","300g beef tenderloin","500g lamb shoulder"] }, price:{ lite:48, max:88, ultra:156 } }];
const DELIVERY_FREE_THRESHOLD = 70;
const DELIVERY_FEE = 8;

/* ─── À LA CARTE CATALOG — sourced from MeatBeast_Pricing_Analysis.xlsx ───────
   All 39 fresh-meat lines from the butcher's Schedule A price list.
   Prepared/traiteur items (merguez, kefta, burgers) excluded for now.
   Prices are the platform per-kg rate from the pricing analysis, except
   items marked unit:true which are priced per whole item. ─────────────────── */
const ALC_ITEMS = [
  // POULTRY (11)
  { id:1,  cat:"poultry", unit:false, w:"per kg", p:13.29, names:{en:"Chicken Breast Fillet",fr:"Filet de Poulet",de:"Hähnchenbrustfilet",lb:"Poulet-Broscht",bs:"Pileća prsa",pt:"Peito de Frango",ar:"صدر دجاج"} },
  { id:2,  cat:"poultry", unit:false, w:"per kg", p:7.79,  names:{en:"Chicken Thigh",fr:"Cuisse de Poulet",de:"Hähnchenkeule",lb:"Poulet-Schenkel",bs:"Pileći batak",pt:"Coxa de Frango",ar:"فخذ دجاج"} },
  { id:3,  cat:"poultry", unit:false, w:"per kg", p:7.69,  names:{en:"Chicken Drumstick",fr:"Pilon de Poulet",de:"Hähnchenschlegel",lb:"Poulet-Ënnerschenkel",bs:"Pileći batak (donji)",pt:"Perna de Frango",ar:"ساق دجاج"} },
  { id:4,  cat:"poultry", unit:false, w:"per kg", p:7.69,  names:{en:"Chicken Wings",fr:"Ailes de Poulet",de:"Hähnchenflügel",lb:"Poulet-Fligel",bs:"Pileća krila",pt:"Asas de Frango",ar:"أجنحة دجاج"} },
  { id:5,  cat:"poultry", unit:true,  w:"per unit ~1.4kg", p:6.99, names:{en:"Whole Chicken",fr:"Poulet Entier",de:"Ganzes Hähnchen",lb:"Ganze Poulet",bs:"Cijela piletina",pt:"Frango Inteiro",ar:"دجاجة كاملة"} },
  { id:6,  cat:"poultry", unit:false, w:"per kg", p:13.39, names:{en:"Free-Range Chicken",fr:"Poulet Fermier",de:"Freilandhähnchen",lb:"Fräilaaf-Poulet",bs:"Domaća piletina",pt:"Frango do Campo",ar:"دجاج بلدي"} },
  { id:7,  cat:"poultry", unit:false, w:"per kg", p:18.19, names:{en:"Sliced Chicken Strips",fr:"Émincé de Poulet",de:"Hähnchenstreifen",lb:"Poulet-Sträifen",bs:"Piletina na trakice",pt:"Tiras de Frango",ar:"شرائح دجاج"} },
  { id:8,  cat:"poultry", unit:false, w:"per kg", p:13.29, names:{en:"Chicken Skewer",fr:"Brochette de Poulet",de:"Hähnchenspieß",lb:"Poulet-Spiéss",bs:"Pileći ražnjić",pt:"Espetada de Frango",ar:"شيش طاووق"} },
  { id:9,  cat:"poultry", unit:false, w:"per kg", p:13.29, names:{en:"Marinated Chicken Wings",fr:"Ailes Marinées",de:"Marinierte Hähnchenflügel",lb:"Mariméiert Fligel",bs:"Marinirana krila",pt:"Asas Marinadas",ar:"أجنحة متبلة"} },
  { id:10, cat:"poultry", unit:false, w:"per kg", p:12.29, names:{en:"Marinated Chicken Thigh",fr:"Cuisse Marinée",de:"Marinierte Hähnchenkeule",lb:"Mariméierte Schenkel",bs:"Marinirani batak",pt:"Coxa Marinada",ar:"فخذ متبل"} },
  { id:11, cat:"poultry", unit:false, w:"per kg", p:16.09, names:{en:"Turkey Breast Fillet",fr:"Filet de Dinde",de:"Putenbrustfilet",lb:"Fildung-Broscht",bs:"Pureća prsa",pt:"Peito de Peru",ar:"صدر ديك رومي"} },
  // BEEF (12)
  { id:12, cat:"beef", unit:false, w:"per kg", p:49.09, names:{en:"Beef Tenderloin",fr:"Filet de Bœuf",de:"Rinderfilet",lb:"Rëndsfilet",bs:"Goveđi file",pt:"Lombo de Vaca",ar:"فيليه بقري"} },
  { id:13, cat:"beef", unit:false, w:"per kg", p:27.89, names:{en:"Sirloin Steak",fr:"Faux-Filet",de:"Rinderlende",lb:"Rëndssirloin",bs:"Goveđi biftek",pt:"Alcatra",ar:"ستيك سيرلوين"} },
  { id:14, cat:"beef", unit:false, w:"per kg", p:30.19, names:{en:"Ribeye Steak",fr:"Entrecôte",de:"Ribeye-Steak",lb:"Ribeye-Steak",bs:"Ribeye odrezak",pt:"Entrecosto",ar:"ريب آي"} },
  { id:15, cat:"beef", unit:false, w:"per kg", p:25.69, names:{en:"Rump Steak",fr:"Rumsteak",de:"Rumpsteak",lb:"Rëndssirloin (Ronn)",bs:"But odrezak",pt:"Rump Steak",ar:"رامب ستيك"} },
  { id:16, cat:"beef", unit:false, w:"per kg", p:19.99, names:{en:"Flank Steak",fr:"Bavette",de:"Bauchlappen",lb:"Bavette",bs:"Trbušina",pt:"Bavete",ar:"لحم البطن"} },
  { id:17, cat:"beef", unit:false, w:"per kg", p:17.89, names:{en:"Minced Beef",fr:"Haché Pur Bœuf",de:"Rinderhack",lb:"Gehackt Rëndfleesch",bs:"Mljevena govedina",pt:"Carne Picada de Vaca",ar:"لحم بقري مفروم"} },
  { id:18, cat:"beef", unit:false, w:"per kg", p:17.89, names:{en:"Beef Burger Patty",fr:"Burger Bœuf",de:"Rinder-Burgerpatty",lb:"Rëndfleesch-Burger",bs:"Pljeskavica od govedine",pt:"Hambúrguer de Vaca",ar:"برغر بقري"} },
  { id:19, cat:"beef", unit:false, w:"per kg", p:27.19, names:{en:"Beef Rib on Bone",fr:"Côte à l'Os",de:"Rinderrippe mit Knochen",lb:"Rëndsript mat Schuel",bs:"Goveđe rebro s kosti",pt:"Costela de Vaca",ar:"ضلع بقري بالعظم"} },
  { id:20, cat:"beef", unit:false, w:"per kg", p:17.19, names:{en:"Beef Stew Pieces",fr:"Ragoût de Bœuf",de:"Rindergulasch",lb:"Rëndfleesch fir Ragout",bs:"Govedina za gulaš",pt:"Carne de Vaca para Ensopado",ar:"لحم بقري للطبخ"} },
  { id:21, cat:"beef", unit:false, w:"per kg", p:15.59, names:{en:"Beef Shin",fr:"Jarret de Bœuf",de:"Rinderhaxe",lb:"Rëndsjaarret",bs:"Goveđa koljenica",pt:"Chambão de Vaca",ar:"كراع بقري"} },
  { id:22, cat:"beef", unit:false, w:"per kg", p:30.09, names:{en:"Beef Skewer",fr:"Brochette de Bœuf",de:"Rinderspieß",lb:"Rëndsspiéss",bs:"Goveđi ražnjić",pt:"Espetada de Vaca",ar:"شيش لحم بقري"} },
  { id:23, cat:"beef", unit:false, w:"per kg", p:29.39, names:{en:"Marinated Sirloin",fr:"Faux-Filet Mariné",de:"Marinierte Rinderlende",lb:"Mariméiert Sirloin",bs:"Marinirani biftek",pt:"Alcatra Marinada",ar:"سيرلوين متبل"} },
  // VEAL (6) — newly added
  { id:24, cat:"veal", unit:false, w:"per kg", p:41.09, names:{en:"Veal Tenderloin",fr:"Filet Mignon de Veau",de:"Kalbsfilet",lb:"Kallefleesch-Filet",bs:"Teleći file",pt:"Lombo de Vitela",ar:"فيليه عجل"} },
  { id:25, cat:"veal", unit:false, w:"per kg", p:26.79, names:{en:"Veal Escalope",fr:"Escalope de Veau",de:"Kalbsschnitzel",lb:"Kallefleesch-Eskalop",bs:"Teleći odrezak",pt:"Escalope de Vitela",ar:"إسكالوب عجل"} },
  { id:26, cat:"veal", unit:false, w:"per kg", p:25.59, names:{en:"Veal Chop",fr:"Côtelette de Veau",de:"Kalbskotelett",lb:"Kallefleesch-Kotelett",bs:"Teleći kotlet",pt:"Costeleta de Vitela",ar:"قطعة عجل"} },
  { id:27, cat:"veal", unit:false, w:"per kg", p:26.79, names:{en:"Veal Roast",fr:"Rôti de Veau",de:"Kalbsbraten",lb:"Kallefleesch-Braten",bs:"Teleće pečenje",pt:"Assado de Vitela",ar:"روستو عجل"} },
  { id:28, cat:"veal", unit:false, w:"per kg", p:17.79, names:{en:"Minced Veal",fr:"Haché Pur Veau",de:"Kalbshack",lb:"Gehackt Kallefleesch",bs:"Mljevena teletina",pt:"Carne Picada de Vitela",ar:"لحم عجل مفروم"} },
  { id:29, cat:"veal", unit:false, w:"per kg", p:29.49, names:{en:"Sliced Veal",fr:"Émincé de Veau",de:"Kalbsstreifen",lb:"Kallefleesch-Sträifen",bs:"Teletina na trakice",pt:"Tiras de Vitela",ar:"شرائح عجل"} },
  // LAMB (10)
  { id:30, cat:"lamb", unit:false, w:"per kg", p:27.19, names:{en:"Lamb Chops",fr:"Côtelettes d'Agneau",de:"Lammkoteletts",lb:"Lammkoteletten",bs:"Jagnjeći kotleti",pt:"Costeletas de Borrego",ar:"قطع لحم خروف"} },
  { id:31, cat:"lamb", unit:false, w:"per kg", p:27.39, names:{en:"Leg of Lamb",fr:"Gigot d'Agneau",de:"Lammkeule",lb:"Lammschanken",bs:"Jagnjeći but",pt:"Perna de Borrego",ar:"فخذ خروف"} },
  { id:32, cat:"lamb", unit:false, w:"per kg", p:29.39, names:{en:"Lamb Leg Steak",fr:"Tranche de Gigot",de:"Lammkeulensteak",lb:"Schank-Schnëtt",bs:"Odrezak od buta",pt:"Bife da Perna de Borrego",ar:"شريحة فخذ خروف"} },
  { id:33, cat:"lamb", unit:false, w:"per kg", p:28.29, names:{en:"Lamb Shoulder",fr:"Épaule d'Agneau",de:"Lammschulter",lb:"Lammschëller",bs:"Jagnjeća plećka",pt:"Pá de Borrego",ar:"كتف خروف"} },
  { id:34, cat:"lamb", unit:false, w:"per kg", p:21.19, names:{en:"Lamb Neck",fr:"Collier d'Agneau",de:"Lammhals",lb:"Lammhals",bs:"Jagnjeći vrat",pt:"Pescoço de Borrego",ar:"رقبة خروف"} },
  { id:35, cat:"lamb", unit:false, w:"per kg", p:16.69, names:{en:"Lamb Breast",fr:"Poitrine d'Agneau",de:"Lammbrust",lb:"Lammbrëscht",bs:"Jagnjeće grudi",pt:"Peito de Borrego",ar:"صدر خروف"} },
  { id:36, cat:"lamb", unit:false, w:"per kg", p:29.49, names:{en:"Marinated Lamb Rack",fr:"Côte d'Agneau Marinée",de:"Marinierter Lammrücken",lb:"Mariméiert Lammripp",bs:"Marinirana jagnjeća rebra",pt:"Carré de Borrego Marinado",ar:"ريش خروف متبلة"} },
  { id:37, cat:"lamb", unit:false, w:"per kg", p:40.19, names:{en:"Lamb Skewer",fr:"Brochette d'Agneau",de:"Lammspieß",lb:"Lammspiéss",bs:"Jagnjeći ražnjić",pt:"Espetada de Borrego",ar:"شيش خروف"} },
  { id:38, cat:"lamb", unit:false, w:"per kg", p:21.19, names:{en:"Minced Lamb",fr:"Haché d'Agneau",de:"Lammhack",lb:"Gehackt Lammfleesch",bs:"Mljevena jagnjetina",pt:"Carne Picada de Borrego",ar:"لحم خروف مفروم"} },
  { id:39, cat:"lamb", unit:true,  w:"per unit ~1.2kg", p:26.09, names:{en:"Half Leg of Lamb",fr:"Demi-Gigot",de:"Halbe Lammkeule",lb:"Hallef Lammschank",bs:"Pola jagnjećeg buta",pt:"Meia Perna de Borrego",ar:"نصف فخذ خروف"} },
];
function alcName(item,lang){ return item.names[lang]||item.names.fr||item.names.en; }

/* ─── Ingredient-aware recipe matching — used by the cart to suggest recipes
   based on which à la carte / BYOB cuts are currently in the basket ────────── */
const CUT_KEYWORDS = ["tenderloin","sirloin","ribeye","rump","flank","mince","minced","burger","rib","stew","shin","skewer","escalope","chop","roast","shoulder","neck","breast","rack","leg","wing","thigh","drumstick","whole","strips"];
function matchRecipesForCart(alcIds, extraKeywords){
  const hasIds = alcIds && alcIds.length>0;
  const hasExtra = extraKeywords && extraKeywords.length>0;
  if(!hasIds && !hasExtra) return [];
  const keywords = new Set();
  if(hasIds){
    alcIds.forEach(id=>{
      const it = ALC_ITEMS.find(x=>x.id===id);
      if(!it) return;
      const n = it.names.en.toLowerCase();
      if(it.cat==="poultry") keywords.add(n.includes("turkey")?"turkey":"chicken");
      if(it.cat==="beef") keywords.add("beef");
      if(it.cat==="veal") keywords.add("veal");
      if(it.cat==="lamb") keywords.add("lamb");
      CUT_KEYWORDS.forEach(w=>{ if(n.includes(w)) keywords.add(w); });
    });
  }
  if(hasExtra) extraKeywords.forEach(k=>keywords.add(k));
  const all = [...ALL_RECIPES.flock,...ALL_RECIPES.riot,...ALL_RECIPES.bull,...ALL_RECIPES.crown];
  const scored = all.map(r=>{
    const hay = (r.tag+" "+r.ingredients.join(" ")).toLowerCase();
    let score=0;
    keywords.forEach(k=>{ if(hay.includes(k)) score++; });
    return {r,score};
  }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);
  // de-dupe by id, keep top 4
  const seen=new Set(); const out=[];
  for(const {r} of scored){ if(!seen.has(r.id)){ seen.add(r.id); out.push(r); } if(out.length>=4) break; }
  return out;
}
const ALC_CAT_LABELS = {
  en:{all:"All",poultry:"Poultry",beef:"Beef",veal:"Veal",lamb:"Lamb"},
  fr:{all:"Tout",poultry:"Volaille",beef:"Bœuf",veal:"Veau",lamb:"Agneau"},
  de:{all:"Alle",poultry:"Geflügel",beef:"Rind",veal:"Kalb",lamb:"Lamm"},
  lb:{all:"All",poultry:"Gefligel",beef:"Rëndfleesch",veal:"Kallefleesch",lamb:"Lamm"},
  bs:{all:"Sve",poultry:"Perad",beef:"Govedina",veal:"Teletina",lamb:"Jagnjetina"},
  pt:{all:"Tudo",poultry:"Aves",beef:"Bovino",veal:"Vitela",lamb:"Cordeiro"},
  ar:{all:"الكل",poultry:"دواجن",beef:"بقري",veal:"عجل",lamb:"لحم الخروف"},
};
const AC_UI = {
  en:{individualTab:"Individual Cuts",byobTab:"🧺 Build Your Own Box",namePlaceholder:"Name your box (e.g. \"Ahmed's Weekend Grill\")",selected:"selected",subtotalLbl:"Subtotal",scheduleBtn:"Schedule delivery →",clear:"Clear"},
  fr:{individualTab:"Morceaux Individuels",byobTab:"🧺 Composez Votre Box",namePlaceholder:"Nommez votre box (ex. « Grill du Weekend »)",selected:"sélectionné(s)",subtotalLbl:"Sous-total",scheduleBtn:"Planifier la livraison →",clear:"Effacer"},
  de:{individualTab:"Einzelne Cuts",byobTab:"🧺 Eigene Box Zusammenstellen",namePlaceholder:"Benenne deine Box (z. B. „Wochenend-Grill“)",selected:"ausgewählt",subtotalLbl:"Zwischensumme",scheduleBtn:"Lieferung planen →",clear:"Leeren"},
  lb:{individualTab:"Eenzel Stécker",byobTab:"🧺 Bau Deng Eege Box",namePlaceholder:"Gëff denger Box en Numm (z.B. \"Weekend-Grill\")",selected:"ausgewielt",subtotalLbl:"Zwëschesumm",scheduleBtn:"Liwwerung plangen →",clear:"Läeren"},
  bs:{individualTab:"Pojedinačni Komadi",byobTab:"🧺 Napravi Svoju Kutiju",namePlaceholder:"Nazovi svoju kutiju (npr. \"Vikend Roštilj\")",selected:"odabrano",subtotalLbl:"Međuzbroj",scheduleBtn:"Zakaži dostavu →",clear:"Obriši"},
  pt:{individualTab:"Cortes Individuais",byobTab:"🧺 Monta a Tua Caixa",namePlaceholder:"Dá um nome à tua caixa (ex. \"Grelhados do Fim de Semana\")",selected:"selecionado(s)",subtotalLbl:"Subtotal",scheduleBtn:"Agendar entrega →",clear:"Limpar"},
  ar:{individualTab:"قطع فردية",byobTab:"🧺 كوّن صندوقك الخاص",namePlaceholder:"سمِّ صندوقك (مثال: \"شواء نهاية الأسبوع\")",selected:"محدد",subtotalLbl:"المجموع الفرعي",scheduleBtn:"جدولة التوصيل ←",clear:"مسح"},
};
const AC_UI_FALLBACK = AC_UI.en;

/* ─── BOX TRANSLATIONS ───────────────────────────────────────────────────── */

/* ─── MACROS PER SERVING ─────────────────────────────────────────────────── */
const RECIPE_MACROS = {
  f1:{cal:380,protein:42,carbs:1,fat:22},   f2:{cal:280,protein:38,carbs:1,fat:14},
  f3:{cal:420,protein:48,carbs:3,fat:23},   f4:{cal:330,protein:34,carbs:13,fat:17},
  f5:{cal:410,protein:36,carbs:28,fat:16},  f6:{cal:320,protein:38,carbs:8,fat:14},
  f7:{cal:480,protein:40,carbs:18,fat:26},  f8:{cal:620,protein:38,carbs:72,fat:18},
  f9:{cal:350,protein:36,carbs:22,fat:12},  f10:{cal:380,protein:34,carbs:14,fat:20},
  f11:{cal:290,protein:36,carbs:2,fat:15},  f12:{cal:440,protein:38,carbs:16,fat:22},
  r1:{cal:380,protein:32,carbs:0,fat:28},   r2:{cal:420,protein:36,carbs:8,fat:26},
  r3:{cal:520,protein:48,carbs:2,fat:34},   r4:{cal:580,protein:42,carbs:28,fat:32},
  r5:{cal:680,protein:44,carbs:58,fat:28},  r6:{cal:620,protein:42,carbs:56,fat:24},
  r7:{cal:460,protein:38,carbs:12,fat:28},  r8:{cal:420,protein:36,carbs:14,fat:24},
  r9:{cal:380,protein:38,carbs:18,fat:18},  r10:{cal:360,protein:32,carbs:22,fat:18},
  r11:{cal:520,protein:34,carbs:38,fat:26}, r12:{cal:440,protein:32,carbs:28,fat:22},
  b1:{cal:640,protein:52,carbs:0,fat:46},   b2:{cal:680,protein:44,carbs:32,fat:42},
  b3:{cal:720,protein:56,carbs:0,fat:52},   b4:{cal:580,protein:46,carbs:4,fat:40},
  b5:{cal:480,protein:44,carbs:28,fat:22},  b6:{cal:520,protein:38,carbs:34,fat:28},
  b7:{cal:480,protein:42,carbs:16,fat:28},  b8:{cal:380,protein:38,carbs:6,fat:22},
  b9:{cal:520,protein:36,carbs:58,fat:16},  b10:{cal:380,protein:32,carbs:36,fat:12},
  b11:{cal:680,protein:48,carbs:28,fat:38}, b12:{cal:420,protein:32,carbs:28,fat:22},
  a1:{cal:560,protein:48,carbs:24,fat:30},  a2:{cal:520,protein:48,carbs:2,fat:32},
  a3:{cal:480,protein:44,carbs:14,fat:28},  a4:{cal:580,protein:42,carbs:44,fat:28},
  a5:{cal:680,protein:44,carbs:68,fat:24},  a6:{cal:360,protein:38,carbs:18,fat:16},
  a7:{cal:440,protein:42,carbs:22,fat:22},  a8:{cal:420,protein:44,carbs:8,fat:22},
  a9:{cal:500,protein:46,carbs:12,fat:30},  a10:{cal:460,protein:38,carbs:24,fat:24},
  f13:{cal:420,protein:40,carbs:4,fat:26},  f14:{cal:520,protein:38,carbs:14,fat:34},
  f15:{cal:440,protein:40,carbs:10,fat:26}, f16:{cal:480,protein:32,carbs:52,fat:14},
  r13:{cal:460,protein:34,carbs:20,fat:26}, r14:{cal:420,protein:36,carbs:6,fat:28},
  r15:{cal:520,protein:42,carbs:10,fat:34}, r16:{cal:440,protein:42,carbs:2,fat:28},
  b13:{cal:480,protein:40,carbs:22,fat:24}, b14:{cal:560,protein:44,carbs:16,fat:34},
  b15:{cal:440,protein:34,carbs:12,fat:28}, b16:{cal:520,protein:40,carbs:8,fat:36},
  a11:{cal:460,protein:36,carbs:26,fat:22}, a12:{cal:540,protein:46,carbs:8,fat:34},
  a13:{cal:500,protein:42,carbs:12,fat:30}, a14:{cal:460,protein:40,carbs:10,fat:26},
};

/* ─── RECIPE STEP TRANSLATIONS (FR + DE full · PT/AR titles only) ─────────── */
const RECIPE_STEPS_T = {
fr:{
  f1:{
    ingredients:["1 poulet entier (1,2–1,5 kg)","3 c. à soupe d'huile d'olive","1 citron coupé en deux","4 gousses d'ail écrasées","Thym et romarin frais","Sel et poivre noir"],
    steps:[
      {title:"Préparer",desc:"Préchauffer le four à 200°C. Sécher le poulet avec du papier absorbant — peau sèche = peau croustillante."},
      {title:"Assaisonner",desc:"Frotter partout avec l'huile d'olive, le sel et le poivre. Farcir la cavité avec les moitiés de citron, l'ail et les herbes."},
      {title:"Rôtir",desc:"Placer la poitrine vers le haut dans un plat. Rôtir 1h10 jusqu'à ce que le jus coule clair."},
      {title:"Reposer",desc:"Couvrir légèrement de papier aluminium. Laisser reposer 10 minutes avant de découper pour conserver les jus."},
      {title:"Servir",desc:"Découper et servir avec le jus de cuisson versé dessus. Parfait avec des pommes de terre rôties."}]},
  f2:{
    ingredients:["300g de filets de poulet","2 c. à soupe de beurre","2 gousses d'ail émincées","Brins de thym frais","Sel et poivre","Jus de citron"],
    steps:[
      {title:"Aplatir",desc:"Placer les filets entre deux feuilles de film alimentaire et les aplatir légèrement pour uniformiser l'épaisseur."},
      {title:"Assaisonner",desc:"Saler et poivrer généreusement des deux côtés juste avant la cuisson."},
      {title:"Saisir",desc:"Chauffer la poêle à feu vif. Ajouter l'huile. Saisir 4 min sans bouger les filets."},
      {title:"Beurrer",desc:"Retourner, ajouter le beurre, l'ail et le thym. Incliner la poêle et arroser constamment pendant 3 min."},
      {title:"Reposer",desc:"Laisser reposer 3 min hors du feu. Terminer avec un filet de citron."}]},
  f3:{
    ingredients:["1 poulet entier","3 c. à soupe de paprika fumé","2 c. à soupe d'huile d'olive","1 c. à soupe d'ail en poudre","1 c. à soupe d'oignon en poudre","1 c. à café de cayenne","Sel et poivre"],
    steps:[
      {title:"Papillonner",desc:"Utiliser des ciseaux pour couper de chaque côté de la colonne vertébrale et la retirer. Aplatir le poulet."},
      {title:"Mariner",desc:"Mélanger le paprika, la poudre d'ail, d'oignon, le cayenne, l'huile et le sel. Frotter partout. Mariner 30 min."},
      {title:"Préparer le grill",desc:"Configurer le grill avec une zone chaude directe et une zone indirecte."},
      {title:"Griller",desc:"Commencer côté peau sur la zone chaude 5 min pour marquer. Déplacer en zone indirecte 30–35 min."},
      {title:"Finir",desc:"Revenir sur la zone directe 2 min pour un dernier marquage. Laisser reposer 10 min."}]},
  f4:{
    ingredients:["8 cuisses de poulet","4 c. à soupe de miel","3 c. à soupe de sauce soja","2 c. à soupe de vinaigre de cidre","2 c. à soupe de ketchup","1 c. à soupe de paprika fumé","Poudre d'ail, sel"],
    steps:[
      {title:"Entailler",desc:"Entailler chaque cuisse 2–3 fois avec un couteau pour que la marinade pénètre en profondeur."},
      {title:"Mariner",desc:"Mélanger le miel, la sauce soja, le vinaigre, le ketchup, le paprika et l'ail. Enrober les cuisses. Mariner 2 heures."},
      {title:"Griller doucement",desc:"Cuire à feu moyen-doux 30 min en tournant toutes les 10 minutes."},
      {title:"Glacer",desc:"Badigeonner de marinade supplémentaire les 10 dernières minutes. Augmenter la chaleur pour caraméliser."},
      {title:"Servir",desc:"Laisser reposer 5 min. Servir avec de la coleslaw et du pain grillé."}]},
  f5:{
    ingredients:["500g de filets de poulet","1 c. à café de cumin","1 c. à café de coriandre","1 c. à café de curcuma","1 c. à café de cannelle","½ c. à café de cardamome","3 c. à soupe d'huile d'olive","3 gousses d'ail hachées","Jus d'1 citron","Yaourt, pain pita, tomate, oignon pour servir"],
    steps:[
      {title:"Mélange d'épices",desc:"Combiner toutes les épices avec l'huile d'olive, l'ail et le jus de citron pour former une pâte."},
      {title:"Mariner",desc:"Enrober les filets de poulet dans la pâte. Laisser au moins 30 min — toute une nuit c'est encore mieux."},
      {title:"Cuire",desc:"Griller ou poêler à feu moyen-élevé 5–6 min de chaque côté jusqu'à légère carbonisation."},
      {title:"Trancher",desc:"Laisser reposer 3 min puis trancher en fines lamelles — plus de surface = plus de saveur."},
      {title:"Assembler",desc:"Chauffer le pain pita, tartiner de yaourt à l'ail, garnir de poulet, tomate tranchée et oignon."}]},
  f6:{
    ingredients:["500g de filets de poulet en cubes","4 c. à soupe de yaourt nature","3 c. à soupe de concentré de tomate","3 gousses d'ail","Jus d'1 citron","1 c. à café de paprika","1 c. à café de quatre-épices","½ c. à café de poivre blanc","Huile d'olive"],
    steps:[
      {title:"Marinade",desc:"Mixer le yaourt, le concentré de tomate, l'ail, le citron, les épices et l'huile d'olive en une marinade lisse."},
      {title:"Mariner",desc:"Ajouter les cubes de poulet, bien mélanger, couvrir et réfrigérer au moins 2 heures."},
      {title:"Embrocher",desc:"Enfiler sur des brochettes en métal en laissant de petits espaces pour que la chaleur circule."},
      {title:"Griller",desc:"Griller à feu moyen-vif, en tournant toutes les 3 min. Cuisson totale 12–15 min."},
      {title:"Servir",desc:"Servir immédiatement avec du toum, des légumes marinés et du pain pita."}]},
  f7:{
    ingredients:["500g de filets de poulet en cubes","200ml de coulis de tomate","150ml de crème entière","1 oignon émincé","3 gousses d'ail","2 cm de gingembre râpé","2 c. à café de garam masala","1 c. à café de cumin","1 c. à café de curcuma","1 c. à café de paprika","Yaourt pour la marinade","Coriandre fraîche"],
    steps:[
      {title:"Mariner",desc:"Mélanger le poulet avec le yaourt, 1 c. à café de garam masala, le paprika et le sel. Mariner 30 min."},
      {title:"Charbon",desc:"Griller ou poêler le poulet à feu vif jusqu'à légère carbonisation. Réserver."},
      {title:"Sauce",desc:"Faire revenir l'oignon 8 min jusqu'à dorure. Ajouter l'ail et le gingembre 2 min. Ajouter les épices sèches, cuire 1 min."},
      {title:"Mijoter",desc:"Ajouter le coulis de tomate, cuire 10 min à feu doux. Ajouter la crème et le poulet. Mijoter 5 min."},
      {title:"Finir",desc:"Goûter, rectifier le sel. Finir avec du beurre. Garnir de coriandre. Servir avec du riz basmati et du naan."}]},
  f8:{
    ingredients:["800g de morceaux de poulet","400g de riz basmati","2 gros oignons émincés","4 c. à soupe de ghee","1 c. à café de graines de cumin","3 cardamomes","2 feuilles de laurier","1 c. à café de curcuma","2 c. à café de masala biryani","Safran dans du lait chaud","Menthe et coriandre fraîches"],
    steps:[
      {title:"Oignons frits",desc:"Faire frire les oignons émincés dans le ghee à feu moyen-doux 25 min jusqu'à dorure intense et croustillant. Retirer la moitié."},
      {title:"Poulet",desc:"Dans le ghee restant, ajouter les épices entières puis le poulet. Cuire 10 min. Ajouter le masala biryani, le yaourt, le curcuma. Cuire 15 min."},
      {title:"Riz mi-cuit",desc:"Faire bouillir l'eau salée avec du laurier. Ajouter le riz lavé, cuire exactement 6 min. Égoutter."},
      {title:"Superposer",desc:"Dans une grande casserole: couche de poulet, puis riz, puis oignons croustillants, menthe, coriandre. Arroser de lait safrané."},
      {title:"Cuire à l'étouffée",desc:"Sceller la casserole avec du papier aluminium puis le couvercle. Cuire à feu très doux 25 min."}]},
  f9:{
    ingredients:["300g de filets de poulet","4 c. à soupe de sauce soja","3 c. à soupe de mirin","2 c. à soupe de saké","1 c. à soupe de sucre","1 c. à café d'huile de sésame","Graines de sésame","Oignons verts pour garnir"],
    steps:[
      {title:"Sauce",desc:"Combiner la sauce soja, le mirin, le saké et le sucre. Remuer jusqu'à dissolution du sucre."},
      {title:"Saisir",desc:"Entailler la peau du poulet. Saisir dans une poêle légèrement huilée, côté peau vers le bas, 5 min jusqu'à dorure."},
      {title:"Glacer",desc:"Retourner, ajouter la sauce dans la poêle. Cuire 4–5 min en arrosant répétitivement pendant que la sauce réduit."},
      {title:"Réduire",desc:"Laisser la sauce épaissir en glaçage brillant. Retirer le poulet lorsqu'il est bien enrobé."},
      {title:"Servir",desc:"Trancher et servir sur du riz vapeur. Finir avec des graines de sésame et de l'oignon vert émincé."}]},
  f10:{
    ingredients:["300g de filets de poulet finement hachés","3 gousses d'ail","3 piments oiseaux","2 c. à soupe de sauce aux huîtres","1 c. à soupe de nuoc-mâm","1 c. à café de sauce soja","1 c. à café de sucre","Grosse poignée de basilic thaï","Oeufs frits pour servir"],
    steps:[
      {title:"Préparer",desc:"Piler l'ail et les piments au mortier — la texture grossière est meilleure que lisse."},
      {title:"Aromatiques",desc:"Faire revenir la pâte ail-piment dans l'huile très chaude 30 sec jusqu'à ce qu'elle soit parfumée."},
      {title:"Cuire le poulet",desc:"Ajouter le poulet haché. Faire sauter à feu vif 4–5 min en brisant les morceaux."},
      {title:"Sauce",desc:"Ajouter la sauce aux huîtres, le nuoc-mâm, la sauce soja et le sucre. Mélanger 1 min."},
      {title:"Basilic",desc:"Retirer du feu. Ajouter les feuilles de basilic et mélanger — la chaleur résiduelle les flétrit parfaitement. Servir sur du riz avec un oeuf frit."}]},
  f11:{
    ingredients:["4 filets de poulet","Jus de 2 citrons","3 c. à soupe d'huile d'olive","1 c. à soupe d'origan frais","1 c. à soupe de thym frais","3 gousses d'ail hachées","Sel et poivre"],
    steps:[
      {title:"Marinade",desc:"Mélanger le jus de citron, l'huile d'olive, l'ail et les herbes. Assaisonner de sel et poivre."},
      {title:"Mariner",desc:"Enrober le poulet et mariner au moins 30 min, jusqu'à 4 heures."},
      {title:"Griller",desc:"Griller à feu moyen-vif 6–7 min de chaque côté."},
      {title:"Reposer",desc:"Laisser reposer 5 min hors du grill."},
      {title:"Servir",desc:"Servir avec des moitiés de citron grillées et une salade verte."}]},
  f12:{
    ingredients:["1 poulet entier découpé","1 citron confit coupé en quartiers","100g d'olives vertes","1 oignon émincé","3 gousses d'ail","1 c. à café de gingembre","1 c. à café de cumin","1 c. à café de coriandre","½ c. à café de cannelle","Safran dans eau chaude","Coriandre fraîche"],
    steps:[
      {title:"Mariner",desc:"Mélanger les épices avec l'ail et l'huile. Enrober le poulet et mariner 2 heures."},
      {title:"Saisir",desc:"Faire dorer les morceaux de poulet dans une poêle ou un tajine. Réserver."},
      {title:"Base oignon",desc:"Faire revenir l'oignon 8 min dans la même poêle. Ajouter le gingembre et l'ail 2 min."},
      {title:"Braiser",desc:"Remettre le poulet. Ajouter l'eau safranée, le citron confit et les olives. Couvrir et cuire à feu doux 40 min."},
      {title:"Servir",desc:"Garnir de coriandre fraîche. Servir avec du couscous ou du pain pita."}]},
  r1:{
    ingredients:["4 côtelettes d'agneau","3 c. à soupe d'huile d'olive","3 gousses d'ail hachées","Romarin frais","Thym frais","Sel et poivre noir","Citron pour servir"],
    steps:[
      {title:"Tempérer",desc:"Sortir les côtelettes du réfrigérateur 30 min avant la cuisson. La viande froide cuit de façon inégale."},
      {title:"Mariner",desc:"Enrober les côtelettes d'huile d'olive, d'ail, de romarin, de thym, de sel et de poivre."},
      {title:"Chauffer",desc:"Chauffer le grill ou la poêle en fonte à feu très vif."},
      {title:"Griller",desc:"Griller 3 min de chaque côté pour une cuisson rosée. Appuyer l'os 1 min pour faire fondre la graisse."},
      {title:"Reposer",desc:"Reposer 5 min sur une assiette chaude. Presser du jus de citron frais dessus."}]},
  r2:{
    ingredients:["300g de boeuf haché","200g d'agneau haché","1 oignon râpé","3 gousses d'ail hachées","2 c. à café de cumin","1 c. à café de coriandre","½ c. à café de cannelle","½ c. à café de quatre-épices","Persil et menthe frais","Sel et poivre"],
    steps:[
      {title:"Mélanger",desc:"Combiner tous les ingrédients. Pétrir comme une pâte pendant 2 min."},
      {title:"Reposer",desc:"Réfrigérer le mélange 30 min. La graisse froide aide les koftas à garder leur forme."},
      {title:"Façonner",desc:"Les mains mouillées. Former autour des brochettes en cylindres de 12 cm, en pressant bien."},
      {title:"Griller",desc:"Griller à feu vif, en tournant toutes les 2–3 min. Cuisson totale 10–12 min."},
      {title:"Servir",desc:"Servir avec du pain pita, des tomates grillées et une sauce au yaourt."}]},
  r3:{
    ingredients:["400g de faux-filet","Gros sel de mer et poivre noir","Gros bouquet de persil plat","4 gousses d'ail","1 échalote","3 c. à soupe de vinaigre de vin rouge","6 c. à soupe d'huile d'olive","1 c. à café de flocons de piment"],
    steps:[
      {title:"Chimichurri",desc:"Hacher finement le persil, l'ail et l'échalote. Mélanger avec le vinaigre, l'huile, le piment et le sel. Préparer en premier."},
      {title:"Assaisonner",desc:"Assaisonner généreusement le faux-filet de gros sel et de poivre."},
      {title:"Griller",desc:"Griller à feu très vif 3–4 min de chaque côté pour une cuisson rosée."},
      {title:"Reposer",desc:"Laisser reposer sur une planche 5 min."},
      {title:"Servir",desc:"Trancher contre le grain. Napper généreusement de chimichurri."}]},
  r4:{
    ingredients:["600g d'épaule d'agneau","2 c. à soupe de paprika fumé","1 c. à soupe de cumin","1 c. à soupe de cassonade","1 c. à café d'ail en poudre","Sel et poivre","Petits pains brioches, coleslaw, cornichons"],
    steps:[
      {title:"Dry rub",desc:"Mélanger toutes les épices et la cassonade. Frotter partout sur l'agneau. Idéalement réfrigérer toute la nuit."},
      {title:"Cuisson lente",desc:"Rôtir à 150°C recouvert de papier aluminium pendant 3 heures. Température cible: 85–90°C à cœur."},
      {title:"Croûte",desc:"Retirer le papier aluminium, augmenter à 220°C pendant 15 min pour former une belle croûte."},
      {title:"Effilocher",desc:"Laisser reposer 15 min puis effilocher avec deux fourchettes. Mélanger avec le jus de cuisson."},
      {title:"Assembler",desc:"Toaster les petits pains brioches. Garnir d'agneau effiloché, de coleslaw croustillant et de cornichons."}]},
  r5:{
    ingredients:["600g d'épaule d'agneau en gros morceaux","500ml de yaourt nature","1 c. à café de curcuma","1 c. à café de quatre-épices","2 feuilles de laurier","Amandes et pignons grillés","Riz à grains longs","Pain pita ou markook"],
    steps:[
      {title:"Dorer l'agneau",desc:"Faire dorer l'agneau dans le ghee avec l'oignon. Assaisonner. Couvrir d'eau. Mijoter 1 heure."},
      {title:"Sauce au yaourt",desc:"Fouetter le yaourt avec ½ tasse d'eau. Chauffer doucement en remuant constamment — ne jamais laisser bouillir."},
      {title:"Combiner",desc:"Ajouter l'agneau cuit à la sauce au yaourt. Mijoter doucement 20 min en remuant régulièrement."},
      {title:"Riz",desc:"Cuire le riz dans le bouillon d'agneau pour une saveur maximale."},
      {title:"Dresser",desc:"Disposer le pain sur un grand plat, puis le riz, l'agneau, verser la sauce, garnir de noix grillées."}]},
  r6:{
    ingredients:["500g de faux-filet de boeuf","400g de riz basmati","1 oignon","½ tasse de raisins secs","½ tasse de noix de pin et amandes grillées","2 c. à café de baharat","1 c. à café de curcuma","Ghee","Bouillon de boeuf"],
    steps:[
      {title:"Assaisonner le boeuf",desc:"Frotter le boeuf avec le baharat, sel et poivre. Faire dorer dans le ghee de tous côtés."},
      {title:"Rôtir lentement",desc:"Ajouter le bouillon, couvrir et rôtir à 170°C pendant 1h30 à 2 heures jusqu'à très tendre."},
      {title:"Riz épicé",desc:"Faire revenir l'oignon dans le ghee. Ajouter le riz, le curcuma, les raisins. Faire revenir 2 min. Ajouter le bouillon."},
      {title:"Trancher",desc:"Laisser reposer le boeuf 15 min. Couper en tranches épaisses."},
      {title:"Dresser",desc:"Dresser le riz sur un grand plat. Poser les tranches de boeuf. Parsemer de noix. Verser le jus de cuisson."}]},
  r7:{
    ingredients:["500g d'agneau","1 gros oignon","4 gousses d'ail","2 cm de gingembre","4 c. à soupe de piment du Cachemire","2 c. à café de coriandre","1 c. à café de cumin","½ c. à café de fenouil","2 cardamomes","1 tasse de yaourt nature","Ghee"],
    steps:[
      {title:"Épices entières",desc:"Chauffer le ghee. Faire frire les cardamomes et le fenouil 30 sec jusqu'à ce qu'ils soient parfumés."},
      {title:"Base oignon",desc:"Ajouter l'oignon finement émincé. Cuire 20 min à feu doux jusqu'à dorure profonde. La patience est essentielle."},
      {title:"Aromatiques",desc:"Ajouter la pâte gingembre-ail. Cuire 3 min. Ajouter toutes les épices sèches. Cuire 2 min."},
      {title:"Agneau",desc:"Ajouter les morceaux d'agneau. Faire revenir à feu moyen-vif 8–10 min jusqu'à bien dorés."},
      {title:"Mijoter",desc:"Incorporer progressivement le yaourt. Ajouter ½ tasse d'eau. Couvrir et mijoter 45 min jusqu'à l'agneau très tendre."}]},
  r8:{
    ingredients:["400g de boeuf haché","200g de petits pois surgelés","2 oignons émincés","3 gousses d'ail","2 cm de gingembre","2 tomates hachées","1 c. à café de graines de cumin","2 c. à café de garam masala","1 c. à café de curcuma","1 c. à café de piment","Coriandre fraîche"],
    steps:[
      {title:"Cumin",desc:"Chauffer l'huile. Ajouter les graines de cumin et laisser grésiller 30 sec."},
      {title:"Oignons",desc:"Ajouter les oignons. Cuire 10 min jusqu'à dorure. Ajouter l'ail et le gingembre, cuire 2 min."},
      {title:"Tomates",desc:"Ajouter les tomates hachées et toutes les épices sèches. Cuire 5 min jusqu'à décomposition."},
      {title:"Viande",desc:"Ajouter le boeuf haché. Émietter et faire revenir à feu vif 8 min jusqu'à bien doré et sec."},
      {title:"Petits pois",desc:"Ajouter les petits pois surgelés et 100ml d'eau. Mijoter 5 min. Garnir de coriandre fraîche."}]},
  r9:{
    ingredients:["400g de faux-filet tranché très fin","5 c. à soupe de sauce soja","3 c. à soupe de cassonade","2 c. à soupe d'huile de sésame","4 gousses d'ail râpées","2 cm de gingembre râpé","1 poire asiatique râpée","Graines de sésame, oignons verts"],
    steps:[
      {title:"Trancher finement",desc:"Trancher le boeuf très fin — congeler 30 min avant pour faciliter la découpe."},
      {title:"Marinade",desc:"Mélanger la sauce soja, le sucre, l'huile de sésame, l'ail, le gingembre et la poire râpée."},
      {title:"Mariner",desc:"Enrober le boeuf. Mariner au minimum 30 min, jusqu'à 24 heures au réfrigérateur."},
      {title:"Cuisson vive",desc:"Cuire par petites quantités dans une poêle très chaude. Ne pas surcharger — on veut du grillé, pas du vapeur."},
      {title:"Servir",desc:"Servir sur du riz vapeur avec du kimchi, de l'oignon vert et des graines de sésame."}]},
  r10:{
    ingredients:["300g d'agneau tranché finement","3 c. à soupe de sauce hoisin","2 c. à soupe de sauce soja","1 c. à soupe de sauce aux huîtres","1 c. à café de fécule de maïs","3 gousses d'ail","2 cm de gingembre","4 oignons verts","1 c. à café d'huile de sésame"],
    steps:[
      {title:"Enrober",desc:"Enrober l'agneau tranché de fécule de maïs et d'une pincée de sel."},
      {title:"Sauce",desc:"Mélanger la sauce hoisin, soja, huîtres et sésame dans un bol."},
      {title:"Saisir",desc:"Cuire l'agneau dans un wok très chaud en couche unique, 2 min. Réserver."},
      {title:"Aromatiques",desc:"Ajouter l'ail, le gingembre et le blanc des oignons verts. Faire revenir 1 min."},
      {title:"Finir",desc:"Remettre l'agneau. Ajouter la sauce. Mélanger 1 min jusqu'à enrobage brillant. Garnir du vert des oignons."}]},
  r11:{
    ingredients:["600g d'agneau haché ou épaule","2 carottes en dés","1 oignon émincé","2 c. à soupe de concentré de tomate","200ml de bouillon d'agneau","1 c. à soupe de sauce Worcestershire","1 kg de pommes de terre pour purée","50g de beurre","Romarin et thym"],
    steps:[
      {title:"Dorer l'agneau",desc:"Faire dorer le boeuf haché à l'huile à feu vif. Assaisonner généreusement."},
      {title:"Légumes",desc:"Ajouter l'oignon et la carotte. Cuire 8 min. Ajouter le concentré de tomate et les herbes."},
      {title:"Mijoter",desc:"Ajouter le bouillon et la sauce Worcestershire. Couvrir et mijoter 25 min jusqu'à épaississement."},
      {title:"Purée",desc:"Faire bouillir et écraser les pommes de terre avec beurre et crème. Bien assaisonner."},
      {title:"Cuire au four",desc:"Verser la garniture dans un plat. Recouvrir de purée. Cuire à 200°C pendant 25 min jusqu'à dorure."}]},
  r12:{
    ingredients:["300g d'agneau tranché très fin","300ml de bouillon dashi ou de volaille","4 c. à soupe de sauce soja","3 c. à soupe de mirin","2 c. à soupe de saké","1 c. à soupe de sucre","Tofu, champignons, nouilles, oignons verts","Oeufs mollets pour servir"],
    steps:[
      {title:"Bouillon",desc:"Mijoter l'oignon émincé dans le dashi, la sauce soja, le mirin, le saké et le sucre 10 min."},
      {title:"Agneau",desc:"Ajouter les tranches d'agneau. Cuire seulement 2–3 min."},
      {title:"Goûter",desc:"Goûter le bouillon — il doit être sucré-salé. Ajuster la sauce soja ou le sucre."},
      {title:"Assembler",desc:"Verser le riz dans les bols. Déposer l'agneau et l'oignon avec le bouillon."},
      {title:"Garnir",desc:"Ajouter un oeuf mollet (6,5 min), du gingembre mariné et de l'oignon vert."}]},
  b1:{
    ingredients:["400g de côte de boeuf (au moins 3 cm d'épaisseur)","Gros sel de mer","Poivre noir concassé","3 c. à soupe de beurre","4 gousses d'ail écrasées","Brins de thym frais","Graisse de boeuf ou huile à haute fumée"],
    steps:[
      {title:"Sécher et assaisonner",desc:"Sécher complètement le steak. Saler UNIQUEMENT 45 min avant la cuisson. Poivrer juste avant la poêle."},
      {title:"Poêle ardente",desc:"Chauffer la poêle en fonte à feu très vif pendant 3 min — jusqu'à ce qu'elle fume."},
      {title:"Première saisie",desc:"Ajouter une goutte de graisse de boeuf. Déposer le steak. Ne pas bouger pendant 2,5 min pour former une croûte."},
      {title:"Arrosage au beurre",desc:"Retourner. Ajouter beurre, ail et thym. Incliner la poêle et arroser continuellement pendant 2 min."},
      {title:"Reposer",desc:"Laisser reposer sur une grille 8 min. Trancher contre le grain, arroser du beurre de cuisson."}]},
  b2:{
    ingredients:["600g de boeuf haché (20% de gras)","8 tranches de fromage américain","4 petits pains brioches","Laitue émincée","Cornichons tranchés","Sauce burger: mayo, ketchup, moutarde, vinaigre de cornichon, paprika"],
    steps:[
      {title:"Boules, pas galettes",desc:"Diviser la viande en boules de 150g lâches. Ne PAS comprimer ni assaisonner encore."},
      {title:"Plaque très chaude",desc:"Chauffer une plaque lourde ou une poêle en fonte au maximum. Huiler légèrement."},
      {title:"ÉCRASER",desc:"Poser la boule sur la plaque. Écraser immédiatement avec une spatule. Saler. Cuire 90 sec jusqu'aux bords croustillants."},
      {title:"Retourner et fromager",desc:"Retourner une fois, poser le fromage immédiatement. Cuire 45 sec. Retirer."},
      {title:"Assembler et servir",desc:"Toaster les pains. Tartiner de sauce. Empiler deux galettes par burger. Servir immédiatement."}]},
  b3:{
    ingredients:["400g de côte de boeuf à l'os épaisse","Gros sel","Poivre noir","Ail en poudre","Romarin frais pour arroser","Beurre"],
    steps:[
      {title:"Assaisonner",desc:"Assaisonner la côte de tous côtés avec sel, poivre et ail en poudre. Idéalement réfrigérer découvert toute la nuit."},
      {title:"Cuisson inversée",desc:"Pour les steaks épais: rôtir à 110°C pendant 25 min jusqu'à 45°C à coeur."},
      {title:"Grill vif",desc:"Chauffer le grill au maximum pendant que le steak repose."},
      {title:"Saisie forte",desc:"Saisir sur grill brûlant 2 min de chaque côté. Saisir aussi la bande de gras."},
      {title:"Reposer et servir",desc:"Reposer 10 min. Finir avec une noisette de beurre."}]},
  b4:{
    ingredients:["800g de brisket de boeuf","2 c. à soupe de café moulu","2 c. à soupe de paprika fumé","1 c. à soupe de cassonade","1 c. à soupe de poivre noir","1 c. à soupe de sel","1 c. à café d'ail en poudre","1 c. à café d'oignon en poudre"],
    steps:[
      {title:"Rub sec",desc:"Mélanger tous les ingrédients secs. Frotter généreusement partout sur le brisket. Réfrigérer découvert toute une nuit."},
      {title:"Cuisson lente",desc:"Cuire à 120°C (chaleur indirecte BBQ ou four bas) 3–3,5 heures jusqu'à 75°C à coeur."},
      {title:"Emballer",desc:"Envelopper dans du papier boucher. Cuire encore 1 heure jusqu'à 92°C à coeur."},
      {title:"Reposer",desc:"Laisser reposer emballé au moins 1 heure — absolument indispensable."},
      {title:"Trancher",desc:"Trancher perpendiculairement aux fibres en tranches épaisses comme un crayon. Servir avec cornichons et pain."}]},
  b5:{
    ingredients:["400g de faux-filet tranché finement","1 c. à café de cumin","1 c. à café de coriandre","1 c. à café de cannelle","½ c. à café de cardamome","½ c. à café de curcuma","3 c. à soupe de vinaigre","3 c. à soupe d'huile d'olive","Ail, pain pita, tomate, navet mariné, tahini"],
    steps:[
      {title:"Marinade",desc:"Mélanger les épices, le vinaigre, l'huile et l'ail. Enrober les tranches de boeuf. Mariner 2 heures."},
      {title:"Empilement et rôtissage",desc:"Empiler les tranches serrées sur un pique ou dans un moule à cake. Rôtir à 220°C pendant 25 min."},
      {title:"Trancher",desc:"Tailler de fines tranches sur l'extérieur du bloc de viande cuit."},
      {title:"Carboniser",desc:"Faire saisir rapidement les tranches dans une poêle très chaude 1 min."},
      {title:"Assembler",desc:"Chauffer le pain pita. Tartiner de tahini. Garnir de boeuf, tomate et navet mariné."}]},
  b6:{
    ingredients:["400g de boeuf haché","1 oignon finement émincé","2 tomates en dés","2 piments verts","1 c. à café de cumin","1 c. à café de coriandre","½ c. à café de cannelle","Persil frais","4 pains pita ou galettes"],
    steps:[
      {title:"Préparer la farce",desc:"Combiner le boeuf haché cru avec tous les ingrédients — ne pas cuire la viande d'abord."},
      {title:"Farcir",desc:"Ouvrir le pain pita. Farcir une moitié avec le mélange de boeuf cru. Appuyer fermement l'autre moitié."},
      {title:"Poêler",desc:"Dans une poêle sèche à feu moyen, cuire le pain farci 6–7 min de chaque côté en pressant avec une spatule."},
      {title:"Vérifier",desc:"Le pain doit être croustillant et grillé par endroits. Le boeuf à l'intérieur doit être bien cuit."},
      {title:"Servir",desc:"Couper en quartiers. Servir avec une salade de tomates fraîches et du tahini."}]},
  b7:{
    ingredients:["500g de boeuf en cubes","2 oignons","4 gousses d'ail","2 cm de gingembre","3 c. à café de curry Madras","1 c. à café de curcuma","1 boîte de tomates concassées","1 c. à soupe de pâte de tamarin","Feuilles de curry","Huile de coco"],
    steps:[
      {title:"Base curry",desc:"Faire revenir l'oignon émincé dans l'huile de coco 15 min jusqu'à dorure intense. Ajouter les feuilles de curry."},
      {title:"Pâte épicée",desc:"Ajouter la pâte gingembre-ail et toutes les épices. Faire revenir 3 min jusqu'à ce que l'huile se sépare."},
      {title:"Boeuf",desc:"Ajouter les cubes de boeuf. Faire dorer de tous côtés 8 min à feu vif."},
      {title:"Mijoter",desc:"Ajouter les tomates et le tamarin. Couvrir et mijoter à feu doux 30–35 min jusqu'à très tendre."},
      {title:"Finir",desc:"Découvrir et cuire 5 min pour réduire et intensifier. Servir avec du riz ou du paratha."}]},
  b8:{
    ingredients:["500g de boeuf haché","1 oignon râpé","3 gousses d'ail","2 cm de gingembre râpé","1 c. à café de garam masala","1 c. à café de cumin","½ c. à café de piment","Coriandre et menthe fraîches","1 c. à soupe de farine de pois chiches","Sel"],
    steps:[
      {title:"Mélanger",desc:"Combiner tous les ingrédients. Pétrir 2 minutes. Réfrigérer 30 min."},
      {title:"Embrocher",desc:"Les mains mouillées. Diviser en 8. Former autour de brochettes plates en cylindres de 15 cm."},
      {title:"Griller",desc:"Griller à feu vif, en tournant toutes les 2 min. Cuisson totale 10–12 min."},
      {title:"Carboniser",desc:"Augmenter au maximum les 2 dernières minutes pour obtenir des traces de carbonisation."},
      {title:"Servir",desc:"Servir avec une chutney à la menthe, de l'oignon tranché au jus de citron et du naan chaud."}]},
  b9:{
    ingredients:["300g de faux-filet tranché très fin","1 gros oignon émincé","300ml de bouillon dashi ou volaille","4 c. à soupe de sauce soja","3 c. à soupe de mirin","2 c. à soupe de saké","1 c. à soupe de sucre","Riz japonais cuit à la vapeur","Gingembre mariné, oeuf mollet"],
    steps:[
      {title:"Mijoter les oignons",desc:"Mijoter l'oignon émincé dans le dashi, la sauce soja, le mirin, le saké et le sucre 10 min jusqu'à translucide."},
      {title:"Ajouter le boeuf",desc:"Ajouter les tranches très fines. Cuire seulement 2–3 min."},
      {title:"Goûter",desc:"Goûter le bouillon — il doit être sucré-salé. Ajuster à votre goût."},
      {title:"Assembler",desc:"Verser le riz dans les bols. Déposer le boeuf et l'oignon avec généreux bouillon."},
      {title:"Garnir",desc:"Ajouter un oeuf mollet (6,5 min), du gingembre mariné et de l'oignon vert."}]},
  b10:{
    ingredients:["500g d'os de boeuf ou viande à braiser","200g de nouilles de riz","1 oignon brûlé","5 cm de gingembre brûlé","3 étoiles de badiane","3 clous de girofle","1 bâton de cannelle","Nuoc-mâm","Germes de soja, basilic, citron vert, piment"],
    steps:[
      {title:"Brûler les aromatiques",desc:"Brûler directement l'oignon et le gingembre à la flamme ou sous le grill jusqu'à noircissement. Cela donne la profondeur fumée du pho."},
      {title:"Torréfier les épices",desc:"Torréfier les épices dans une poêle sèche 1 min jusqu'à parfumées."},
      {title:"Bouillon",desc:"Mijoter les os avec les légumes brûlés, les épices et le nuoc-mâm pendant 1 heure. Écumer constamment."},
      {title:"Filtrer",desc:"Filtrer le bouillon — il doit être cristallin. Assaisonner avec le nuoc-mâm et un peu de sucre."},
      {title:"Servir",desc:"Tremper les nouilles. Les mettre dans les bols. Verser le bouillon chaud. Ajouter le boeuf cru tranché — il cuit dans le bouillon."}]},
  b11:{
    ingredients:["400g de filet de boeuf","200g de champignons mixtes finement hachés","4 tranches de bresaola ou jambon","1 rouleau de pâte feuilletée","1 c. à soupe de moutarde de Dijon","1 jaune d'oeuf","Sel et poivre","Thym"],
    steps:[
      {title:"Saisir",desc:"Saisir le filet dans une poêle très chaude de tous côtés — 1 min par côté. Reposer et badigeonner de Dijon."},
      {title:"Duxelles",desc:"Cuire les champignons au thym à feu vif jusqu'à complète évaporation — environ 15 min."},
      {title:"Enrouler",desc:"Disposer la bresaola sur film alimentaire. Étaler les champignons. Rouler le boeuf à l'intérieur. Réfrigérer 20 min."},
      {title:"Pâte feuilletée",desc:"Dérouler la pâte. Placer le rouleau de boeuf au bord. Rouler serré. Sceller les extrémités. Dorer au jaune d'oeuf."},
      {title:"Cuire",desc:"Cuire à 220°C pendant 25–28 min pour une cuisson rosée. Laisser reposer 10 min avant de trancher."}]},
  b12:{
    ingredients:["500g de boeuf haché très fin","200g de boulgour trempé","1 oignon","1 c. à café de quatre-épices","½ c. à café de cannelle","½ c. à café de cumin","Sel","Pignons et raisins secs pour la farce"],
    steps:[
      {title:"Mélange extérieur",desc:"Mixer le boeuf, le boulgour trempé, l'oignon et les épices au robot jusqu'à lisse."},
      {title:"Farce",desc:"Faire revenir le boeuf haché restant avec les pignons, les raisins et les épices."},
      {title:"Façonner",desc:"Les mains mouillées. Prendre du mélange extérieur, creuser, farcir, fermer en forme de torpille."},
      {title:"Frire",desc:"Frire dans l'huile chaude 3–4 min de chaque côté jusqu'à dorure profonde."},
      {title:"Servir",desc:"Servir avec du yaourt nature et de la menthe fraîche."}]},
  a1:{
    ingredients:["1 poulet entier","400g de faux-filet","Légumes à rôtir: carottes, panais, oignons","Pommes de terre à rôtir","Thym et romarin frais","Beurre","Bouillon de boeuf pour la sauce"],
    steps:[
      {title:"Planifier",desc:"Commencer le boeuf en premier — il nécessite plus de temps. Assaisonner les deux viandes de sel 1 heure avant."},
      {title:"Rôtir le poulet",desc:"Farcir avec des herbes et du citron. Frotter de beurre. Rôtir à 200°C pendant 1h15."},
      {title:"Rôtir le boeuf",desc:"Saisir le faux-filet à la poêle. Rôtir à 200°C, 20 min par 500g pour une cuisson rosée. Reposer 15 min."},
      {title:"Pommes de terre",desc:"Faire précuire 7 min. Rôtir dans la graisse de boeuf à 220°C pendant 40 min jusqu'à dorure croustillante."},
      {title:"Sauce",desc:"Déglacer les plats avec du vin rouge et du bouillon de boeuf. Réduire et filtrer. Assaisonner."}]},
  a2:{
    ingredients:["Cuisses et filets de poulet","Faux-filet de boeuf","Côtelettes d'agneau","Huile d'olive, sel, poivre","Citron","Herbes fraîches","Pain grillé et salade"],
    steps:[
      {title:"Séquencer",desc:"Commencer les côtelettes d'agneau (15 min), puis le boeuf (10 min), puis le poulet (20 min). Décaler les départs."},
      {title:"Assaisonner",desc:"Assaisonner simplement — huile d'olive, sel, poivre. Laisser la qualité de la viande s'exprimer."},
      {title:"Griller le poulet",desc:"Cuire les cuisses en chaleur indirecte 20 min, terminer 5 min en direct."},
      {title:"Boeuf et agneau",desc:"Griller le faux-filet 3 min de chaque côté. Griller les côtelettes 3 min de chaque côté. Laisser reposer."},
      {title:"Plateau",desc:"Disposer sur une grande planche avec des citrons grillés, des herbes fraîches et une grande salade."}]},
  a3:{
    ingredients:["Cuisses de poulet entières","Faux-filet de boeuf","Côtelettes d'agneau","Boeuf haché pour burgers","Mélange d'épices BBQ","Glaçage miel","Petits pains et accompagnements"],
    steps:[
      {title:"Préparer la veille",desc:"Mariner les cuisses toute la nuit. Former les galettes de burgers, réfrigérer."},
      {title:"Plan de cuisson",desc:"Poulet 40 min, côtelettes 12 min, boeuf 8 min, burgers 10 min. Calculer à rebours."},
      {title:"Grill à deux zones",desc:"Configurer zones directe et indirecte. Zone lente pour le poulet, zone vive pour le boeuf."},
      {title:"Cuire par vagues",desc:"Commencer par le poulet. Ajouter l'agneau et le boeuf les 15 dernières minutes."},
      {title:"Servir",desc:"Disposer sauces, salades et accompagnements. Laisser les invités composer leurs assiettes."}]},
  a4:{
    ingredients:["1 poulet entier découpé","1 kg d'oignons émincés finement","3 c. à soupe de sumac","1 c. à café de quatre-épices","½ c. à café de cannelle","4 c. à soupe d'huile d'olive","Pain pita ou markook","Noix de pin et amandes grillées"],
    steps:[
      {title:"Caraméliser les oignons",desc:"Cuire les oignons émincés dans l'huile d'olive à feu moyen-doux 40 min jusqu'à très doux et dorés. C'est l'âme du plat."},
      {title:"Assaisonner le poulet",desc:"Frotter les morceaux avec le sumac, le quatre-épices, la cannelle, le sel et l'huile."},
      {title:"Combiner",desc:"Mélanger la moitié des oignons avec le poulet. Rôtir à 200°C pendant 35–40 min."},
      {title:"Couche de pain",desc:"Disposer le pain sur le plat de service. Couvrir des oignons caramélisés restants."},
      {title:"Servir",desc:"Poser le poulet rôti sur le pain aux oignons. Parsemer de noix grillées. Arroser d'huile d'olive."}]},
  a5:{
    ingredients:["400g de morceaux de poulet","300g de côtelettes d'agneau","500g de riz basmati","3 gros oignons","Ghee","Safran dans du lait chaud","Mélange d'épices biryani","Menthe et coriandre fraîches"],
    steps:[
      {title:"Cuire les viandes séparément",desc:"Braiser le poulet dans une sauce yaourt épicée 20 min. Braiser l'agneau dans une autre sauce 35 min."},
      {title:"Frire les oignons",desc:"Frire les oignons émincés dans le ghee jusqu'à dorure intense et croustillant. Cela prend 25 min."},
      {title:"Précuire le riz",desc:"Faire bouillir l'eau salée avec cardamome. Cuire le riz exactement 6 min — égoutter légèrement sous-cuit."},
      {title:"Superposer",desc:"Dans une casserole: couche de poulet, puis agneau, puis riz, puis lait safrané, puis oignons, herbes."},
      {title:"Cuire à l'étouffée",desc:"Sceller hermétiquement. Cuire à feu très doux 25 min."}]},
  a6:{
    ingredients:["Faux-filet tranché très fin","Filets de poulet tranchés finement","Agneau tranché finement","Bouillon épicé: bouillon, gingembre, ail, piment, sauce soja","Nouilles de riz, tofu, champignons","Sauces: pâte de sésame, hoisin, huile de piment"],
    steps:[
      {title:"Préparer le bouillon",desc:"Mijoter le bouillon avec gingembre, ail, pâte de piment, sauce soja et sésame. Goûter et ajuster."},
      {title:"Trancher finement",desc:"Congeler les viandes 30 min puis trancher très fin. Disposer sur des assiettes autour de la table."},
      {title:"Installer la table",desc:"Placer la fondue ou le réchaud portable au centre. Disposer tous les ingrédients autour."},
      {title:"Préparer les sauces",desc:"Bols individuels: pâte de sésame allongée de bouillon, hoisin, huile de piment. Chacun personnalise."},
      {title:"Cuire et déguster",desc:"Chacun cuit ses morceaux en les plongeant dans le bouillon bouillant 30–60 secondes."}]},
  a7:{
    ingredients:["Faux-filet tranché finement","Filets de poulet","Marinade bulgogi: sauce soja, poire, sucre, sésame","Marinade poulet: gochujang, ail, sucre, huile","Feuilles de laitue, riz, kimchi","Sauces et banchan"],
    steps:[
      {title:"Marinades",desc:"Préparer les deux marinades. Mariner le boeuf et le poulet séparément au moins 2 heures."},
      {title:"Installer",desc:"Chauffer une poêle ou grill de table. Préparer la laitue, le riz, le kimchi et les accompagnements."},
      {title:"Griller le boeuf",desc:"Cuire le bulgogi par petites quantités à feu vif, 2 min de chaque côté."},
      {title:"Griller le poulet",desc:"Cuire le poulet au gochujang 4 min de chaque côté jusqu'à grillé et brillant."},
      {title:"Ssam",desc:"Enrouler la viande dans une feuille de laitue avec du riz, du kimchi, de l'ail et une touche de ssamjang."}]},
  a8:{
    ingredients:["Cuisses et filets de poulet","Côtelettes d'agneau","200ml de yaourt nature","2 c. à café de masala tandoori","1 c. à café de curcuma","1 c. à café de paprika","Pâte gingembre-ail","Jus de citron","Chutney à la menthe, oignons tranchés"],
    steps:[
      {title:"Entailler",desc:"Entailler profondément le poulet et l'agneau pour que la marinade pénètre jusqu'à l'os."},
      {title:"Marinade",desc:"Mélanger yaourt, toutes les épices, la pâte gingembre-ail et le jus de citron. Enrober complètement."},
      {title:"Mariner",desc:"Réfrigérer au moins 4 heures — toute une nuit transforme la viande."},
      {title:"Chaleur intense",desc:"Grill ou four à température maximale (250°C+). Cuire poulet 25 min, côtelettes d'agneau 10 min."},
      {title:"Servir",desc:"Disposer sur un plat avec oignon tranché, quartiers de citron et chutney à la menthe fraîche."}]},
  a9:{
    ingredients:["1 poulet entier papillonné","Faux-filet de boeuf","Côtelettes d'agneau","Sauce piri-piri: piments, citron, ail, huile d'olive","Coriandre fraîche","Pain grillé"],
    steps:[
      {title:"Sauce piri-piri",desc:"Mixer les piments rouges, l'ail, le jus de citron, l'huile d'olive et le sel. Goûter — doit être piquant."},
      {title:"Mariner le poulet",desc:"Enrober le poulet papillonné de piri-piri. Mariner 2 heures minimum."},
      {title:"Griller le poulet",desc:"Griller en chaleur indirecte 35 min, finir 5 min en chaleur directe. La carbonisation est essentielle."},
      {title:"Griller boeuf et agneau",desc:"Assaisonner simplement. Griller le faux-filet 3 min par côté, les côtelettes 3 min par côté."},
      {title:"Plateau",desc:"Tout trancher et disposer sur une grande planche. Arroser de piri-piri, parsemer de coriandre."}]},
  a10:{
    ingredients:["Filets de poulet pour shawarma","Agneau haché pour kofta","Boeuf pour fatteh","Houmous, taboulé, fattoush","Pain pita","Sauce à l'ail, tahini, pickles"],
    steps:[
      {title:"Préparer le poulet",desc:"Mariner le poulet dans les épices shawarma. Griller et trancher."},
      {title:"Kofta",desc:"Mélanger l'agneau haché avec oignon, persil, cumin, cannelle. Former sur des brochettes. Griller."},
      {title:"Fatteh",desc:"Faire revenir le boeuf haché épicé. Superposer pain toasté, boeuf, yaourt et pois chiches."},
      {title:"Disposer",desc:"Disposer tout sur de petites assiettes sur toute la table."},
      {title:"Partager",desc:"Le mezze est communautaire — tout le monde picore et partage. Servir avec du pain pita."}]},
  f13:{
    ingredients:["1 poulet entier, ouvert en crapaudine","6 piments piri-piri ou piments oiseau rouges","6 gousses d'ail","Jus de 2 citrons","4 c. à soupe d'huile d'olive","1 c. à soupe de paprika","1 c. à café d'origan","Sel"],
    steps:[{title:"Sauce",desc:"Mixer piments, ail, citron, huile, paprika, origan et sel en une marinade lisse."},{title:"Mariner",desc:"Enduire le poulet entièrement, dedans et dehors. Laisser mariner au moins 4 heures, idéalement toute une nuit."},{title:"Griller",desc:"Griller côté peau vers le bas à feu moyen 20 min, puis retourner et cuire 20 min de plus."},{title:"Badigeonner",desc:"Badigeonner de sauce supplémentaire toutes les 10 minutes pour une finition collante et grillée."},{title:"Servir",desc:"Laisser reposer 5 min. Servir avec des frites et une salade verte simple."}]},
  f14:{
    ingredients:["500g de filets de poulet en cubes","200ml de lait de coco ou de crème","2 oignons émincés","3 gousses d'ail","2cm de gingembre","2 c. à café de garam masala","1 c. à café de curcuma","Une poignée de noix de cajou moulues","Ghee"],
    steps:[{title:"Base d'oignon",desc:"Faire revenir les oignons dans le ghee 10 min jusqu'à tendreté et couleur dorée. Mixer avec l'ail et le gingembre en pâte."},{title:"Épices",desc:"Remettre la pâte dans la poêle. Ajouter curcuma et garam masala. Cuire 2 min jusqu'à parfum."},{title:"Poulet",desc:"Ajouter le poulet. Cuire 8 min en remuant, jusqu'à saisie de tous les côtés."},{title:"Mijoter",desc:"Ajouter le lait de coco et les noix de cajou moulues. Mijoter 15 min jusqu'à ce que le poulet soit tendre et la sauce épaississe."},{title:"Finition",desc:"Goûter et ajuster le sel. Servir avec du riz ou du naan."}]},
  f15:{
    ingredients:["800g de morceaux de poulet avec os","4 tomates coupées","4 piments verts fendus","2 c. à soupe de gingembre en julienne","4 gousses d'ail","1 c. à café de graines de cumin","1 c. à café de piment rouge en poudre","1 c. à café de coriandre en poudre","Coriandre fraîche","Huile ou ghee"],
    steps:[{title:"Saisir le poulet",desc:"Faire revenir les morceaux de poulet dans l'huile chaude dans un karahi ou un wok jusqu'à saisie, environ 8 min."},{title:"Aromates",desc:"Ajouter l'ail et la moitié du gingembre. Cuire 2 min. Ajouter toutes les épices sèches."},{title:"Tomates",desc:"Ajouter les tomates coupées. Cuire à découvert à feu vif, en écrasant de temps en temps, 12–15 min jusqu'à ce que l'huile se sépare."},{title:"Réduire",desc:"La sauce doit napper le poulet, pas être liquide — continuer à cuire à feu vif si trop humide."},{title:"Finition",desc:"Garnir avec le reste du gingembre, piments verts et coriandre. Servir avec du naan."}]},
  f16:{
    ingredients:["500g de morceaux de poulet","300g de riz long grain","1 oignon coupé en dés","1 carotte râpée","2 c. à soupe de concentré de tomate","500ml de bouillon de poulet","1 c. à café de paprika","Feuille de laurier","Huile"],
    steps:[{title:"Dorer le poulet",desc:"Dorer les morceaux de poulet dans l'huile dans une cocotte épaisse. Retirer et réserver."},{title:"Légumes",desc:"Faire revenir l'oignon et la carotte dans la même cocotte 8 min jusqu'à tendreté. Ajouter le concentré de tomate et le paprika."},{title:"Combiner",desc:"Remettre le poulet dans la cocotte. Ajouter le riz, le bouillon et le laurier. Remuer une fois."},{title:"Mijoter",desc:"Couvrir et laisser mijoter à feu doux 25 min sans remuer — cela garde le riz moelleux."},{title:"Repos",desc:"Laisser reposer hors du feu, couvert, 5 min avant de servir."}]},
  r13:{
    ingredients:["500g de bœuf haché","200g d'agneau haché","1 oignon râpé et essoré","1 c. à café de bicarbonate de soude","Sel et poivre noir","Somun ou pain pita","Oignon cru, kajmak ou crème fraîche pour servir"],
    steps:[{title:"Mélanger",desc:"Combiner bœuf, agneau, oignon, bicarbonate, sel et poivre. Pétrir vigoureusement 5 min jusqu'à ce que ça se lie."},{title:"Repos",desc:"Réfrigérer le mélange au moins 2 heures — cela raffermit la texture."},{title:"Façonner",desc:"Rouler en petites saucisses de la taille d'un doigt, environ 8cm, avec des mains mouillées."},{title:"Griller",desc:"Griller à feu vif, en retournant souvent, 8–10 min jusqu'à belle coloration à l'extérieur."},{title:"Servir",desc:"Farcir le somun chaud avec les ćevapi, de l'oignon cru en dés et une généreuse cuillère de kajmak ou de crème fraîche."}]},
  r14:{
    ingredients:["600g d'agneau haché","1 oignon finement râpé","3 gousses d'ail","2cm de gingembre râpé","2 piments verts émincés","1 c. à café de garam masala","1 c. à café de cumin en poudre","Coriandre et menthe fraîches hachées","1 œuf (liant)"],
    steps:[{title:"Mélanger",desc:"Combiner tous les ingrédients minutieusement à la main. Le mélange doit être légèrement collant."},{title:"Repos",desc:"Réfrigérer 1 heure — cela facilite grandement le façonnage sur les brochettes."},{title:"Façonner",desc:"Mains mouillées, mouler le mélange autour de brochettes métalliques plates en longues saucisses, en pressant fermement."},{title:"Griller",desc:"Griller à feu moyen-vif, en retournant régulièrement, 10–12 min jusqu'à coloration et cuisson complète."},{title:"Servir",desc:"Servir avec chutney à la menthe, oignon émincé et naan."}]},
  r15:{
    ingredients:["800g d'épaule d'agneau avec os, en cubes","4 tomates coupées","2 c. à soupe de gingembre en julienne","5 gousses d'ail","4 piments verts","1 c. à café de piment rouge en poudre","1 c. à café de coriandre en poudre","½ c. à café de curcuma","Ghee ou huile","Coriandre fraîche"],
    steps:[{title:"Saisir l'agneau",desc:"Dorer les morceaux d'agneau dans le ghee chaud dans un karahi ou une cocotte épaisse, environ 10 min."},{title:"Aromates",desc:"Ajouter l'ail et la moitié du gingembre. Ajouter toutes les épices sèches. Cuire 2 min."},{title:"Tomates et mijotage",desc:"Ajouter les tomates. Couvrir et laisser mijoter à feu moyen-doux 35–40 min jusqu'à ce que l'agneau soit tendre, en remuant occasionnellement."},{title:"Réduire",desc:"Découvrir, augmenter le feu et faire réduire le liquide en excès jusqu'à ce que la sauce nappe la viande."},{title:"Finition",desc:"Garnir avec le reste du gingembre, piments verts et coriandre. Servir avec du roti."}]},
  r16:{
    ingredients:["600g de faux-filet de bœuf en gros cubes","8 gousses d'ail coupées en deux","2 feuilles de laurier déchirées","3 c. à soupe d'huile d'olive","Gros sel de mer","Poivre noir"],
    steps:[{title:"Mariner",desc:"Mélanger les cubes de bœuf avec l'ail, le laurier, l'huile d'olive, le sel et le poivre. Mariner au moins 2 heures."},{title:"Embrocher",desc:"Enfiler alternativement bœuf et ail sur des brochettes — traditionnellement des branches de laurier."},{title:"Griller",desc:"Griller à feu vif 8–10 min au total, en retournant toutes les 2 min pour une coloration uniforme."},{title:"Repos",desc:"Laisser reposer 3 min hors du feu."},{title:"Servir",desc:"Servir avec du pain de maïs portugais (bolo do caco) ou des frites, et un verre de vin rouge."}]},
  b13:{
    ingredients:["800g de bœuf à braiser en cubes","3 oignons émincés","2 c. à soupe de paprika doux","1 c. à soupe de concentré de tomate","500ml de bouillon de bœuf","2 feuilles de laurier","1 c. à soupe de farine","Beurre ou huile","Pommes de terre bouillies pour servir"],
    steps:[{title:"Oignons",desc:"Cuire les oignons émincés dans le beurre à feu doux 15 min jusqu'à ramollissement profond et coloration dorée."},{title:"Dorer le bœuf",desc:"Ajouter le bœuf par lots, en dorant bien de tous les côtés."},{title:"Épices",desc:"Incorporer le paprika et le concentré de tomate. Cuire 2 min. Saupoudrer de farine et mélanger."},{title:"Braiser",desc:"Ajouter le bouillon et le laurier. Couvrir et laisser mijoter très doucement 1h30 jusqu'à ce que le bœuf soit tendre à la fourchette."},{title:"Servir",desc:"Servir sur des pommes de terre bouillies avec une cuillère de crème fraîche."}]},
  b14:{
    ingredients:["1kg de jarret de bœuf avec os","4 c. à soupe de masala nihari (ou mélange maison : coriandre, fenouil, gingembre en poudre, piment)","3 c. à soupe de farine, grillée jusqu'à brunir","4 c. à soupe de ghee","1 oignon émincé","Pâte de gingembre et d'ail","Gingembre frais, coriandre, piment vert, citron pour garnir"],
    steps:[{title:"Saisir",desc:"Dorer le jarret de bœuf dans le ghee avec l'oignon jusqu'à coloration profonde, environ 15 min."},{title:"Épices",desc:"Ajouter la pâte de gingembre-ail et le masala nihari. Cuire 3 min jusqu'à parfum."},{title:"Cuisson lente",desc:"Couvrir généreusement d'eau. Couvrir et laisser mijoter à feu très doux 2h30–3h jusqu'à ce que le bœuf se défasse."},{title:"Épaissir",desc:"Fouetter la farine grillée avec un peu d'eau en une bouillie. Incorporer au ragoût pour épaissir."},{title:"Servir",desc:"Laisser mijoter 10 minutes de plus. Garnir de gingembre, coriandre, piment et citron. Servir avec du naan."}]},
  b15:{
    ingredients:["600g de bœuf haché","1 oignon finement haché","2 tomates épépinées et finement hachées","2 piments verts émincés","1 c. à soupe de graines de grenade séchées (anardana), écrasées","1 c. à café de graines de coriandre écrasées","1 œuf","2 c. à soupe de farine de maïs","Coriandre fraîche"],
    steps:[{title:"Mélanger",desc:"Combiner tous les ingrédients à la main jusqu'à bonne répartition — ne pas trop travailler la viande."},{title:"Repos",desc:"Réfrigérer 20 min pour que les galettes tiennent mieux à la cuisson."},{title:"Façonner",desc:"Former des galettes larges et plates d'environ 1cm d'épaisseur — chapli signifie « plat » en pashto."},{title:"Frire",desc:"Frire dans une poêle généreusement huilée à feu moyen 5–6 min par face jusqu'à coloration dorée et bords croustillants."},{title:"Servir",desc:"Servir chaud avec du naan, des rondelles d'oignon cru et un quartier de citron."}]},
  b16:{
    ingredients:["2 fines entrecôtes de bœuf","3 gousses d'ail émincées","3 c. à soupe de beurre","100ml de café noir fort (espresso convient)","1 c. à soupe de moutarde de Dijon","Un trait de vin blanc ou de bière","Sel et poivre","Frites pour servir"],
    steps:[{title:"Assaisonner",desc:"Assaisonner généreusement les steaks de sel et de poivre."},{title:"Saisir",desc:"Saisir les steaks fort et vite dans une poêle chaude, 2 min par face pour des coupes fines. Retirer et laisser reposer."},{title:"Sauce",desc:"Dans la même poêle, faire revenir l'ail dans le beurre 1 min. Ajouter le café, la moutarde et le vin. Mijoter 3 min pour réduire légèrement."},{title:"Combiner",desc:"Remettre les steaks brièvement dans la poêle pour les enrober de sauce."},{title:"Servir",desc:"Dresser avec beaucoup de sauce versée dessus et une montagne de frites."}]},
  a11:{
    ingredients:["300g de bœuf en cubes","300g d'épaule d'agneau en cubes","2 pommes de terre en morceaux","2 carottes en morceaux","1 chou en quartiers","2 oignons émincés","2 feuilles de laurier","Grains de poivre entiers","Persil frais"],
    steps:[{title:"Superposer",desc:"Dans une cocotte épaisse, superposer alternativement viande et légumes — viande, oignon, pomme de terre, carotte, chou, répéter."},{title:"Assaisonner",desc:"Ajouter laurier, grains de poivre et sel entre les couches. Ne pas remuer une fois superposé."},{title:"Couvrir d'eau",desc:"Ajouter de l'eau juste pour couvrir la couche supérieure."},{title:"Cuisson lente",desc:"Couvrir hermétiquement et laisser mijoter à feu très doux 2 à 2h30 sans remuer."},{title:"Servir",desc:"Servir directement de la cocotte, parsemé de persil frais avec du pain croustillant à côté."}]},
  a12:{
    ingredients:["4 cuisses de poulet","4 côtelettes d'agneau","400g de faux-filet de bœuf","3 c. à soupe de moutarde","2 c. à soupe d'herbes de Provence","Huile d'olive","Sel et poivre","Tomates grillées et haricots verts pour servir"],
    steps:[{title:"Assaisonner",desc:"Enduire toutes les viandes d'huile d'olive, moutarde, herbes de Provence, sel et poivre."},{title:"Repos",desc:"Laisser les viandes revenir à température ambiante, environ 20 min, pendant que le gril chauffe."},{title:"Griller le poulet d'abord",desc:"Les cuisses de poulet prennent le plus de temps — griller 6–7 min par face jusqu'à cuisson complète."},{title:"Griller agneau et bœuf",desc:"Griller les côtelettes d'agneau et le faux-filet 3–4 min par face pour une cuisson à point."},{title:"Dresser",desc:"Disposer toutes les viandes sur un grand plat avec tomates grillées et haricots verts."}]},
  a13:{
    ingredients:["400g de bœuf haché (pour seekh)","500g de cuisses de poulet en cubes","4 côtelettes d'agneau","Yaourt, pâte de gingembre-ail, garam masala, piment en poudre, cumin pour les marinades","Citron, rondelles d'oignon, chutney à la menthe pour servir"],
    steps:[{title:"Mariner le poulet",desc:"Enrober les cubes de poulet de yaourt, gingembre-ail, garam masala et piment. Mariner 2 heures."},{title:"Assaisonner l'agneau",desc:"Enduire les côtelettes d'agneau d'ail, cumin, piment en poudre et un peu d'huile."},{title:"Façonner le seekh",desc:"Mélanger le bœuf haché avec gingembre, ail, piment et coriandre. Mouler sur des brochettes."},{title:"Tout griller",desc:"Griller les brochettes de poulet, côtelettes d'agneau et seekh kebabs, en retournant régulièrement, 10–15 min au total jusqu'à coloration et cuisson complète."},{title:"Servir",desc:"Disposer sur un grand plat avec quartiers de citron, rondelles d'oignon et chutney à la menthe."}]},
  a14:{
    ingredients:["4 pilons de poulet","4 côtelettes d'agneau","300g de yaourt épais","2 c. à soupe de masala tandoori","1 c. à soupe de pâte de gingembre-ail","1 c. à café de piment rouge en poudre","Jus d'1 citron","Huile de moutarde ou huile végétale"],
    steps:[{title:"Première marinade",desc:"Enduire poulet et agneau de jus de citron, sel et un peu de piment en poudre. Laisser reposer 20 min."},{title:"Deuxième marinade",desc:"Mélanger yaourt, masala tandoori, pâte de gingembre-ail et huile. Enrober bien les viandes. Mariner au moins 4 heures, idéalement toute une nuit."},{title:"Préchauffer",desc:"Chauffer fortement le gril ou le four — le tandoori nécessite une chaleur vive pour bien griller."},{title:"Griller",desc:"Griller le poulet 20–25 min et les côtelettes d'agneau 8–10 min, en retournant occasionnellement, en badigeonnant du reste de marinade."},{title:"Servir",desc:"Griller légèrement plus directement à la flamme à la fin si possible. Servir avec chutney à la menthe et oignon émincé."}]},
},
de:{
  f1:{
    ingredients:["1 ganzes Hähnchen (1,2–1,5 kg)","3 EL Olivenöl","1 Zitrone, halbiert","4 Knoblauchzehen, zerdrückt","Frischer Thymian und Rosmarin","Salz und schwarzer Pfeffer"],
    steps:[
      {title:"Vorbereiten",desc:"Ofen auf 200°C vorheizen. Hähnchen trocken tupfen — trockene Haut = knusprige Haut."},
      {title:"Würzen",desc:"Überall mit Olivenöl, Salz und Pfeffer einreiben. Hohlraum mit Zitronenhälften, Knoblauch und Kräutern füllen."},
      {title:"Braten",desc:"Mit der Brust nach oben in eine Bratform legen. 1 Stunde 10 Minuten braten bis der Saft klar läuft."},
      {title:"Ruhen lassen",desc:"Locker mit Folie abdecken. 10 Minuten ruhen lassen bevor das Hähnchen tranchiert wird."},
      {title:"Servieren",desc:"Tranchieren und mit dem Bratensaft übergossen servieren. Perfekt zu Bratkartoffeln."}]},
  f2:{
    ingredients:["300g Hähnchenfilets","2 EL Butter","2 Knoblauchzehen, in Scheiben","Frische Thymianzweige","Salz und Pfeffer","Zitronensaft"],
    steps:[
      {title:"Plattieren",desc:"Filets zwischen Frischhaltefolie legen und leicht flachklopfen für gleichmäßige Dicke."},
      {title:"Würzen",desc:"Kurz vor dem Garen großzügig von beiden Seiten salzen und pfeffern."},
      {title:"Anbraten",desc:"Pfanne sehr heiß erhitzen. Öl zugeben. Filets 4 Minuten anbraten ohne zu bewegen."},
      {title:"Butterschmelze",desc:"Wenden, Butter, Knoblauch und Thymian zugeben. Pfanne neigen und Butter 3 Minuten übergießen."},
      {title:"Ruhen lassen",desc:"3 Minuten vom Herd ruhen lassen. Mit einem Spritzer Zitrone abschließen."}]},
  f3:{
    ingredients:["1 ganzes Hähnchen","3 EL Räucherpaprika","2 EL Olivenöl","1 EL Knoblauchpulver","1 EL Zwiebelpulver","1 TL Cayennepfeffer","Salz und Pfeffer"],
    steps:[
      {title:"Spatchcock",desc:"Mit einer Schere beidseitig am Rückgrat entlangschneiden und entfernen. Flach drücken."},
      {title:"Marinade",desc:"Paprika, Knoblauchpulver, Zwiebelpulver, Cayenne, Öl und Salz mischen. Überall einreiben. 30 Min marinieren."},
      {title:"Grill vorbereiten",desc:"Zwei-Zonen-Grill einrichten — eine heiße direkte und eine indirekte Zone."},
      {title:"Grillen",desc:"Hautseite zuerst auf direkter Hitze 5 Min anrösten. Auf indirekte Zone umsetzen, 30–35 Min garen."},
      {title:"Fertigstellen",desc:"Für 2 Min zurück auf direkte Hitze. 10 Min ruhen lassen."}]},
  f4:{
    ingredients:["8 Hähnchenkeulen","4 EL Honig","3 EL Sojasoße","2 EL Apfelessig","2 EL Tomatenketchup","1 EL Räucherpaprika","Knoblauchpulver, Salz"],
    steps:[
      {title:"Einschneiden",desc:"Jede Keule 2–3 Mal einschneiden damit die Marinade tief eindringt."},
      {title:"Marinieren",desc:"Honig, Soja, Essig, Ketchup, Paprika und Knoblauch mischen. Keulen vollständig einreiben. 2 Stunden marinieren."},
      {title:"Bei niedriger Hitze grillen",desc:"Bei mittlerer Grillhitze 30 Min garen, alle 10 Minuten wenden."},
      {title:"Glasieren",desc:"In den letzten 10 Minuten mit extra Marinade bestreichen. Hitze erhöhen zum Karamellisieren."},
      {title:"Servieren",desc:"5 Min ruhen lassen. Mit Coleslaw und gegrilltem Brot servieren."}]},
  f5:{
    ingredients:["500g Hähnchenfilets","1 TL Kreuzkümmel","1 TL Koriander","1 TL Kurkuma","1 TL Zimt","½ TL Kardamom","3 EL Olivenöl","3 Knoblauchzehen, gehackt","Saft von 1 Zitrone","Joghurt, Fladenbrot, Tomate, Zwiebel zum Servieren"],
    steps:[
      {title:"Gewürzmischung",desc:"Alle Gewürze mit Olivenöl, Knoblauch und Zitronensaft zu einer Paste vermengen."},
      {title:"Marinieren",desc:"Hähnchenfilets in der Paste wenden. Mindestens 30 Minuten marinieren — über Nacht ist besser."},
      {title:"Garen",desc:"Bei mittlerer bis hoher Hitze grillen oder anbraten, 5–6 Min pro Seite bis leicht angeröstet."},
      {title:"Aufschneiden",desc:"3 Min ruhen lassen, dann in dünne Streifen schneiden."},
      {title:"Zusammenstellen",desc:"Fladenbrot erwärmen, Knoblauchjoghurt verteilen, Hähnchen, Tomaten und Zwiebeln belegen."}]},
  f6:{
    ingredients:["500g Hähnchenfilets in Würfeln","4 EL Naturjoghurt","3 EL Tomatenmark","3 Knoblauchzehen","Saft von 1 Zitrone","1 TL Paprika","1 TL Piment","½ TL weißer Pfeffer","Olivenöl"],
    steps:[
      {title:"Marinade",desc:"Joghurt, Tomatenmark, Knoblauch, Zitrone, Gewürze und Olivenöl zu einer glatten Marinade mixen."},
      {title:"Marinieren",desc:"Hähnchenwürfel zugeben, gut vermischen, abdecken und mindestens 2 Stunden kühlstellen."},
      {title:"Aufspießen",desc:"Auf Metallspieße fädeln mit kleinen Lücken für die Luftzirkulation."},
      {title:"Grillen",desc:"Bei mittlerer bis hoher Hitze grillen, alle 3 Min wenden. Gesamtgarzeit 12–15 Min."},
      {title:"Servieren",desc:"Sofort mit Toum, eingelegtem Gemüse und Fladenbrot servieren."}]},
  f7:{
    ingredients:["500g Hähnchenfilets in Würfeln","200ml passierte Tomaten","150ml Sahne","1 Zwiebel, gewürfelt","3 Knoblauchzehen","2 cm Ingwer, gerieben","2 TL Garam Masala","1 TL Kreuzkümmel","1 TL Kurkuma","1 TL Paprika","Joghurt für die Marinade","Frischer Koriander"],
    steps:[
      {title:"Marinieren",desc:"Hähnchen mit Joghurt, 1 TL Garam Masala, Paprika und Salz mischen. 30 Min marinieren."},
      {title:"Rösten",desc:"Hähnchen bei hoher Hitze grillen oder braten bis leicht angeröstet. Beiseitestellen."},
      {title:"Sauce",desc:"Zwiebel 8 Min golden anbraten. Knoblauch und Ingwer 2 Min zugeben. Trockene Gewürze 1 Min rösten."},
      {title:"Köcheln",desc:"Tomaten zugeben, 10 Min bei niedriger Hitze köcheln. Sahne und Hähnchen zugeben. 5 Min köcheln."},
      {title:"Abschmecken",desc:"Salz anpassen. Mit Butter abschließen. Mit Koriander garnieren. Mit Basmati und Naan servieren."}]},
  f8:{
    ingredients:["800g Hähnchenteile","400g Basmatireis","2 große Zwiebeln, dünn geschnitten","4 EL Ghee","1 TL Kreuzkümmelsamen","3 Kardamomkapseln","2 Lorbeerblätter","1 TL Kurkuma","2 TL Biryani-Masala","Safran in warmem Milch","Frische Minze und Koriander"],
    steps:[
      {title:"Zwiebeln rösten",desc:"Zwiebelscheiben im Ghee bei mittlerer bis niedriger Hitze 25 Min rösten bis dunkelgolden und knusprig."},
      {title:"Hähnchen garen",desc:"Im restlichen Ghee ganze Gewürze anrösten, dann Hähnchen zugeben. 10 Min anbraten. Biryani-Masala, Joghurt zugeben. 15 Min garen."},
      {title:"Reis halbgar kochen",desc:"Gesalzenes Wasser mit Lorbeer aufkochen. Gewaschenen Reis genau 6 Minuten kochen. Abgießen."},
      {title:"Schichten",desc:"Im Topf: Hähnchen, dann Reis, dann knusprige Zwiebeln, Minze, Koriander. Safranmilch darüber."},
      {title:"Dum garen",desc:"Topf fest mit Folie dann Deckel verschließen. Bei sehr niedriger Hitze 25 Min garen."}]},
  f9:{
    ingredients:["300g Hähnchenfilets","4 EL Sojasoße","3 EL Mirin","2 EL Sake","1 EL Zucker","1 TL Sesamöl","Sesamsamen","Frühlingszwiebeln zum Garnieren"],
    steps:[
      {title:"Sauce",desc:"Soja, Mirin, Sake und Zucker verrühren bis der Zucker aufgelöst ist."},
      {title:"Anbraten",desc:"Hähnchenhaut einschneiden. In leicht geölter Pfanne hautseits unten 5 Min braten."},
      {title:"Glasieren",desc:"Wenden, Sauce in die Pfanne geben. 4–5 Min kochen, dabei wiederholt übergießen."},
      {title:"Einkochen",desc:"Sauce zu einer glänzenden Glasur eindicken lassen."},
      {title:"Servieren",desc:"Aufschneiden und auf Dampfreis servieren. Mit Sesam und Frühlingszwiebeln garnieren."}]},
  f10:{
    ingredients:["300g Hähnchenfilets, fein gehackt","3 Knoblauchzehen","3 Bird's-Eye-Chilis","2 EL Austernsauce","1 EL Fischsauce","1 TL Sojasoße","1 TL Zucker","Große Handvoll Thaibasilikum","Spiegeleier zum Servieren"],
    steps:[
      {title:"Vorbereiten",desc:"Knoblauch und Chilis im Mörser grob zerkleinern."},
      {title:"Aromen anrösten",desc:"Knoblauch-Chili-Paste in sehr heißem Öl 30 Sek anrösten bis es duftet."},
      {title:"Hähnchen garen",desc:"Gehacktes Hähnchen zugeben. Bei hoher Hitze 4–5 Min pfannenrühren."},
      {title:"Würzen",desc:"Austernsauce, Fischsauce, Soja und Zucker zugeben. 1 Min alles vermengen."},
      {title:"Basilikum",desc:"Vom Herd nehmen. Basilikumblätter unterheben — Restwärme lässt sie perfekt zusammenfallen. Auf Reis mit Spiegelei servieren."}]},
  f11:{
    ingredients:["4 Hähnchenfilets","Saft von 2 Zitronen","3 EL Olivenöl","1 EL frischer Oregano","1 EL frischer Thymian","3 Knoblauchzehen, gehackt","Salz und Pfeffer"],
    steps:[
      {title:"Marinade",desc:"Zitronensaft, Olivenöl, Knoblauch und Kräuter mischen. Mit Salz und Pfeffer würzen."},
      {title:"Marinieren",desc:"Hähnchen einreiben und mindestens 30 Minuten bis zu 4 Stunden marinieren."},
      {title:"Grillen",desc:"Bei mittlerer bis hoher Hitze 6–7 Minuten pro Seite grillen."},
      {title:"Ruhen lassen",desc:"5 Minuten vom Grill ruhen lassen."},
      {title:"Servieren",desc:"Mit gegrillten Zitronenhälften und grünem Salat servieren."}]},
  f12:{
    ingredients:["1 ganzes Hähnchen, zerteilt","1 eingelegte Zitrone, geviertelt","100g grüne Oliven","1 Zwiebel, in Scheiben","3 Knoblauchzehen","1 TL Ingwer","1 TL Kreuzkümmel","1 TL Koriander","½ TL Zimt","Safran in warmem Wasser","Frischer Koriander"],
    steps:[
      {title:"Marinieren",desc:"Gewürze mit Knoblauch und Öl mischen. Hähnchen einreiben und 2 Stunden marinieren."},
      {title:"Anbraten",desc:"Hähnchenteile in einer Pfanne oder einem Tajine von allen Seiten anbraten. Beiseitestellen."},
      {title:"Zwiebelbasis",desc:"Zwiebel 8 Min in derselben Pfanne anbraten. Ingwer und Knoblauch 2 Min zugeben."},
      {title:"Schmoren",desc:"Hähnchen zurücklegen. Safranwasser, eingelegte Zitrone und Oliven zugeben. Abdecken und 40 Min bei niedriger Hitze garen."},
      {title:"Servieren",desc:"Mit frischem Koriander garnieren. Mit Couscous oder Fladenbrot servieren."}]},
  r1:{
    ingredients:["4 Lammkoteletts","3 EL Olivenöl","3 Knoblauchzehen, gehackt","Frischer Rosmarin","Frischer Thymian","Salz und schwarzer Pfeffer","Zitrone zum Servieren"],
    steps:[
      {title:"Temperieren",desc:"Koteletts 30 Min vor dem Garen aus dem Kühlschrank nehmen."},
      {title:"Marinieren",desc:"Koteletts mit Olivenöl, Knoblauch, Rosmarin, Thymian, Salz und Pfeffer einreiben."},
      {title:"Vorheizen",desc:"Grill oder Gusseisenpfanne sehr stark erhitzen."},
      {title:"Grillen",desc:"3 Min pro Seite für medium-rare. Knochen 1 Min senkrecht halten um das Fett auszulassen."},
      {title:"Ruhen lassen",desc:"5 Min auf einem warmen Teller ruhen. Frischen Zitronensaft darüberpressen."}]},
  r2:{
    ingredients:["300g Rinderhackfleisch","200g Lammhackfleisch","1 Zwiebel, gerieben","3 Knoblauchzehen, gehackt","2 TL Kreuzkümmel","1 TL Koriander","½ TL Zimt","½ TL Piment","Frische Petersilie und Minze","Salz und Pfeffer"],
    steps:[
      {title:"Mischen",desc:"Alle Zutaten vermengen. 2 Minuten wie einen Teig kneten."},
      {title:"Kühlen",desc:"Masse 30 Min kühlen. Kaltes Fett hält die Koftas in Form."},
      {title:"Formen",desc:"Nasse Hände. Um flache Metallspieße zu 12-cm-Zylindern formen, fest andrücken."},
      {title:"Grillen",desc:"Bei hoher Hitze grillen, alle 2–3 Min wenden. Gesamtgarzeit 10–12 Min."},
      {title:"Servieren",desc:"Mit Fladenbrot, gegrillten Tomaten und Joghurtsauce servieren."}]},
  r3:{
    ingredients:["400g Rindersirloin","Grobkörniges Meersalz und schwarzer Pfeffer","Großer Bund glatte Petersilie","4 Knoblauchzehen","1 Schalotte","3 EL Rotweinessig","6 EL Olivenöl","1 TL Chiliflocken"],
    steps:[
      {title:"Chimichurri",desc:"Petersilie, Knoblauch und Schalotte fein hacken. Mit Essig, Öl, Chili und Salz mischen. Als erstes zubereiten."},
      {title:"Steak würzen",desc:"Sirloin großzügig mit Meersalz und Pfeffer würzen."},
      {title:"Grillen",desc:"Bei höchster Hitze 3–4 Min pro Seite für medium-rare grillen."},
      {title:"Ruhen lassen",desc:"5 Min auf einem Brett ruhen lassen."},
      {title:"Servieren",desc:"Gegen die Faser aufschneiden. Großzügig mit Chimichurri beträufeln."}]},
  r4:{
    ingredients:["600g Lammschulter","2 EL Räucherpaprika","1 EL Kreuzkümmel","1 EL brauner Zucker","1 TL Knoblauchpulver","Salz und Pfeffer","Briochebrötchen, Coleslaw, Gurken"],
    steps:[
      {title:"Trockenreiben",desc:"Alle Gewürze und Zucker mischen. Überall auf dem Lamm einreiben. Idealerweise über Nacht kühlstellen."},
      {title:"Langsam garen",desc:"Bei 150°C mit Folie abgedeckt 3 Stunden braten. Kerntemperaturziel: 85–90°C."},
      {title:"Kruste bilden",desc:"Folie entfernen, für 15 Min auf 220°C erhöhen."},
      {title:"Zerrupfen",desc:"15 Min ruhen lassen, dann mit zwei Gabeln zerrupfen."},
      {title:"Sliders bauen",desc:"Briochebrötchen toasten. Mit gezupftem Lamm, Coleslaw und Gurken belegen."}]},
  r5:{
    ingredients:["600g Lammschulter in großen Stücken","500ml Naturjoghurt","1 TL Kurkuma","1 TL Piment","2 Lorbeerblätter","Geröstete Mandeln und Pinienkerne","Langkornreis","Fladenbrot"],
    steps:[
      {title:"Lamm anbraten",desc:"Lammstücke im Ghee mit Zwiebel anbraten. Würzen, mit Wasser bedecken, 1 Stunde köcheln."},
      {title:"Joghurtsauce",desc:"Joghurt mit ½ Tasse Wasser verquirlen. Langsam unter ständigem Rühren erhitzen — niemals kochen lassen."},
      {title:"Kombinieren",desc:"Gegarte Lammstücke zur Joghurtsauce geben. 20 Min bei niedriger Hitze köcheln."},
      {title:"Reis kochen",desc:"Reis in der Lammbrühe kochen für maximalen Geschmack."},
      {title:"Anrichten",desc:"Fladenbrot auf einer großen Platte anrichten, dann Reis, dann Lamm, Sauce übergießen, Nüsse darüberstreuen."}]},
  r6:{
    ingredients:["500g Rindersirloin","400g Basmatireis","1 Zwiebel","½ Tasse Rosinen","½ Tasse geröstete Pinienkerne und Mandeln","2 TL Baharat","1 TL Kurkuma","Ghee","Rinderbrühe"],
    steps:[
      {title:"Rind würzen",desc:"Rind mit Baharat, Salz und Pfeffer einreiben. Im Ghee von allen Seiten anbraten."},
      {title:"Langsam braten",desc:"Rinderbrühe zugeben, abdecken und bei 170°C für 1,5–2 Stunden braten."},
      {title:"Gewürzreis",desc:"Zwiebel im Ghee anbraten. Reis, Kurkuma, Rosinen zugeben. 2 Min rösten. Mit Brühe aufgießen."},
      {title:"Rind aufschneiden",desc:"15 Min ruhen lassen. In dicke Scheiben schneiden."},
      {title:"Anrichten",desc:"Gewürzreis auf einer großen Platte anrichten. Rindfleischscheiben darauflegen. Nüsse streuen."}]},
  r7:{
    ingredients:["500g Lamm","1 große Zwiebel","4 Knoblauchzehen","2 cm Ingwer","4 EL Kaschmiri-Chilipulver","2 TL Korianderpulver","1 TL Kreuzkümmel","½ TL Fenchelsamen","2 Kardamomkapseln","1 Tasse Naturjoghurt","Ghee"],
    steps:[
      {title:"Ganze Gewürze",desc:"Ghee erhitzen. Kardamom und Fenchel 30 Sek anrösten bis sie duften."},
      {title:"Zwiebelbasis",desc:"Fein geschnittene Zwiebel zugeben. Bei niedriger Hitze 20 Min dunkelgolden braten."},
      {title:"Aromen",desc:"Ingwer-Knoblauch-Paste zugeben. 3 Min garen. Alle Trockenwürze zugeben. 2 Min garen."},
      {title:"Lamm",desc:"Lammstücke zugeben. Bei mittlerer bis hoher Hitze 8–10 Min von allen Seiten anbraten."},
      {title:"Köcheln",desc:"Joghurt nach und nach einrühren. ½ Tasse Wasser zugeben. Abgedeckt 45 Min köcheln bis das Lamm sehr zart ist."}]},
  r8:{
    ingredients:["400g Rinderhackfleisch","200g Tiefkühlerbsen","2 Zwiebeln, gewürfelt","3 Knoblauchzehen","2 cm Ingwer","2 Tomaten, gehackt","1 TL Kreuzkümmelsamen","2 TL Garam Masala","1 TL Kurkuma","1 TL Chilipulver","Frischer Koriander"],
    steps:[
      {title:"Kreuzkümmel",desc:"Öl erhitzen. Kreuzkümmelsamen zugeben und 30 Sek zischen lassen."},
      {title:"Zwiebeln",desc:"Zwiebelwürfel zugeben. 10 Min golden anbraten. Knoblauch und Ingwer 2 Min zugeben."},
      {title:"Tomaten",desc:"Gehackte Tomaten und alle Trockenwürze zugeben. 5 Min kochen bis die Tomaten zerfallen."},
      {title:"Hackfleisch",desc:"Rinderhackfleisch zugeben. Aufbrechen und bei hoher Hitze 8 Min braten bis braun und trocken."},
      {title:"Erbsen",desc:"Tiefkühlerbsen und 100ml Wasser zugeben. 5 Min köcheln. Mit frischem Koriander garnieren."}]},
  r9:{
    ingredients:["400g Rindersirloin, sehr dünn geschnitten","5 EL Sojasoße","3 EL brauner Zucker","2 EL Sesamöl","4 Knoblauchzehen, gerieben","2 cm Ingwer, gerieben","1 asiatische Birne, gerieben","Sesamsamen, Frühlingszwiebeln"],
    steps:[
      {title:"Dünn schneiden",desc:"Rind papierdünn schneiden — für 30 Min einfrieren macht das Schneiden leichter."},
      {title:"Marinade",desc:"Soja, Zucker, Sesamöl, Knoblauch, Ingwer und geriebene Birne mischen."},
      {title:"Marinieren",desc:"Rind gut einreiben. Mindestens 30 Min, bis zu 24 Stunden im Kühlschrank marinieren."},
      {title:"Bei hoher Hitze garen",desc:"In Portionen in einer sehr heißen Pfanne garen. Nicht überfüllen."},
      {title:"Servieren",desc:"Auf Dampfreis mit Kimchi, Frühlingszwiebeln und Sesamsamen servieren."}]},
  r10:{
    ingredients:["300g Lamm, dünn geschnitten","3 EL Hoisinsauce","2 EL Sojasoße","1 EL Austernsauce","1 TL Speisestärke","3 Knoblauchzehen","2 cm Ingwer","4 Frühlingszwiebeln","1 TL Sesamöl"],
    steps:[
      {title:"Velveting",desc:"Lammscheiben mit Speisestärke und einer Prise Salz vermengen."},
      {title:"Sauce",desc:"Hoisin, Soja, Austern- und Sesamöl in einer Schüssel mischen."},
      {title:"Anbraten",desc:"Lamm in sehr heißem Wok in einer Schicht 2 Min anbraten. Beiseitestellen."},
      {title:"Aromen",desc:"Knoblauch, Ingwer und das Weiße der Frühlingszwiebeln 1 Min anbraten."},
      {title:"Fertigstellen",desc:"Lamm zurücklegen. Sauce zugeben. 1 Min vermengen bis alles glänzend überzogen ist."}]},
  r11:{
    ingredients:["600g Lammhackfleisch oder Schulter","2 Karotten, gewürfelt","1 Zwiebel","2 EL Tomatenmark","200ml Lammbrühe","1 EL Worcestershiresauce","1 kg Kartoffeln für Püree","50g Butter","Rosmarin und Thymian"],
    steps:[
      {title:"Hackfleisch anbraten",desc:"Lammhackfleisch in Öl bei hoher Hitze anbraten. Großzügig würzen."},
      {title:"Gemüse",desc:"Zwiebel und Karotte zugeben. 8 Min garen. Tomatenmark und Kräuter einrühren."},
      {title:"Köcheln",desc:"Brühe und Worcestershiresauce zugeben. Abgedeckt 25 Min köcheln bis eingedickt."},
      {title:"Püree",desc:"Kartoffeln kochen und mit Butter und Sahne stampfen. Gut würzen."},
      {title:"Backen",desc:"Füllung in eine Auflaufform geben. Mit Püree abdecken. Bei 200°C 25 Min backen bis goldbraun."}]},
  r12:{
    ingredients:["300g Lamm, papierdünn geschnitten","300ml Dashi- oder Hühnerbrühe","4 EL Sojasoße","3 EL Mirin","2 EL Sake","1 EL Zucker","Tofu, Pilze, Nudeln, Frühlingszwiebeln","Wachsweiche Eier zum Servieren"],
    steps:[
      {title:"Brühe",desc:"Geschnittene Zwiebel in Dashi, Soja, Mirin, Sake und Zucker 10 Min köcheln."},
      {title:"Lamm",desc:"Lammscheiben zugeben. Nur 2–3 Min garen."},
      {title:"Abschmecken",desc:"Brühe probieren — sie soll süß-salzig sein. Soja oder Zucker anpassen."},
      {title:"Anrichten",desc:"Reis in Schüsseln füllen. Lamm und Zwiebeln mit reichlich Brühe aufschöpfen."},
      {title:"Garnieren",desc:"Ein wachsweiches Ei (6,5 Min), eingelegten Ingwer und Frühlingszwiebeln zugeben."}]},
  b1:{
    ingredients:["400g Ribeye-Steak (mind. 3 cm dick)","Grobkörniges Meersalz","Grob gemahlener schwarzer Pfeffer","3 EL Butter","4 Knoblauchzehen, zerdrückt","Frische Thymianzweige","Rinderschmalz oder hitzestabiles Öl"],
    steps:[
      {title:"Trocknen und würzen",desc:"Steak vollständig trocken tupfen. 45 Min vor dem Garen nur salzen. Kurz vor der Pfanne pfeffern."},
      {title:"Pfanne sehr heiß",desc:"Gusseisenpfanne 3 Min bei maximaler Hitze erhitzen — bis sie raucht."},
      {title:"Erste Bräunung",desc:"Einen Tropfen Rinderschmalz zugeben. Steak von sich weg einlegen. 2,5 Min nicht bewegen."},
      {title:"Buttern",desc:"Wenden. Sofort Butter, Knoblauch und Thymian zugeben. Pfanne neigen und 2 Min kontinuierlich übergießen."},
      {title:"Ruhen lassen",desc:"Auf einem Gitter 8 Min ruhen lassen. Gegen die Faser aufschneiden, mit Bratbutter übergießen."}]},
  b2:{
    ingredients:["600g Rinderhackfleisch (20% Fett)","8 Scheiben Schmelzkäse","4 Briochebrötchen","Fein geschnittener Salat","Gürkchenscheiben","Burgersauce: Mayo, Ketchup, Senf, Gurkenwasser, Paprika"],
    steps:[
      {title:"Bälle, keine Patties",desc:"Hack in 150g-Bälle teilen. NICHT komprimieren oder würzen."},
      {title:"Glühend heiße Platte",desc:"Schwere Eisenplatte oder Gusseisenpfanne maximal erhitzen. Leicht ölen."},
      {title:"SMASH",desc:"Ball auf die Platte legen. Sofort mit einem Pfannenwender flachdrücken. Salzen. 90 Sek garen bis die Ränder knusprig sind."},
      {title:"Wenden und käsen",desc:"Einmal wenden, sofort Käse drauflegen. 45 Sek garen. Herausnehmen."},
      {title:"Stapeln und servieren",desc:"Brötchen toasten. Sauce auf die untere Hälfte. Zwei Patties pro Burger stapeln. Sofort servieren."}]},
  b3:{
    ingredients:["400g dickes Ribeye mit Knochen","Grobes Salz","Schwarzer Pfeffer","Knoblauchpulver","Frischer Rosmarin zum Bestreichen","Butter"],
    steps:[
      {title:"Würzen",desc:"Ribeye von allen Seiten mit Salz, Pfeffer und Knoblauchpulver würzen. Idealerweise über Nacht unbedeckt kühlstellen."},
      {title:"Reverse-Sear-Start",desc:"Für dicke Steaks: bei 110°C 25 Min braten bis 45°C Kerntemperatur erreicht."},
      {title:"Grill heiß machen",desc:"Grill während der Ruhezeit des Steaks so heiß wie möglich erhitzen."},
      {title:"Starkes Anbraten",desc:"Auf dem glühenden Grill 2 Min pro Seite braten. Auch den Fettstreifen senkrecht anbraten."},
      {title:"Ruhen und servieren",desc:"10 Min ruhen lassen. Mit einem Stück Butter abschließen."}]},
  b4:{
    ingredients:["800g Rinderbrust","2 EL gemahlener Kaffee","2 EL Räucherpaprika","1 EL brauner Zucker","1 EL schwarzer Pfeffer","1 EL Salz","1 TL Knoblauchpulver","1 TL Zwiebelpulver"],
    steps:[
      {title:"Trockenreiben",desc:"Alle Trockenzutaten mischen. Großzügig überall auf der Rinderbrust einreiben. Über Nacht unbedeckt kühlstellen."},
      {title:"Langsam garen",desc:"Bei 120°C (indirekte Grillhitze oder niedriger Ofen) 3–3,5 Stunden bis 75°C Kerntemperatur garen."},
      {title:"Einwickeln",desc:"In Metzgerpapier fest einwickeln. Weitere 1 Stunde bis 92°C Kerntemperatur garen."},
      {title:"Ruhen lassen",desc:"Mindestens 1 Stunde eingewickelt ruhen lassen — absolut nicht überspringen."},
      {title:"Aufschneiden",desc:"Gegen die Faser in bleistiftdicke Scheiben schneiden. Mit Gurken und Weißbrot servieren."}]},
  b5:{
    ingredients:["400g Rindersirloin, dünn geschnitten","1 TL Kreuzkümmel","1 TL Koriander","1 TL Zimt","½ TL Kardamom","½ TL Kurkuma","3 EL Essig","3 EL Olivenöl","Knoblauch, Fladenbrot, Tomate, eingelegte Rübe, Tahini"],
    steps:[
      {title:"Marinade",desc:"Gewürze, Essig, Öl und Knoblauch mischen. Rindfleischscheiben einreiben. 2 Stunden marinieren."},
      {title:"Stapeln und braten",desc:"Marinierte Scheiben eng auf einem Spieß oder in einer Kastenform stapeln. Bei 220°C 25 Min braten."},
      {title:"Dünn aufschneiden",desc:"Dünne Scheiben vom äußeren Teil des gegarten Blocks abschneiden."},
      {title:"Anrösten",desc:"Scheiben in einer sehr heißen Pfanne 1 Min kurz anrösten."},
      {title:"Zusammenstellen",desc:"Fladenbrot erwärmen. Mit Tahini bestreichen. Rindfleisch, Tomaten und eingelegte Rübe belegen."}]},
  b6:{
    ingredients:["400g Rinderhackfleisch","1 Zwiebel, fein gewürfelt","2 Tomaten, gewürfelt","2 grüne Chilis","1 TL Kreuzkümmel","1 TL Koriander","½ TL Zimt","Frische Petersilie","4 Fladen- oder Pitabrote"],
    steps:[
      {title:"Füllung vorbereiten",desc:"Rohes Rinderhackfleisch mit allen Zutaten vermengen — das Fleisch nicht vorher garen."},
      {title:"Füllen",desc:"Pitabrot öffnen. Eine Hälfte mit der rohen Fleischmischung füllen. Die andere Hälfte fest andrücken."},
      {title:"Braten",desc:"In einer trockenen Pfanne bei mittlerer Hitze 6–7 Min pro Seite braten, dabei mit einem Pfannenwender pressen."},
      {title:"Prüfen",desc:"Das Brot soll knusprig und stellenweise geröstet sein. Das Fleisch innen muss durchgegart sein."},
      {title:"Servieren",desc:"In Stücke schneiden. Mit frischem Tomatensalat und Tahini servieren."}]},
  b7:{
    ingredients:["500g Rind, gewürfelt","2 Zwiebeln","4 Knoblauchzehen","2 cm Ingwer","3 TL Madras-Currypulver","1 TL Kurkuma","1 Dose gehackte Tomaten","1 EL Tamarindenpaste","Curryblätter","Kokosöl"],
    steps:[
      {title:"Curry-Basis",desc:"Zwiebelwürfel in Kokosöl 15 Min bei niedriger Hitze dunkelbraun anbraten. Curryblätter zugeben."},
      {title:"Gewürzpaste",desc:"Ingwer-Knoblauch-Paste und alle Trockenwürze zugeben. 3 Min braten bis das Öl sich trennt."},
      {title:"Rind",desc:"Rindfleischwürfel zugeben. Bei hoher Hitze 8 Min von allen Seiten anbraten."},
      {title:"Köcheln",desc:"Tomaten und Tamarinde zugeben. Abgedeckt bei niedriger Hitze 30–35 Min köcheln."},
      {title:"Fertigstellen",desc:"Ohne Deckel 5 Min einkochen. Mit Reis oder Paratha servieren."}]},
  b8:{
    ingredients:["500g Rinderhackfleisch","1 Zwiebel, gerieben","3 Knoblauchzehen","2 cm Ingwer, gerieben","1 TL Garam Masala","1 TL Kreuzkümmel","½ TL Chilipulver","Frischer Koriander und Minze","1 EL Kichererbsenmehl","Salz"],
    steps:[
      {title:"Mischen",desc:"Hackfleisch mit allen Zutaten vermengen. 2 Minuten kneten. 30 Min kühlstellen."},
      {title:"Aufspießen",desc:"Nasse Hände. In 8 Teile teilen. Um flache Metallspieße zu 15-cm-Zylindern formen."},
      {title:"Grillen",desc:"Bei hoher Hitze grillen, alle 2 Min wenden. Gesamtgarzeit 10–12 Min."},
      {title:"Rösten",desc:"Letzte 2 Min bei maximaler Hitze für Röstaromen."},
      {title:"Servieren",desc:"Mit Minzchutney, Zwiebeln in Zitronensaft und warmem Naan servieren."}]},
  b9:{
    ingredients:["300g Rindersirloin, papierdünn geschnitten","1 große Zwiebel, in Scheiben","300ml Dashi- oder Hühnerbrühe","4 EL Sojasoße","3 EL Mirin","2 EL Sake","1 EL Zucker","Gedämpfter japanischer Reis","Eingelegter Ingwer, wachsweiches Ei"],
    steps:[
      {title:"Zwiebeln köcheln",desc:"Zwiebelscheiben in Dashi, Soja, Mirin, Sake und Zucker 10 Min bis transparent köcheln."},
      {title:"Rind zugeben",desc:"Papierdünne Rindfleischscheiben zugeben. Nur 2–3 Min garen."},
      {title:"Abschmecken",desc:"Brühe probieren — sie soll süß-salzig sein. Anpassen nach Geschmack."},
      {title:"Anrichten",desc:"Reis in Schüsseln füllen. Rind und Zwiebeln mit reichlich Brühe aufschöpfen."},
      {title:"Garnieren",desc:"Ein wachsweiches Ei (6,5 Min), eingelegten Ingwer und Frühlingszwiebeln zugeben."}]},
  b10:{
    ingredients:["500g Rinderknochen oder Schmorbraten","200g Reisnudeln","1 Zwiebel, angeröstet","5 cm Ingwer, angeröstet","3 Sternanis","3 Nelken","1 Zimtstange","Fischsauce","Sojasprossen, Basilikum, Limette, Chili"],
    steps:[
      {title:"Aromen rösten",desc:"Zwiebel und Ingwer direkt über der Flamme oder unter dem Grill bis geschwärzt anrösten."},
      {title:"Gewürze rösten",desc:"Sternanis, Nelken und Zimt 1 Min in einer trockenen Pfanne rösten bis sie duften."},
      {title:"Brühe",desc:"Rinderknochen mit geröstetem Gemüse, Gewürzen und Fischsauce 1 Stunde köcheln. Ständig abschäumen."},
      {title:"Abseihen",desc:"Brühe abseihen — sie soll kristallklar sein. Mit Fischsauce und etwas Zucker abschmecken."},
      {title:"Servieren",desc:"Nudeln einweichen. In Schüsseln geben. Heiße Brühe übergießen. Rohes, dünn geschnittenes Rindfleisch dazulegen — es gart in der Brühe."}]},
  b11:{
    ingredients:["400g Rinderfilet","200g gemischte Pilze, fein gehackt","4 Scheiben Bresaola oder Schinken","1 Rolle Blätterteig","1 EL Dijonsenf","1 Eigelb","Salz und Pfeffer","Thymian"],
    steps:[
      {title:"Anbraten",desc:"Filet in einer sehr heißen Pfanne von allen Seiten anbraten — 1 Min pro Seite. Ruhen lassen und mit Dijon bestreichen."},
      {title:"Duxelles",desc:"Pilze mit Thymian bei hoher Hitze garen bis komplett trocken — ca. 15 Min."},
      {title:"Einrollen",desc:"Bresaola auf Frischhaltefolie ausbreiten. Pilze verteilen. Filet fest darin einrollen. 20 Min kühlen."},
      {title:"Blätterteig",desc:"Teig ausrollen. Filetrolle an den Rand legen. Fest einrollen. Enden versiegeln. Mit Eigelb bestreichen."},
      {title:"Backen",desc:"Bei 220°C 25–28 Min für medium-rare backen. 10 Min ruhen lassen vor dem Aufschneiden."}]},
  b12:{
    ingredients:["500g sehr feines Rinderhackfleisch","200g Bulgur, eingeweicht","1 Zwiebel","1 TL Piment","½ TL Zimt","½ TL Kreuzkümmel","Salz","Pinienkerne und Rosinen für die Füllung"],
    steps:[
      {title:"Äußere Schicht",desc:"Rind, eingeweichten Bulgur, Zwiebel und Gewürze im Mixer zu einer glatten Masse verarbeiten."},
      {title:"Füllung",desc:"Restliches Rinderhack mit Pinienkernen, Rosinen und Gewürzen anbraten."},
      {title:"Formen",desc:"Nasse Hände. Äußere Masse nehmen, aushöhlen, mit Fleischmischung füllen, als Torpedo schließen."},
      {title:"Frittieren",desc:"In heißem Öl 3–4 Min pro Seite frittieren bis dunkelgolden."},
      {title:"Servieren",desc:"Mit Naturjoghurt und frischer Minze servieren."}]},
  a1:{
    ingredients:["1 ganzes Hähnchen","400g Rindersirloin","Röstgemüse: Karotten, Pastinaken, Zwiebeln","Bratkartoffeln","Frischer Thymian und Rosmarin","Butter","Rinderbrühe für die Soße"],
    steps:[
      {title:"Planen",desc:"Zuerst das Rind beginnen — es braucht länger. Beide Fleischsorten 1 Stunde vorher salzen."},
      {title:"Hähnchen braten",desc:"Hohlraum mit Kräutern und Zitrone füllen. Mit Butter einreiben. Bei 200°C 1 Stunde 15 Min braten."},
      {title:"Rind braten",desc:"Sirloin in einer Pfanne anbraten. Bei 200°C, 20 Min pro 500g für medium-rare braten. 15 Min ruhen."},
      {title:"Gemüse",desc:"Kartoffeln 7 Min vorkochen. Im Rinderschmalz bei 220°C 40 Min goldknusprig braten."},
      {title:"Soße",desc:"Bratformen mit Rotwein und Rinderbrühe ablöschen. Einkochen und passieren. Abschmecken."}]},
  a2:{
    ingredients:["Hähnchenkeulen und -filets","Rindersirloin","Lammkoteletts","Olivenöl, Salz, Pfeffer","Zitrone","Frische Kräuter","Gegrilltes Brot und Salat"],
    steps:[
      {title:"Reihenfolge planen",desc:"Zuerst Lammkoteletts (15 Min), dann Rind (10 Min), dann Hähnchen (20 Min). Zeitversetzt starten."},
      {title:"Würzen",desc:"Einfach würzen — Olivenöl, Salz, Pfeffer. Die Qualität des Fleisches für sich sprechen lassen."},
      {title:"Hähnchen grillen",desc:"Keulen bei indirekter Hitze 20 Min grillen, letzte 5 Min direkt fertigstellen."},
      {title:"Rind und Lamm",desc:"Sirloin 3 Min pro Seite grillen. Koteletts 3 Min pro Seite grillen. Alles ruhen lassen."},
      {title:"Platte",desc:"Auf einem großen Brett mit gegrillten Zitronen, frischen Kräutern und einem großen Salat anrichten."}]},
  a3:{
    ingredients:["Ganze Hähnchenkeulen","Rindersirloin","Lammkoteletts","Rinderhackfleisch für Burger","BBQ-Gewürzmischung","Honigglasur","Burgerbrötchen und Beilagen"],
    steps:[
      {title:"Am Vortag vorbereiten",desc:"Hähnchenkeulen über Nacht marinieren. Burger-Patties formen und kühlen."},
      {title:"Zeitplan",desc:"Hähnchen 40 Min, Lammkoteletts 12 Min, Rind 8 Min, Burger 10 Min. Rückwärts rechnen."},
      {title:"Zwei-Zonen-Grill",desc:"Direkte und indirekte Zonen einrichten. Langsame Zone für Hähnchen, heiße Zone für Rind."},
      {title:"In Wellen garen",desc:"Hähnchen zuerst. Lamm und Rind in den letzten 15 Min. Burger zuletzt."},
      {title:"Servieren",desc:"Alle Saucen, Salate und Beilagen aufstellen. Gäste lassen sich selbst bedienen."}]},
  a4:{
    ingredients:["1 ganzes Hähnchen, zerteilt","1 kg Zwiebeln, dünn geschnitten","3 EL Sumach","1 TL Piment","½ TL Zimt","4 EL Olivenöl","Fladenbrot","Geröstete Pinienkerne und Mandeln"],
    steps:[
      {title:"Zwiebeln karamellisieren",desc:"Zwiebelscheiben in Olivenöl bei mittlerer bis niedriger Hitze 40 Min garen bis sehr weich und golden."},
      {title:"Hähnchen würzen",desc:"Hähnchenteile mit Sumach, Piment, Zimt, Salz und Olivenöl einreiben."},
      {title:"Kombinieren",desc:"Die Hälfte der Zwiebeln mit dem Hähnchen mischen. Bei 200°C 35–40 Min braten."},
      {title:"Brotschicht",desc:"Fladenbrot auf einem Servierteller ausbreiten. Mit den restlichen karamellisierten Zwiebeln bedecken."},
      {title:"Servieren",desc:"Gebratenes Hähnchen auf dem Zwiebelbrot anrichten. Geröstete Nüsse darüberstreuen. Mit Olivenöl beträufeln."}]},
  a5:{
    ingredients:["400g Hähnchenteile","300g Lammkoteletts","500g Basmatireis","3 große Zwiebeln","Ghee","Safran in warmem Milch","Biryani-Gewürzmischung","Frische Minze und Koriander"],
    steps:[
      {title:"Fleisch separat garen",desc:"Hähnchen 20 Min in einer Joghurt-Gewürzsauce schmoren. Lamm separat 35 Min schmoren."},
      {title:"Zwiebeln rösten",desc:"Dünn geschnittene Zwiebeln im Ghee bis dunkelgolden und knusprig rösten. Dauert 25 Min."},
      {title:"Reis halbgar kochen",desc:"Gesalzenes Wasser mit Kardamom aufkochen. Reis genau 6 Min kochen — abgießen wenn noch leicht bissfest."},
      {title:"Schichten",desc:"Im Topf: Hähnchen, dann Lamm, dann Reis, dann Safranmilch, dann Zwiebeln, Kräuter."},
      {title:"Dum garen",desc:"Fest versiegeln. Bei sehr niedriger Hitze 25 Min garen."}]},
  a6:{
    ingredients:["Rindersirloin, papierdünn geschnitten","Hähnchenfilets, dünn geschnitten","Lamm, dünn geschnitten","Würzige Brühe: Brühe, Ingwer, Knoblauch, Chili, Soja","Reisnudeln, Tofu, Pilze","Dipsaucen: Sesampaste, Hoisin, Chiliöl"],
    steps:[
      {title:"Brühe vorbereiten",desc:"Brühe mit Ingwer, Knoblauch, Chilibohnenpaste, Soja und Sesamöl köcheln. Abschmecken."},
      {title:"Fleisch dünn schneiden",desc:"Fleisch 30 Min einfrieren dann papierdünn schneiden. Auf Platten rund um den Tisch anrichten."},
      {title:"Tisch eindecken",desc:"Fonduetopf oder Tischkocher in der Mitte aufstellen. Alle Zutaten darum anrichten."},
      {title:"Saucen bereiten",desc:"Individuelle Schüsseln: Sesampaste mit Brühe verdünnt, Hoisin, Chiliöl. Jeder passt selbst an."},
      {title:"Garen und essen",desc:"Jeder gart seine Stücke durch kurzes Eintauchen in die heiße Brühe für 30–60 Sekunden."}]},
  a7:{
    ingredients:["Rindersirloin, dünn geschnitten","Hähnchenfilets","Bulgogi-Marinade: Soja, Birne, Zucker, Sesam","Hähnchenmarinade: Gochujang, Knoblauch, Zucker, Öl","Salatblätter, Reis, Kimchi","Dipsaucen"],
    steps:[
      {title:"Marinaden",desc:"Beide Marinaden vorbereiten. Rind und Hähnchen separat mindestens 2 Stunden marinieren."},
      {title:"Aufbauen",desc:"Eine Grillpfanne oder Tischgrill erhitzen. Salat, Reis, Kimchi und alle Beilagen vorbereiten."},
      {title:"Rind grillen",desc:"Bulgogi-Rind in Portionen bei hoher Hitze 2 Min pro Seite grillen."},
      {title:"Hähnchen grillen",desc:"Gochujang-Hähnchen 4 Min pro Seite grillen bis geröstet und glänzend."},
      {title:"Ssam-Wraps",desc:"Gegrilltes Fleisch in Salatblätter mit Reis, Kimchi, geschnittenem Knoblauch und Ssamjang-Paste einwickeln."}]},
  a8:{
    ingredients:["Hähnchenkeulen und -filets","Lammkoteletts","200ml Naturjoghurt","2 TL Tandoori-Masala","1 TL Kurkuma","1 TL Paprika","Ingwer-Knoblauch-Paste","Zitronensaft","Minzchutney, Zwiebelscheiben"],
    steps:[
      {title:"Einschneiden",desc:"Hähnchen und Lamm tief einschneiden damit die Marinade bis auf den Knochen eindringt."},
      {title:"Marinade",desc:"Joghurt, alle Gewürze, Ingwer-Knoblauch-Paste und Zitronensaft mischen. Fleisch vollständig einreiben."},
      {title:"Marinieren",desc:"Mindestens 4 Stunden kühlen — über Nacht verwandelt das Fleisch."},
      {title:"Hohe Hitze",desc:"Grill oder Ofen auf Maximaltemperatur (250°C+). Hähnchen 25 Min, Lammkoteletts 10 Min garen."},
      {title:"Servieren",desc:"Auf einer Platte mit Zwiebelscheiben, Zitronenvierteln und frischem Minzchutney anrichten."}]},
  a9:{
    ingredients:["1 ganzes Hähnchen, aufgeklappt","Rindersirloin","Lammkoteletts","Piri-Piri-Sauce: Chilis, Zitrone, Knoblauch, Olivenöl","Frischer Koriander","Gegrilltes Brot"],
    steps:[
      {title:"Piri-Piri-Sauce",desc:"Rote Chilis, Knoblauch, Zitronensaft, Olivenöl und Salz mixen. Probieren — soll scharf sein."},
      {title:"Hähnchen marinieren",desc:"Aufgeklapptes Hähnchen mit Piri-Piri einreiben. Mindestens 2 Stunden marinieren."},
      {title:"Hähnchen grillen",desc:"Bei indirekter Hitze 35 Min grillen, 5 Min bei direkter Hitze fertigstellen. Röstaromen sind wichtig."},
      {title:"Rind und Lamm grillen",desc:"Einfach würzen. Sirloin 3 Min pro Seite, Koteletts 3 Min pro Seite grillen."},
      {title:"Platte",desc:"Alles aufschneiden und auf einem großen Brett anrichten. Mit Piri-Piri beträufeln, Koriander darüberstreuen."}]},
  a10:{
    ingredients:["Hähnchenfilets für Shawarma","Lammhackfleisch für Kofta","Rind für Fatteh","Hummus, Tabbouleh, Fattoush","Fladenbrot","Knoblauchsauce, Tahini, Pickles"],
    steps:[
      {title:"Hähnchen vorbereiten",desc:"Hähnchen in Shawarma-Gewürzen marinieren. Grillen und aufschneiden."},
      {title:"Kofta",desc:"Lammhackfleisch mit Zwiebel, Petersilie, Kreuzkümmel, Zimt mischen. Auf Spieße formen. Grillen."},
      {title:"Fatteh",desc:"Gewürztes Rinderhackfleisch anbraten. Geröstetes Brot, Fleisch, Joghurt und Kichererbsen schichten."},
      {title:"Anrichten",desc:"Alles auf kleinen Schüsseln über den ganzen Tisch verteilen."},
      {title:"Genießen",desc:"Mezze ist gemeinschaftlich — alle nehmen sich was und teilen. Mit Fladenbrot servieren."}]},
},
lb:{
  f1:{steps:[{title:"Preparéieren"},{title:"Seasonnéieren"},{title:"Baken"},{title:"Raschten"},{title:"Servéieren"}]},
  f2:{steps:[{title:"Flaachdrécken"},{title:"Würzen"},{title:"Brutzelen"},{title:"Botter dergéissen"},{title:"Raschten"}]},
  f3:{steps:[{title:"Spatchcock"},{title:"Marinéieren"},{title:"Grill virbereeden"},{title:"Grillen"},{title:"Fäerdegstellen"}]},
  f4:{steps:[{title:"Aschneiden"},{title:"Marinéieren"},{title:"Lues grillen"},{title:"Glazéieren"},{title:"Servéieren"}]},
  f5:{steps:[{title:"Gewierzmischung"},{title:"Marinéieren"},{title:"Kachen"},{title:"Schneiden"},{title:"Zesummestellen"}]},
  f6:{steps:[{title:"Marinade"},{title:"Marinéieren"},{title:"Spiessere"},{title:"Grillen"},{title:"Servéieren"}]},
  f7:{steps:[{title:"Marinéieren"},{title:"Brutzelen"},{title:"Sauce"},{title:"Lues kachen"},{title:"Fäerdegstellen"}]},
  f8:{steps:[{title:"Zoepelen fritten"},{title:"Poulet kachen"},{title:"Rees hallef kachen"},{title:"Schichten"},{title:"Dum kachen"}]},
  f9:{steps:[{title:"Sauce"},{title:"Brutzelen"},{title:"Glazéieren"},{title:"Reduzéieren"},{title:"Servéieren"}]},
  f10:{steps:[{title:"Preparéieren"},{title:"Aromen"},{title:"Poulet kachen"},{title:"Sauce"},{title:"Basilikum"}]},
  f11:{steps:[{title:"Marinade"},{title:"Marinéieren"},{title:"Grillen"},{title:"Raschten"},{title:"Servéieren"}]},
  f12:{steps:[{title:"Marinéieren"},{title:"Brutzelen"},{title:"Zoepelbasis"},{title:"Schmoren"},{title:"Servéieren"}]},
  r1:{steps:[{title:"Temperéieren"},{title:"Marinéieren"},{title:"Virwieremen"},{title:"Grillen"},{title:"Raschten"}]},
  r2:{steps:[{title:"Mënschen"},{title:"Raschten"},{title:"Formen"},{title:"Grillen"},{title:"Servéieren"}]},
  r3:{steps:[{title:"Chimichurri"},{title:"Würzen"},{title:"Grillen"},{title:"Raschten"},{title:"Servéieren"}]},
  r4:{steps:[{title:"Dry Rub"},{title:"Lues kachen"},{title:"Kruste bilden"},{title:"Rappen"},{title:"Sliders bauen"}]},
  r5:{steps:[{title:"Lamm brunen"},{title:"Joghurt-Sauce"},{title:"Kombinéieren"},{title:"Rees kachen"},{title:"Servéieren"}]},
  r6:{steps:[{title:"Fleesch würzen"},{title:"Lues baken"},{title:"Gewierzte Rees"},{title:"Schneiden"},{title:"Uriichten"}]},
  r7:{steps:[{title:"Ganz Gewierzer"},{title:"Zoepelbasis"},{title:"Aromen"},{title:"Lamm"},{title:"Lues kachen"}]},
  r8:{steps:[{title:"Kumin"},{title:"Zoepelen"},{title:"Tomaten"},{title:"Hackfleesch"},{title:"Ierbsen"}]},
  r9:{steps:[{title:"Dënn schneiden"},{title:"Marinade"},{title:"Marinéieren"},{title:"Kachen"},{title:"Servéieren"}]},
  r10:{steps:[{title:"Velveting"},{title:"Sauce"},{title:"Brutzelen"},{title:"Aromen"},{title:"Fäerdegstellen"}]},
  r11:{steps:[{title:"Brunen"},{title:"Geméis"},{title:"Lues kachen"},{title:"Purée"},{title:"Baken"}]},
  r12:{steps:[{title:"Brüh"},{title:"Lamm"},{title:"Schmaachen"},{title:"Uriichten"},{title:"Garnéieren"}]},
  b1:{steps:[{title:"Drécken a würzen"},{title:"Pfann ganz waarm"},{title:"Éischt Bruzzelung"},{title:"Botter dergéissen"},{title:"Raschten"}]},
  b2:{steps:[{title:"Bäll, keng Patties"},{title:"Glühend waarm"},{title:"SCHMÉCKEN"},{title:"Wenden a Kéis"},{title:"Stapelen"}]},
  b3:{steps:[{title:"Würzen"},{title:"Reverse Sear"},{title:"Grill waarm"},{title:"Staark brutzelen"},{title:"Raschten"}]},
  b4:{steps:[{title:"Dry Rub"},{title:"Lues kachen"},{title:"Awickelen"},{title:"Raschten"},{title:"Schneiden"}]},
  b5:{steps:[{title:"Marinade"},{title:"Stapelen a baken"},{title:"Dënn schneiden"},{title:"Verbrenne"},{title:"Zesummestellen"}]},
  b6:{steps:[{title:"Fëllung preparéieren"},{title:"Fëllen"},{title:"Brutzelen"},{title:"Iwwerpréiwen"},{title:"Servéieren"}]},
  b7:{steps:[{title:"Curry-Basis"},{title:"Gewierz-Paste"},{title:"Fleesch"},{title:"Lues kachen"},{title:"Fäerdegstellen"}]},
  b8:{steps:[{title:"Mënschen"},{title:"Spiessere"},{title:"Grillen"},{title:"Verbrenne"},{title:"Servéieren"}]},
  b9:{steps:[{title:"Zoepelen kachen"},{title:"Fleesch derbäi"},{title:"Schmaachen"},{title:"Uriichten"},{title:"Garnéieren"}]},
  b10:{steps:[{title:"Aromen brunen"},{title:"Gewierzer réischteren"},{title:"Brüh"},{title:"Filteren"},{title:"Servéieren"}]},
  b11:{steps:[{title:"Brutzelen"},{title:"Duxelles"},{title:"Awickelen"},{title:"Blätterteig"},{title:"Baken"}]},
  b12:{steps:[{title:"Ieschteg Schicht"},{title:"Fëllung"},{title:"Formen"},{title:"Fritten"},{title:"Servéieren"}]},
  a1:{steps:[{title:"Plangen"},{title:"Poulet baken"},{title:"Fleesch baken"},{title:"Geméis"},{title:"Sauce"}]},
  a2:{steps:[{title:"Sequenz plangen"},{title:"Würzen"},{title:"Poulet grillen"},{title:"Fleesch a Lamm"},{title:"Teller"}]},
  a3:{steps:[{title:"Dag virdrun"},{title:"Zäitplang"},{title:"Zwee-Zonen Grill"},{title:"A Wellen kachen"},{title:"Servéieren"}]},
  a4:{steps:[{title:"Zoepelen karamelliséieren"},{title:"Poulet würzen"},{title:"Kombinéieren"},{title:"Broutschicht"},{title:"Servéieren"}]},
  a5:{steps:[{title:"Fleesch getrennt kachen"},{title:"Zoepelen fritten"},{title:"Rees hallef kachen"},{title:"Schichten"},{title:"Dum kachen"}]},
  a6:{steps:[{title:"Brüh preparéieren"},{title:"Fleesch dënn schneiden"},{title:"Dësch opstellen"},{title:"Sausse"},{title:"Kachen a iessen"}]},
  a7:{steps:[{title:"Marinaden"},{title:"Opstellen"},{title:"Fleesch grillen"},{title:"Poulet grillen"},{title:"Ssam Wraps"}]},
  a8:{steps:[{title:"Aschneiden"},{title:"Marinade"},{title:"Marinéieren"},{title:"Héich Hëtzt"},{title:"Servéieren"}]},
  a9:{steps:[{title:"Piri-Piri Sauce"},{title:"Poulet marinéieren"},{title:"Poulet grillen"},{title:"Fleesch a Lamm grillen"},{title:"Teller"}]},
  a10:{steps:[{title:"Poulet preparéieren"},{title:"Kofta"},{title:"Fatteh"},{title:"Uriichten"},{title:"Deelen"}]},
},
pt:{},
ar:{},
};


/* injected — replaces pt and ar in RECIPE_STEPS_T with full translations */
const PT_STEPS = {
  f1:{
    ingredients:["1 frango inteiro (1,2–1,5 kg)","3 c. sopa de azeite","1 limão cortado ao meio","4 dentes de alho esmagados","Tomilho e alecrim frescos","Sal e pimenta preta"],
    steps:[
      {title:"Preparar",desc:"Pré-aquecer o forno a 200°C. Secar o frango com papel de cozinha — pele seca = pele estaladiça."},
      {title:"Temperar",desc:"Esfregar por todo o lado com azeite, sal e pimenta generosos. Rechear a cavidade com limão, alho e ervas."},
      {title:"Assar",desc:"Colocar com o peito virado para cima num tabuleiro. Assar 1h10 até o sumo correr limpo ao furar a coxa."},
      {title:"Repousar",desc:"Cobrir levemente com folha de alumínio. Repousar 10 minutos antes de trinchar."},
      {title:"Servir",desc:"Trinchar e servir com os sucos do assado por cima. Perfeito com batatas assadas."}]},
  f2:{
    ingredients:["300g de peito de frango","2 c. sopa de manteiga","2 dentes de alho em lâminas","Raminhos de tomilho fresco","Sal e pimenta","Sumo de limão"],
    steps:[
      {title:"Achatar",desc:"Colocar os filetes entre película aderente e bater levemente para nivelar a espessura."},
      {title:"Temperar",desc:"Temperar generosamente dos dois lados com sal e pimenta mesmo antes de cozinhar."},
      {title:"Selar",desc:"Aquecer a frigideira em fogo alto. Adicionar azeite. Selar os filetes 4 min sem mexer."},
      {title:"Manteiga",desc:"Virar, adicionar manteiga, alho e tomilho. Inclinar a frigideira e regar continuamente durante 3 min."},
      {title:"Repousar",desc:"Repousar 3 min fora do lume. Terminar com um fio de sumo de limão."}]},
  f3:{
    ingredients:["1 frango inteiro","3 c. sopa de páprica fumada","2 c. sopa de azeite","1 c. sopa de alho em pó","1 c. sopa de cebola em pó","1 c. chá de caiena","Sal e pimenta"],
    steps:[
      {title:"Spatchcock",desc:"Usar tesouras para cortar dos dois lados da espinha dorsal e removê-la. Pressionar o frango para achatar."},
      {title:"Marinar",desc:"Misturar páprica, alho em pó, cebola em pó, caiena, azeite e sal. Esfregar por todo o lado. Marinar 30 min."},
      {title:"Preparar a grelha",desc:"Configurar a grelha com uma zona de calor direto e outra indireta."},
      {title:"Grelhar",desc:"Começar com a pele para baixo na zona quente 5 min. Mover para a zona indireta, cozinhar 30–35 min."},
      {title:"Finalizar",desc:"Voltar ao calor direto 2 min. Repousar 10 min."}]},
  f4:{
    ingredients:["8 pernas de frango","4 c. sopa de mel","3 c. sopa de molho de soja","2 c. sopa de vinagre de maçã","2 c. sopa de ketchup","1 c. sopa de páprica fumada","Alho em pó, sal"],
    steps:[
      {title:"Cortar",desc:"Fazer cortes em cada perna 2–3 vezes com uma faca para a marinada penetrar fundo."},
      {title:"Marinar",desc:"Misturar mel, soja, vinagre, ketchup, páprica e alho. Cobrir as pernas. Marinar 2 horas."},
      {title:"Grelhar lentamente",desc:"Cozinhar em lume médio-baixo 30 min, virando a cada 10 min."},
      {title:"Glacear",desc:"Pincelar com marinada extra nos últimos 10 min. Aumentar o calor para caramelizar."},
      {title:"Servir",desc:"Repousar 5 min. Servir com coleslaw e pão grelhado."}]},
  f5:{
    ingredients:["500g de peito de frango","1 c. chá de cominhos","1 c. chá de coentros","1 c. chá de curcuma","1 c. chá de canela","½ c. chá de cardamomo","3 c. sopa de azeite","3 dentes de alho picados","Sumo de 1 limão","Iogurte, pão pita, tomate, cebola para servir"],
    steps:[
      {title:"Mistura de especiarias",desc:"Combinar todas as especiarias com azeite, alho e sumo de limão numa pasta."},
      {title:"Marinar",desc:"Cobrir o frango com a pasta. Deixar pelo menos 30 min — de um dia para o outro é melhor."},
      {title:"Cozinhar",desc:"Grelhar ou fritar em fogo médio-alto 5–6 min de cada lado até ligeiramente carbonizado."},
      {title:"Fatiar",desc:"Repousar 3 min depois fatiar em tiras finas para máxima superfície."},
      {title:"Montar",desc:"Aquecer o pão pita, barrar com iogurte de alho, cobrir com frango, tomate e cebola."}]},
  f6:{
    ingredients:["500g de peito de frango em cubos","4 c. sopa de iogurte natural","3 c. sopa de concentrado de tomate","3 dentes de alho","Sumo de 1 limão","1 c. chá de páprica","1 c. chá de pimento da Jamaica","½ c. chá de pimenta branca","Azeite"],
    steps:[
      {title:"Marinada",desc:"Misturar iogurte, concentrado de tomate, alho, limão, especiarias e azeite até obter uma marinada lisa."},
      {title:"Marinar",desc:"Adicionar os cubos de frango, misturar bem, cobrir e refrigerar pelo menos 2 horas."},
      {title:"Espeto",desc:"Enfiar em espetos metálicos deixando pequenos espaços para o calor circular."},
      {title:"Grelhar",desc:"Grelhar em fogo médio-alto, virando a cada 3 min. Tempo total de cozedura 12–15 min."},
      {title:"Servir",desc:"Servir imediatamente com molho de alho toum, vegetais em pickle e pão pita."}]},
  f7:{
    ingredients:["500g de peito de frango em cubos","200ml de polpa de tomate","150ml de nata","1 cebola picada","3 dentes de alho","2 cm de gengibre ralado","2 c. chá de garam masala","1 c. chá de cominhos","1 c. chá de curcuma","1 c. chá de páprica","Iogurte para marinar","Coentros frescos"],
    steps:[
      {title:"Marinar",desc:"Misturar o frango com iogurte, 1 c. chá de garam masala, páprica e sal. Marinar 30 min."},
      {title:"Carbonizar",desc:"Grelhar ou fritar o frango em fogo alto até ligeiramente carbonizado. Reservar."},
      {title:"Molho",desc:"Refogar a cebola 8 min até dourar. Adicionar alho e gengibre 2 min. Adicionar as especiarias secas, cozinhar 1 min."},
      {title:"Cozinhar",desc:"Adicionar a polpa de tomate, cozinhar 10 min em fogo baixo. Adicionar nata e frango. Cozinhar 5 min."},
      {title:"Finalizar",desc:"Provar, rectificar o sal. Terminar com manteiga. Guarnecer com coentros. Servir com arroz e naan."}]},
  f8:{
    ingredients:["800g de pedaços de frango","400g de arroz basmati","2 cebolas grandes em fatias","4 c. sopa de ghee","1 c. chá de sementes de cominhos","3 cápsulas de cardamomo","2 folhas de louro","1 c. chá de curcuma","2 c. chá de masala biryani","Açafrão em leite quente","Hortelã e coentros frescos"],
    steps:[
      {title:"Fritar a cebola",desc:"Fritar as fatias de cebola em ghee em fogo médio-baixo 25 min até dourar bem e ficarem crocantes."},
      {title:"Cozinhar o frango",desc:"No ghee restante adicionar especiarias inteiras, depois o frango. Cozinhar 10 min. Adicionar masala biryani e iogurte. Cozinhar 15 min."},
      {title:"Arroz meio cozido",desc:"Ferver água salgada com louro. Adicionar arroz lavado, cozinhar exatamente 6 min. Escorrer."},
      {title:"Camadas",desc:"Num tacho: camada de frango, depois arroz, depois cebola crocante, hortelã, coentros. Regar com leite de açafrão."},
      {title:"Dum",desc:"Selar o tacho hermeticamente com folha de alumínio e tampa. Cozinhar em fogo muito baixo 25 min."}]},
  f9:{
    ingredients:["300g de peito de frango","4 c. sopa de molho de soja","3 c. sopa de mirin","2 c. sopa de saké","1 c. sopa de açúcar","1 c. chá de óleo de sésamo","Sementes de sésamo","Cebolinho para guarnecer"],
    steps:[
      {title:"Molho",desc:"Combinar soja, mirin, saké e açúcar. Mexer até dissolver o açúcar."},
      {title:"Selar",desc:"Fazer cortes na pele do frango. Selar em frigideira levemente untada, com a pele para baixo, 5 min até dourar."},
      {title:"Glacear",desc:"Virar, adicionar o molho. Cozinhar 4–5 min, regando repetidamente enquanto reduz."},
      {title:"Reduzir",desc:"Deixar o molho engrossar até formar um glacê brilhante."},
      {title:"Servir",desc:"Fatiar e servir sobre arroz cozido. Terminar com sementes de sésamo e cebolinho."}]},
  f10:{
    ingredients:["300g de peito de frango picado fino","3 dentes de alho","3 malaguetas bird's eye","2 c. sopa de molho de ostras","1 c. sopa de molho de peixe","1 c. chá de molho de soja","1 c. chá de açúcar","Grande punhado de manjericão tailandês","Ovos estrelados para servir"],
    steps:[
      {title:"Preparar",desc:"Pisar o alho e as malaguetas num almofariz — textura grossa é melhor do que lisa."},
      {title:"Aromatizar",desc:"Fritar a pasta de alho-malagueta em óleo muito quente 30 seg até perfumar."},
      {title:"Cozinhar o frango",desc:"Adicionar o frango picado. Saltear em fogo alto 4–5 min desfazendo os pedaços."},
      {title:"Molho",desc:"Adicionar molho de ostras, molho de peixe, soja e açúcar. Misturar tudo 1 min."},
      {title:"Manjericão",desc:"Retirar do lume. Adicionar as folhas de manjericão e envolver — o calor residual murcha-as perfeitamente. Servir sobre arroz com ovo estrelado."}]},
  f11:{
    ingredients:["4 filetes de frango","Sumo de 2 limões","3 c. sopa de azeite","1 c. sopa de orégãos frescos","1 c. sopa de tomilho fresco","3 dentes de alho picados","Sal e pimenta"],
    steps:[
      {title:"Marinada",desc:"Misturar sumo de limão, azeite, alho e ervas. Temperar com sal e pimenta."},
      {title:"Marinar",desc:"Cobrir o frango e marinar pelo menos 30 min, até 4 horas."},
      {title:"Grelhar",desc:"Grelhar em fogo médio-alto 6–7 min de cada lado."},
      {title:"Repousar",desc:"Repousar 5 min fora da grelha."},
      {title:"Servir",desc:"Servir com metades de limão grelhadas e salada verde."}]},
  f12:{
    ingredients:["1 frango inteiro cortado","1 limão em conserva em quartos","100g de azeitonas verdes","1 cebola em fatias","3 dentes de alho","1 c. chá de gengibre","1 c. chá de cominhos","1 c. chá de coentros","½ c. chá de canela","Açafrão em água quente","Coentros frescos"],
    steps:[
      {title:"Marinar",desc:"Misturar especiarias com alho e azeite. Cobrir o frango e marinar 2 horas."},
      {title:"Selar",desc:"Dourar os pedaços de frango numa frigideira ou tagine. Reservar."},
      {title:"Base de cebola",desc:"Refogar a cebola 8 min na mesma frigideira. Adicionar gengibre e alho 2 min."},
      {title:"Estufar",desc:"Colocar o frango novamente. Adicionar água de açafrão, limão em conserva e azeitonas. Cobrir e cozinhar em fogo baixo 40 min."},
      {title:"Servir",desc:"Guarnecer com coentros frescos. Servir com cuscuz ou pão pita."}]},
  r1:{
    ingredients:["4 costeletas de borrego","3 c. sopa de azeite","3 dentes de alho picados","Alecrim fresco","Tomilho fresco","Sal e pimenta preta","Limão para servir"],
    steps:[
      {title:"Temperar",desc:"Retirar as costeletas do frigorífico 30 min antes de cozinhar. Carne fria = cozedura desigual."},
      {title:"Marinar",desc:"Cobrir as costeletas com azeite, alho, alecrim, tomilho, sal e pimenta."},
      {title:"Pré-aquecer",desc:"Aquecer a grelha ou frigideira de ferro fundido em fogo muito alto."},
      {title:"Grelhar",desc:"Grelhar 3 min de cada lado para mal passado. Pressionar o osso 1 min para derreter a gordura."},
      {title:"Repousar",desc:"Repousar 5 min num prato quente. Espremer sumo de limão fresco por cima."}]},
  r2:{
    ingredients:["300g de carne de vaca picada","200g de borrego picado","1 cebola ralada","3 dentes de alho picados","2 c. chá de cominhos","1 c. chá de coentros","½ c. chá de canela","½ c. chá de pimento da Jamaica","Salsa e hortelã frescos","Sal e pimenta"],
    steps:[
      {title:"Misturar",desc:"Combinar todos os ingredientes. Amassar como pão durante 2 min."},
      {title:"Repousar",desc:"Refrigerar a mistura 30 min. A gordura fria ajuda os koftas a manter a forma."},
      {title:"Moldar",desc:"Mãos molhadas. Moldar em cilindros de 12 cm à volta dos espetos, pressionando bem."},
      {title:"Grelhar",desc:"Grelhar em fogo alto, virando a cada 2–3 min. Tempo total 10–12 min."},
      {title:"Servir",desc:"Servir com pão pita, tomates grelhados e molho de iogurte."}]},
  r3:{
    ingredients:["400g de lombo de vaca","Sal grosso e pimenta preta","Molho de salsa","4 dentes de alho","1 chalota","3 c. sopa de vinagre de vinho tinto","6 c. sopa de azeite","1 c. chá de malagueta em flocos"],
    steps:[
      {title:"Chimichurri",desc:"Picar finamente a salsa, alho e chalota. Misturar com vinagre, azeite, malagueta e sal. Preparar primeiro — precisa de tempo para o sabor desenvolver."},
      {title:"Temperar",desc:"Temperar o lombo generosamente com sal grosso e pimenta."},
      {title:"Grelhar",desc:"Grelhar em fogo muito alto 3–4 min de cada lado para mal passado."},
      {title:"Repousar",desc:"Repousar numa tábua 5 min."},
      {title:"Servir",desc:"Fatiar contra as fibras. Servir com chimichurri generoso."}]},
  r4:{
    ingredients:["600g de pá de borrego","2 c. sopa de páprica fumada","1 c. sopa de cominhos","1 c. sopa de açúcar mascavado","1 c. chá de alho em pó","Sal e pimenta","Pãezinhos brioche, coleslaw, pickles"],
    steps:[
      {title:"Tempero seco",desc:"Misturar todas as especiarias e açúcar. Esfregar por todo o borrego. Idealmente refrigerar de um dia para o outro."},
      {title:"Cozinhar lentamente",desc:"Assar a 150°C coberto com folha de alumínio durante 3 horas. Temperatura alvo: 85–90°C no interior."},
      {title:"Dourar",desc:"Retirar o papel de alumínio, aumentar para 220°C durante 15 min para formar crosta."},
      {title:"Desfiar",desc:"Repousar 15 min depois desfiar com dois garfos."},
      {title:"Montar",desc:"Torrar os pãezinhos brioche. Cobrir com borrego desfiado, coleslaw e pickles."}]},
  r5:{
    ingredients:["600g de pá de borrego em pedaços","500ml de iogurte natural","1 c. chá de curcuma","1 c. chá de pimento da Jamaica","2 folhas de louro","Amêndoas e pinhões torrados","Arroz de grão longo","Pão pita"],
    steps:[
      {title:"Dourar o borrego",desc:"Dourar o borrego em ghee com cebola. Temperar. Cobrir com água. Cozinhar 1 hora."},
      {title:"Molho de iogurte",desc:"Bater o iogurte com ½ chávena de água. Aquecer lentamente mexendo sempre — nunca deixar ferver."},
      {title:"Combinar",desc:"Adicionar o borrego cozido ao molho de iogurte. Cozinhar em fogo baixo 20 min, mexendo regularmente."},
      {title:"Cozinhar arroz",desc:"Cozinhar o arroz no caldo de borrego para sabor máximo."},
      {title:"Servir",desc:"Colocar o pão num prato grande, depois o arroz, depois o borrego, verter o molho, cobrir com frutos secos torrados."}]},
  r6:{
    ingredients:["500g de lombo de vaca","400g de arroz basmati","1 cebola","½ chávena de passas","½ chávena de pinhões e amêndoas torradas","2 c. chá de baharat","1 c. chá de curcuma","Ghee","Caldo de vaca"],
    steps:[
      {title:"Temperar a vaca",desc:"Esfregar a vaca com baharat, sal e pimenta. Dourar em ghee de todos os lados."},
      {title:"Assar lentamente",desc:"Adicionar caldo, cobrir e assar a 170°C durante 1h30 a 2 horas."},
      {title:"Arroz temperado",desc:"Refogar cebola em ghee. Adicionar arroz, curcuma, passas. Torrar 2 min. Adicionar caldo e cozinhar."},
      {title:"Fatiar",desc:"Repousar a vaca 15 min. Cortar em fatias grossas."},
      {title:"Servir",desc:"Dispor o arroz num prato grande. Colocar as fatias de vaca. Espalhar frutos secos. Regar com os sucos."}]},
  r7:{
    ingredients:["500g de borrego","1 cebola grande","4 dentes de alho","2 cm de gengibre","4 c. sopa de malagueta da Caxemira","2 c. chá de coentros em pó","1 c. chá de cominhos","½ c. chá de sementes de funcho","2 cardamomos","1 chávena de iogurte natural","Ghee"],
    steps:[
      {title:"Especiarias inteiras",desc:"Aquecer ghee. Fritar cardamomo e funcho 30 seg até perfumar."},
      {title:"Base de cebola",desc:"Adicionar a cebola em fatias finas. Cozinhar 20 min em fogo baixo até dourar bem."},
      {title:"Aromáticos",desc:"Adicionar a pasta de gengibre-alho. Cozinhar 3 min. Adicionar as especiarias secas. Cozinhar 2 min."},
      {title:"Borrego",desc:"Adicionar os pedaços de borrego. Fritar em fogo médio-alto 8–10 min até dourar de todos os lados."},
      {title:"Cozinhar",desc:"Incorporar o iogurte gradualmente. Adicionar ½ chávena de água. Cobrir e cozinhar 45 min até o borrego estar muito tenro."}]},
  r8:{
    ingredients:["400g de carne de vaca picada","200g de ervilhas congeladas","2 cebolas picadas","3 dentes de alho","2 cm de gengibre","2 tomates picados","1 c. chá de sementes de cominhos","2 c. chá de garam masala","1 c. chá de curcuma","1 c. chá de malagueta em pó","Coentros frescos"],
    steps:[
      {title:"Cominhos",desc:"Aquecer azeite. Adicionar as sementes de cominhos e deixar crepitar 30 seg."},
      {title:"Cebolas",desc:"Adicionar a cebola picada. Cozinhar 10 min até dourar. Adicionar alho e gengibre, cozinhar 2 min."},
      {title:"Tomates",desc:"Adicionar os tomates picados e todas as especiarias secas. Cozinhar 5 min até desfazerem."},
      {title:"Carne",desc:"Adicionar a carne picada. Desfazer e fritar em fogo alto 8 min até dourar e secar bem."},
      {title:"Ervilhas",desc:"Adicionar as ervilhas congeladas e 100ml de água. Cozinhar 5 min. Guarnecer com coentros frescos."}]},
  r9:{
    ingredients:["400g de lombo de vaca em fatias muito finas","5 c. sopa de molho de soja","3 c. sopa de açúcar mascavado","2 c. sopa de óleo de sésamo","4 dentes de alho ralados","2 cm de gengibre ralado","1 pera asiática ralada","Sementes de sésamo, cebolinho"],
    steps:[
      {title:"Fatiar fino",desc:"Fatiar a vaca muito fino — congelar 30 min antes facilita o corte."},
      {title:"Marinada",desc:"Misturar soja, açúcar, óleo de sésamo, alho, gengibre e pera ralada."},
      {title:"Marinar",desc:"Cobrir a vaca bem. Marinar mínimo 30 min, até 24 horas no frigorífico."},
      {title:"Cozinhar",desc:"Cozinhar em porções numa frigideira muito quente. Não encher demasiado."},
      {title:"Servir",desc:"Servir sobre arroz cozido com kimchi, cebolinho e sementes de sésamo."}]},
  r10:{
    ingredients:["300g de borrego em fatias finas","3 c. sopa de molho hoisin","2 c. sopa de molho de soja","1 c. sopa de molho de ostras","1 c. chá de amido de milho","3 dentes de alho","2 cm de gengibre","4 cebolinhos","1 c. chá de óleo de sésamo"],
    steps:[
      {title:"Velveting",desc:"Cobrir as fatias de borrego com amido de milho e uma pitada de sal."},
      {title:"Molho",desc:"Misturar hoisin, soja, molho de ostras e óleo de sésamo numa tigela."},
      {title:"Selar",desc:"Cozinhar o borrego num wok muito quente em camada única, 2 min. Reservar."},
      {title:"Aromáticos",desc:"Adicionar alho, gengibre e a parte branca do cebolinho. Fritar 1 min."},
      {title:"Finalizar",desc:"Devolver o borrego. Adicionar o molho. Misturar 1 min até ficar tudo brilhante."}]},
  r11:{
    ingredients:["600g de borrego picado ou pá","2 cenouras em cubos","1 cebola","2 c. sopa de concentrado de tomate","200ml de caldo de borrego","1 c. sopa de molho Worcestershire","1 kg de batatas para puré","50g de manteiga","Alecrim e tomilho"],
    steps:[
      {title:"Dourar",desc:"Dourar o borrego picado em azeite em fogo alto. Temperar generosamente."},
      {title:"Legumes",desc:"Adicionar a cebola e cenoura. Cozinhar 8 min. Adicionar concentrado de tomate e ervas."},
      {title:"Cozinhar",desc:"Adicionar caldo e molho Worcestershire. Cobrir e cozinhar 25 min até engrossar."},
      {title:"Puré",desc:"Ferver e esmagar as batatas com manteiga e nata. Temperar bem."},
      {title:"Assar",desc:"Verter o recheio num tabuleiro. Cobrir com puré. Assar a 200°C durante 25 min até dourar."}]},
  r12:{
    ingredients:["300g de borrego em fatias finas","300ml de caldo dashi ou de galinha","4 c. sopa de molho de soja","3 c. sopa de mirin","2 c. sopa de saké","1 c. sopa de açúcar","Tofu, cogumelos, noodles, cebolinho","Ovos moles para servir"],
    steps:[
      {title:"Caldo",desc:"Cozinhar a cebola em fatias no dashi, soja, mirin, saké e açúcar durante 10 min."},
      {title:"Borrego",desc:"Adicionar as fatias de borrego. Cozinhar apenas 2–3 min."},
      {title:"Provar",desc:"Provar o caldo — deve ser doce-salgado. Ajustar a soja ou açúcar."},
      {title:"Montar",desc:"Verter arroz nas tigelas. Servir o borrego e cebola com o caldo."},
      {title:"Guarnecer",desc:"Adicionar um ovo mole (6,5 min), gengibre em pickle e cebolinho."}]},
  b1:{
    ingredients:["400g de bife entrecosto (mínimo 3 cm de espessura)","Sal grosso","Pimenta preta moída","3 c. sopa de manteiga","4 dentes de alho esmagados","Raminhos de tomilho fresco","Banha de vaca ou óleo de alta temperatura"],
    steps:[
      {title:"Secar e temperar",desc:"Secar completamente o bife. Salgar APENAS 45 min antes. Apimentar mesmo antes da frigideira."},
      {title:"Frigideira muito quente",desc:"Aquecer a frigideira de ferro fundido durante 3 min em fogo máximo — até fumar."},
      {title:"Primeira selagem",desc:"Adicionar uma gota de banha. Colocar o bife afastado de si. Não mexer durante 2,5 min."},
      {title:"Manteiga",desc:"Virar. Adicionar manteiga, alho e tomilho de imediato. Inclinar a frigideira e regar continuamente 2 min."},
      {title:"Repousar",desc:"Repousar numa grelha 8 min. Fatiar contra as fibras, regar com a manteiga da frigideira."}]},
  b2:{
    ingredients:["600g de carne picada de vaca (20% gordura)","8 fatias de queijo fundido","4 pãezinhos brioche","Alface fina","Pickles em fatias","Molho burger: maionese, ketchup, mostarda, vinagre de pickle, páprica"],
    steps:[
      {title:"Bolas não hambúrgueres",desc:"Dividir a carne em bolas de 150g soltas. NÃO comprimir nem temperar ainda."},
      {title:"Chapa ardente",desc:"Aquecer a chapa de ferro ou frigideira ao máximo. Untar levemente."},
      {title:"ESMAGAR",desc:"Colocar a bola na chapa. Esmagar imediatamente com a espátula. Salgar. Cozinhar 90 seg até as bordas ficarem crocantes."},
      {title:"Virar e queijo",desc:"Virar uma vez, colocar o queijo imediatamente. Cozinhar 45 seg. Retirar."},
      {title:"Montar e servir",desc:"Torrar os pãezinhos. Barrar com molho. Empilhar dois bifes por hambúrguer. Servir imediatamente."}]},
  b3:{
    ingredients:["400g de bife entrecosto grosso com osso","Sal grosso","Pimenta preta","Alho em pó","Alecrim fresco para regar","Manteiga"],
    steps:[
      {title:"Temperar",desc:"Temperar o bife de todos os lados com sal, pimenta e alho em pó. Idealmente refrigerar descoberto de um dia para o outro."},
      {title:"Reverse sear",desc:"Para bifes grossos: assar a 110°C durante 25 min até 45°C no interior."},
      {title:"Grelha quente",desc:"Aquecer a grelha ao máximo enquanto o bife repousa."},
      {title:"Selar forte",desc:"Selar na grelha ardente 2 min de cada lado. Selar também a camada de gordura."},
      {title:"Repousar",desc:"Repousar 10 min. Terminar com uma noz de manteiga."}]},
  b4:{
    ingredients:["800g de brisket de vaca","2 c. sopa de café moído","2 c. sopa de páprica fumada","1 c. sopa de açúcar mascavado","1 c. sopa de pimenta preta","1 c. sopa de sal","1 c. chá de alho em pó","1 c. chá de cebola em pó"],
    steps:[
      {title:"Esfregar seco",desc:"Misturar todos os ingredientes secos. Esfregar generosamente por todo o brisket. Refrigerar descoberto de um dia para o outro."},
      {title:"Cozinhar lentamente",desc:"Cozinhar a 120°C (calor indireto ou forno baixo) 3–3,5 horas até 75°C no interior."},
      {title:"Embrulhar",desc:"Embrulhar firmemente em papel de talho. Cozinhar mais 1 hora até 92°C."},
      {title:"Repousar",desc:"Repousar embrulhado pelo menos 1 hora — absolutamente indispensável."},
      {title:"Fatiar",desc:"Fatiar contra as fibras em fatias da espessura de um lápis. Servir com pickles e pão branco."}]},
  b5:{
    ingredients:["400g de lombo de vaca em fatias finas","1 c. chá de cominhos","1 c. chá de coentros","1 c. chá de canela","½ c. chá de cardamomo","½ c. chá de curcuma","3 c. sopa de vinagre","3 c. sopa de azeite","Alho, pão pita, tomate, nabo em pickle, tahini"],
    steps:[
      {title:"Marinada",desc:"Misturar especiarias, vinagre, azeite e alho. Cobrir as fatias de vaca. Marinar 2 horas."},
      {title:"Empilhar e assar",desc:"Empilhar as fatias juntas num espeto ou forma de bolo inglês. Assar a 220°C durante 25 min."},
      {title:"Fatiar fino",desc:"Cortar fatias finas do exterior do bloco de carne cozido."},
      {title:"Carbonizar",desc:"Selar rapidamente as fatias numa frigideira muito quente 1 min."},
      {title:"Montar",desc:"Aquecer o pão pita. Barrar com tahini. Cobrir com vaca, tomate e nabo em pickle."}]},
  b6:{
    ingredients:["400g de carne picada de vaca","1 cebola picada finamente","2 tomates em cubos","2 malaguetas verdes","1 c. chá de cominhos","1 c. chá de coentros","½ c. chá de canela","Salsa fresca","4 pães pita"],
    steps:[
      {title:"Preparar o recheio",desc:"Combinar a carne picada crua com todos os ingredientes — não cozinhar a carne primeiro."},
      {title:"Rechear",desc:"Abrir o pão pita. Rechear uma metade com a mistura de carne crua. Pressionar a outra metade firmemente."},
      {title:"Fritar",desc:"Numa frigideira seca em fogo médio, cozinhar o pão recheado 6–7 min de cada lado, pressionando com a espátula."},
      {title:"Verificar",desc:"O pão deve estar crocante. A carne no interior deve estar completamente cozinhada."},
      {title:"Servir",desc:"Cortar em quartos. Servir com salada de tomate fresco e tahini."}]},
  b7:{
    ingredients:["500g de vaca em cubos","2 cebolas","4 dentes de alho","2 cm de gengibre","3 c. chá de caril Madras","1 c. chá de curcuma","1 lata de tomate picado","1 c. sopa de pasta de tamarindo","Folhas de caril","Óleo de coco"],
    steps:[
      {title:"Base de caril",desc:"Refogar a cebola picada em óleo de coco 15 min até dourar bem. Adicionar folhas de caril."},
      {title:"Pasta",desc:"Adicionar a pasta de gengibre-alho e todas as especiarias secas. Fritar 3 min até o óleo separar."},
      {title:"Vaca",desc:"Adicionar os cubos de vaca. Dourar de todos os lados 8 min em fogo alto."},
      {title:"Cozinhar",desc:"Adicionar tomate e tamarindo. Cobrir e cozinhar em fogo baixo 30–35 min até a vaca estar muito tenra."},
      {title:"Finalizar",desc:"Descobrir e cozinhar 5 min para reduzir e intensificar. Servir com arroz ou paratha."}]},
  b8:{
    ingredients:["500g de carne picada de vaca","1 cebola ralada","3 dentes de alho","2 cm de gengibre ralado","1 c. chá de garam masala","1 c. chá de cominhos","½ c. chá de malagueta em pó","Coentros e hortelã frescos","1 c. sopa de farinha de grão","Sal"],
    steps:[
      {title:"Misturar",desc:"Combinar todos os ingredientes. Amassar 2 minutos. Refrigerar 30 min."},
      {title:"Espeto",desc:"Mãos molhadas. Dividir em 8. Moldar à volta de espetos planos em cilindros de 15 cm."},
      {title:"Grelhar",desc:"Grelhar em fogo alto, virando a cada 2 min. Tempo total 10–12 min."},
      {title:"Carbonizar",desc:"Aumentar para fogo máximo nos últimos 2 min para marcas carbonizadas."},
      {title:"Servir",desc:"Servir com chutney de hortelã, cebola em sumo de limão e naan quente."}]},
  b9:{
    ingredients:["300g de lombo de vaca em papel fino","1 cebola grande em fatias","300ml de caldo dashi ou de galinha","4 c. sopa de molho de soja","3 c. sopa de mirin","2 c. sopa de saké","1 c. sopa de açúcar","Arroz japonês cozido","Gengibre em pickle, ovo mole"],
    steps:[
      {title:"Cozinhar cebolas",desc:"Cozinhar a cebola em fatias no dashi, soja, mirin, saké e açúcar durante 10 min até translúcida."},
      {title:"Adicionar vaca",desc:"Adicionar as fatias muito finas de vaca. Cozinhar apenas 2–3 min."},
      {title:"Provar",desc:"Provar o caldo — deve ser doce-salgado. Ajustar ao gosto."},
      {title:"Montar",desc:"Verter arroz nas tigelas. Servir a vaca e cebola com o caldo generosamente."},
      {title:"Guarnecer",desc:"Adicionar um ovo mole (6,5 min), gengibre em pickle e cebolinho."}]},
  b10:{
    ingredients:["500g de ossos de vaca ou carne para estufar","200g de noodles de arroz","1 cebola tostada","5 cm de gengibre tostado","3 anis estrelado","3 cravos","1 pau de canela","Molho de peixe","Rebentos de soja, manjericão, limão, malagueta para servir"],
    steps:[
      {title:"Carbonizar aromáticos",desc:"Queimar a cebola e o gengibre directamente na chama ou no grelhador até ficarem enegrecidos. Dá profundidade ao caldo."},
      {title:"Torrar especiarias",desc:"Torrar o anis estrelado, cravos e canela numa frigideira seca 1 min até perfumar."},
      {title:"Caldo",desc:"Cozinhar os ossos com os vegetais tostados, especiarias e molho de peixe durante 1 hora. Escumar constantemente."},
      {title:"Coar",desc:"Coar o caldo — deve ser cristalino. Temperar com molho de peixe e um pouco de açúcar."},
      {title:"Servir",desc:"Demolhar os noodles. Colocar nas tigelas. Verter o caldo quente. Adicionar vaca em fatias cruas — cozinha no caldo."}]},
  b11:{
    ingredients:["400g de filet mignon","200g de cogumelos mistos picados finamente","4 fatias de bresaola ou presunto","1 rolo de massa folhada","1 c. sopa de mostarda de Dijon","1 gema de ovo","Sal e pimenta","Tomilho"],
    steps:[
      {title:"Selar",desc:"Selar o filet numa frigideira muito quente de todos os lados — 1 min por lado. Repousar e pincelar com Dijon."},
      {title:"Duxelles",desc:"Cozinhar os cogumelos com tomilho em fogo alto até estarem completamente secos — cerca de 15 min."},
      {title:"Embrulhar",desc:"Dispor a bresaola em película aderente. Espalhar os cogumelos. Enrolar o filet firmemente. Refrigerar 20 min."},
      {title:"Massa folhada",desc:"Desenrolar a massa. Colocar o rolo de filet na borda. Enrolar firmemente. Selar as extremidades. Pincelar com gema."},
      {title:"Assar",desc:"Assar a 220°C durante 25–28 min para mal passado. Repousar 10 min antes de fatiar."}]},
  b12:{
    ingredients:["500g de carne picada de vaca muito fina","200g de bulgur embebido","1 cebola","1 c. chá de pimento da Jamaica","½ c. chá de canela","½ c. chá de cominhos","Sal","Pinhões e passas para o recheio"],
    steps:[
      {title:"Mistura exterior",desc:"Processar a vaca, bulgur embebido, cebola e especiarias até ficar liso."},
      {title:"Recheio",desc:"Fritar a carne picada restante com pinhões, passas e especiarias."},
      {title:"Moldar",desc:"Mãos molhadas. Pegar na mistura exterior, fazer um buraco, rechear, fechar em forma de torpedo."},
      {title:"Fritar",desc:"Fritar em óleo quente 3–4 min de cada lado até dourar bem."},
      {title:"Servir",desc:"Servir com iogurte natural e hortelã fresca."}]},
  a1:{
    ingredients:["1 frango inteiro","400g de lombo de vaca","Legumes para assar: cenouras, pastinacas, cebolas","Batatas para assar","Tomilho e alecrim frescos","Manteiga","Caldo de vaca para o molho"],
    steps:[
      {title:"Planear",desc:"Começar pela vaca — precisa de mais tempo. Temperar ambas as carnes com sal 1 hora antes."},
      {title:"Assar o frango",desc:"Rechear com ervas e limão. Esfregar com manteiga. Assar a 200°C durante 1h15."},
      {title:"Assar a vaca",desc:"Selar o lombo numa frigideira. Assar a 200°C, 20 min por 500g para mal passado. Repousar 15 min."},
      {title:"Legumes",desc:"Pré-cozinhar batatas 7 min. Assar na gordura de vaca a 220°C durante 40 min até dourar crocante."},
      {title:"Molho",desc:"Deglacear os tabuleiros com vinho tinto e caldo de vaca. Reduzir e coar. Temperar."}]},
  a2:{
    ingredients:["Pernas e peitos de frango","Lombo de vaca","Costeletas de borrego","Azeite, sal, pimenta","Limão","Ervas frescas","Pão grelhado e salada"],
    steps:[
      {title:"Sequenciar",desc:"Começar com as costeletas de borrego (15 min), depois vaca (10 min), depois frango (20 min). Escalonar os inícios."},
      {title:"Temperar",desc:"Temperar simplesmente — azeite, sal, pimenta. Deixar a qualidade da carne falar."},
      {title:"Grelhar frango",desc:"Grelhar as pernas em calor indireto 20 min, terminar 5 min em calor direto."},
      {title:"Vaca e borrego",desc:"Grelhar o lombo 3 min de cada lado. Grelhar as costeletas 3 min de cada lado. Repousar tudo."},
      {title:"Travessa",desc:"Dispor numa tábua grande com limões grelhados, ervas frescas e uma salada grande."}]},
  a3:{
    ingredients:["Pernas de frango inteiras","Lombo de vaca","Costeletas de borrego","Carne picada para hambúrgueres","Mistura de especiarias BBQ","Glacê de mel","Pãezinhos e acompanhamentos"],
    steps:[
      {title:"Preparar no dia anterior",desc:"Marinar as pernas de frango de um dia para o outro. Moldar os hambúrgueres, refrigerar."},
      {title:"Plano de tempo",desc:"Frango 40 min, costeletas 12 min, vaca 8 min, hambúrgueres 10 min. Calcular ao contrário."},
      {title:"Grelha dupla",desc:"Configurar zonas direta e indireta. Zona lenta para frango, zona quente para vaca."},
      {title:"Grelhar em ondas",desc:"Frango primeiro. Adicionar borrego e vaca nos últimos 15 min."},
      {title:"Servir",desc:"Dispor molhos, saladas e acompanhamentos. Deixar os convidados compor os seus pratos."}]},
  a4:{
    ingredients:["1 frango inteiro cortado","1 kg de cebolas em fatias finas","3 c. sopa de sumagre","1 c. chá de pimento da Jamaica","½ c. chá de canela","4 c. sopa de azeite","Pão pita","Pinhões e amêndoas torradas"],
    steps:[
      {title:"Caramelizar cebolas",desc:"Cozinhar as fatias de cebola em azeite em fogo médio-baixo 40 min até ficarem muito macias e douradas."},
      {title:"Temperar frango",desc:"Esfregar os pedaços com sumagre, pimento da Jamaica, canela, sal e azeite."},
      {title:"Combinar",desc:"Misturar metade das cebolas com o frango. Assar a 200°C durante 35–40 min."},
      {title:"Camada de pão",desc:"Dispor o pão num prato de servir. Cobrir com as cebolas caramelizadas restantes."},
      {title:"Servir",desc:"Colocar o frango assado sobre o pão com cebolas. Espalhar frutos secos torrados. Regar com azeite."}]},
  a5:{
    ingredients:["400g de pedaços de frango","300g de costeletas de borrego","500g de arroz basmati","3 cebolas grandes","Ghee","Açafrão em leite quente","Mistura de especiarias biryani","Hortelã e coentros frescos"],
    steps:[
      {title:"Cozinhar carnes separadas",desc:"Estufar o frango em molho de iogurte temperado 20 min. Estufar o borrego em molho separado 35 min."},
      {title:"Fritar cebolas",desc:"Fritar as cebolas em fatias finas em ghee até dourar bem e ficarem crocantes. Demora 25 min."},
      {title:"Arroz meio cozido",desc:"Ferver água salgada com cardamomo. Cozinhar o arroz exatamente 6 min — escorrer ligeiramente mal cozido."},
      {title:"Camadas",desc:"Num tacho: frango, depois borrego, depois arroz, depois leite de açafrão, depois cebolas, ervas."},
      {title:"Dum",desc:"Selar hermeticamente. Cozinhar em fogo muito baixo 25 min."}]},
  a6:{
    ingredients:["Lombo de vaca em fatias de papel","Peito de frango em fatias finas","Borrego em fatias finas","Caldo temperado: caldo, gengibre, alho, malagueta, soja","Noodles de arroz, tofu, cogumelos","Molhos: pasta de sésamo, hoisin, óleo de malagueta"],
    steps:[
      {title:"Preparar o caldo",desc:"Cozinhar o caldo com gengibre, alho, pasta de malagueta, soja e óleo de sésamo. Provar e ajustar."},
      {title:"Fatiar as carnes",desc:"Congelar as carnes 30 min depois fatiar em papel fino. Dispor em pratos à volta da mesa."},
      {title:"Preparar a mesa",desc:"Colocar o fondue elétrico ou fogão portátil no centro. Dispor todos os ingredientes à volta."},
      {title:"Molhos",desc:"Tigelas individuais: pasta de sésamo diluída com caldo, hoisin, óleo de malagueta. Cada um personaliza."},
      {title:"Cozinhar e comer",desc:"Cada pessoa cozinha os seus pedaços mergulhando no caldo quente durante 30–60 segundos."}]},
  a7:{
    ingredients:["Lombo de vaca em fatias finas","Peito de frango","Marinada bulgogi: soja, pera, açúcar, sésamo","Marinada frango: gochujang, alho, açúcar, óleo","Folhas de alface, arroz, kimchi","Molhos e acompanhamentos"],
    steps:[
      {title:"Marinadas",desc:"Preparar as duas marinadas. Marinar vaca e frango separadamente pelo menos 2 horas."},
      {title:"Preparar",desc:"Aquecer uma frigideira grelha ou grelha de mesa. Preparar alface, arroz, kimchi e acompanhamentos."},
      {title:"Grelhar vaca",desc:"Cozinhar o bulgogi em porções em fogo alto, 2 min de cada lado."},
      {title:"Grelhar frango",desc:"Cozinhar o frango com gochujang 4 min de cada lado até grelhado e brilhante."},
      {title:"Ssam wraps",desc:"Enrolar a carne grelhada em folhas de alface com arroz, kimchi, alho em fatias e pasta ssamjang."}]},
  a8:{
    ingredients:["Pernas e peitos de frango","Costeletas de borrego","200ml de iogurte natural","2 c. chá de masala tandoori","1 c. chá de curcuma","1 c. chá de páprica","Pasta de gengibre-alho","Sumo de limão","Chutney de hortelã, cebolas em fatias"],
    steps:[
      {title:"Cortar",desc:"Fazer cortes profundos no frango e borrego para a marinada penetrar até ao osso."},
      {title:"Marinada",desc:"Misturar iogurte, todas as especiarias, pasta de gengibre-alho e sumo de limão. Cobrir completamente."},
      {title:"Marinar",desc:"Refrigerar pelo menos 4 horas — de um dia para o outro transforma a carne."},
      {title:"Calor intenso",desc:"Grelha ou forno em temperatura máxima (250°C+). Cozinhar frango 25 min, costeletas 10 min."},
      {title:"Servir",desc:"Dispor num prato com cebola em fatias, quartos de limão e chutney de hortelã fresco."}]},
  a9:{
    ingredients:["1 frango inteiro aberto","Lombo de vaca","Costeletas de borrego","Molho piri-piri: malaguetas, limão, alho, azeite","Coentros frescos","Pão grelhado"],
    steps:[
      {title:"Molho piri-piri",desc:"Mixar malaguetas vermelhas, alho, sumo de limão, azeite e sal. Provar — deve ser picante."},
      {title:"Marinar o frango",desc:"Cobrir o frango aberto com piri-piri. Marinar mínimo 2 horas."},
      {title:"Grelhar o frango",desc:"Grelhar em calor indireto 35 min, terminar 5 min em calor direto. O carbonizado é essencial."},
      {title:"Grelhar vaca e borrego",desc:"Temperar simplesmente. Grelhar o lombo 3 min de cada lado, costeletas 3 min de cada lado."},
      {title:"Travessa",desc:"Fatiar tudo e dispor numa tábua grande. Regar com piri-piri, espalhar coentros."}]},
  a10:{
    ingredients:["Peito de frango para shawarma","Borrego picado para kofta","Vaca para fatteh","Houmous, tabbouleh, fattoush","Pão pita","Molho de alho, tahini, pickles"],
    steps:[
      {title:"Preparar o frango",desc:"Marinar o frango com especiarias shawarma. Grelhar e fatiar."},
      {title:"Kofta",desc:"Misturar o borrego picado com cebola, salsa, cominhos, canela. Moldar em espetos. Grelhar."},
      {title:"Fatteh",desc:"Fritar vaca picada temperada. Sobrepor pão torrado, vaca, iogurte e grão-de-bico."},
      {title:"Dispor",desc:"Dispor tudo em pequenos pratos por toda a mesa."},
      {title:"Partilhar",desc:"O mezze é comunitário — toda a gente serve e partilha. Servir com pão pita."}]},
};

const AR_STEPS = {
  f1:{
    ingredients:["1 دجاجة كاملة (1,2–1,5 كغ)","3 م.ك زيت زيتون","1 ليمونة مقسومة نصفين","4 فصوص ثوم مسحوقة","زعتر وإكليل الجبل طازجَين","ملح وفلفل أسود"],
    steps:[
      {title:"التحضير",desc:"سخّن الفرن إلى 200 درجة. جفّف الدجاجة بمنديل ورقي — الجلد الجاف = جلد مقرمش."},
      {title:"التتبيل",desc:"ادهن كل الجانبين بزيت الزيتون والملح والفلفل. احشِ الجوف بالليمون والثوم والأعشاب."},
      {title:"الشوي",desc:"ضعها بصدرها للأعلى في صينية. اشوِها 1 ساعة و10 دقائق حتى يسيل العصير صافياً عند ثقب الفخذ."},
      {title:"الراحة",desc:"غطِّها برقاق الألمونيوم بشكل خفيف. اتركها ترتاح 10 دقائق قبل التقطيع للحفاظ على العصائر."},
      {title:"التقديم",desc:"قطّعها واسكب عصارة الشوي فوقها. رائعة مع البطاطا المحمّرة."}]},
  f2:{
    ingredients:["300 غ فيليه دجاج","2 م.ك زبدة","2 فصّ ثوم مشرّح","أغصان زعتر طازج","ملح وفلفل","عصير ليمون"],
    steps:[
      {title:"تسوية الفيليه",desc:"ضع الفيليه بين طبقتين من الغلاف الشفاف واطرقه برفق لتساوي السماكة."},
      {title:"التتبيل",desc:"تبّل بالملح والفلفل بسخاء من الجانبين مباشرةً قبل الطهي."},
      {title:"التحمير",desc:"سخّن المقلاة على نار عالية. أضف الزيت. احمِّر الفيليه 4 دقائق دون تحريك."},
      {title:"دهن الزبدة",desc:"اقلبه، أضف الزبدة والثوم والزعتر. أمِّل المقلاة وارشِّه بالزبدة باستمرار 3 دقائق."},
      {title:"الراحة",desc:"اتركه يرتاح 3 دقائق عن النار. أنهِه بعصير الليمون."}]},
  f3:{
    ingredients:["1 دجاجة كاملة","3 م.ك بابريكا مدخنة","2 م.ك زيت زيتون","1 م.ص ثوم بودرة","1 م.ص بصل بودرة","1 م.ص كايين","ملح وفلفل"],
    steps:[
      {title:"تفريج الدجاجة",desc:"استخدم المقص للقطع على جانبَي العمود الفقري وإزالته. اضغط لتسطيح الدجاجة."},
      {title:"التتبيل",desc:"امزج البابريكا وبودرة الثوم والبصل والكايين والزيت والملح. ادهن كل الجانبين. تبّل 30 دقيقة."},
      {title:"تسخين الشواية",desc:"اضبط الشواية بمنطقتين: حرارة مباشرة وأخرى غير مباشرة."},
      {title:"الشوي",desc:"ابدأ بجلدها للأسفل على الحرارة المباشرة 5 دقائق. انقلها للمنطقة غير المباشرة 30–35 دقيقة."},
      {title:"الإنهاء",desc:"عدها للحرارة المباشرة 2 دقيقة. اتركها ترتاح 10 دقائق."}]},
  f4:{
    ingredients:["8 أرجل دجاج","4 م.ك عسل","3 م.ك صلصة صويا","2 م.ك خل التفاح","2 م.ك كاتشب","1 م.ك بابريكا مدخنة","بودرة ثوم وملح"],
    steps:[
      {title:"التشريح",desc:"اشرّح كل رِجل 2–3 مرات بالسكين لتتغلغل الصلصة في العمق."},
      {title:"التتبيل",desc:"امزج العسل والصويا والخل والكاتشب والبابريكا والثوم. غطِّ الأرجل جيداً. تبّل ساعتين."},
      {title:"الشوي البطيء",desc:"اشوِ على حرارة متوسطة-منخفضة 30 دقيقة، مع التقليب كل 10 دقائق."},
      {title:"التزجيج",desc:"ادهن بالصلصة الإضافية في آخر 10 دقائق. ارفع الحرارة للكرملة."},
      {title:"التقديم",desc:"اتركها ترتاح 5 دقائق. قدّمها مع كولسلو وخبز مشوي."}]},
  f5:{
    ingredients:["500 غ فيليه دجاج","1 م.ص كمون","1 م.ص كزبرة","1 م.ص كركم","1 م.ص قرفة","½ م.ص هيل","3 م.ك زيت زيتون","3 فصوص ثوم مفرومة","عصير ليمونة","زبادي، خبز عربي، طماطم، بصل للتقديم"],
    steps:[
      {title:"خلطة البهارات",desc:"اجمع كل البهارات مع زيت الزيتون والثوم وعصير الليمون لعمل معجون."},
      {title:"التتبيل",desc:"غلّف الدجاج بالمعجون. اتركه على الأقل 30 دقيقة — الليل أفضل."},
      {title:"الطهي",desc:"اشوِ أو اقلِ على حرارة متوسطة-عالية 5–6 دقائق لكل جانب حتى يتفحّم قليلاً."},
      {title:"التقطيع",desc:"اتركه يرتاح 3 دقائق ثم اشرّحه بشرائح رفيعة."},
      {title:"التجميع",desc:"سخّن الخبز العربي، ادهنه بالزبادي بالثوم، رتّب الدجاج والطماطم والبصل."}]},
  f6:{
    ingredients:["500 غ فيليه دجاج مكعبات","4 م.ك زبادي طبيعي","3 م.ك معجون طماطم","3 فصوص ثوم","عصير ليمونة","1 م.ص بابريكا","1 م.ص بهار حلو","½ م.ص فلفل أبيض","زيت زيتون"],
    steps:[
      {title:"المارينيد",desc:"اخلط الزبادي ومعجون الطماطم والثوم والليمون والبهارات وزيت الزيتون حتى يصبح ناعماً."},
      {title:"التتبيل",desc:"أضف مكعبات الدجاج، اخلط جيداً، غطِّ وضعه في الثلاجة على الأقل ساعتين."},
      {title:"السيخ",desc:"انظمه على أسياخ معدنية مع ترك فراغات صغيرة لتسريب الحرارة."},
      {title:"الشوي",desc:"اشوِ على حرارة متوسطة-عالية مع التقليب كل 3 دقائق. إجمالي الطهي 12–15 دقيقة."},
      {title:"التقديم",desc:"قدّمه فوراً مع صلصة التوم والمخللات والخبز العربي."}]},
  f7:{
    ingredients:["500 غ فيليه دجاج مكعبات","200 مل صلصة طماطم","150 مل كريمة طهي","1 بصلة مفرومة","3 فصوص ثوم","2 سم زنجبيل مبشور","2 م.ص غرام ماسالا","1 م.ص كمون","1 م.ص كركم","1 م.ص بابريكا","زبادي للتتبيل","كزبرة طازجة"],
    steps:[
      {title:"التتبيل",desc:"اخلط الدجاج مع الزبادي وملعقة غرام ماسالا والبابريكا والملح. تبّل 30 دقيقة."},
      {title:"التحمير",desc:"اشوِ الدجاج أو اقليه على نار عالية حتى يتفحّم قليلاً. ضعه جانباً."},
      {title:"الصلصة",desc:"قلِّ البصل 8 دقائق حتى يذهب. أضف الثوم والزنجبيل دقيقتين. أضف البهارات الجافة، اطبخ دقيقة."},
      {title:"الطهي",desc:"أضف الطماطم، اطبخ 10 دقائق على نار هادئة. أضف الكريمة والدجاج. اطبخ 5 دقائق."},
      {title:"الإنهاء",desc:"تذوّق وعدّل الملح. أنهِه بالزبدة. زيّنه بالكزبرة. قدّمه مع الأرز والنان."}]},
  f8:{
    ingredients:["800 غ قطع دجاج","400 غ أرز بسمتي","2 بصلة كبيرة مشرّحة رفيعة","4 م.ك سمن","1 م.ص بذور كمون","3 حبهان","2 ورق غار","1 م.ص كركم","2 م.ص ماسالا برياني","زعفران في حليب دافئ","نعناع وكزبرة طازجَين"],
    steps:[
      {title:"قلي البصل",desc:"قلِّ شرائح البصل في السمن على نار متوسطة-منخفضة 25 دقيقة حتى يذهب بشكل غامق ويصبح مقرمشاً."},
      {title:"طهي الدجاج",desc:"في السمن المتبقي أضف البهارات الكاملة ثم الدجاج. اطبخ 10 دقائق. أضف ماسالا البرياني والزبادي. اطبخ 15 دقيقة."},
      {title:"سلق الأرز نصفياً",desc:"اغلِ ماءً مملّحاً مع ورق الغار. أضف الأرز المغسول، اطبخ 6 دقائق بالضبط. صفِّه."},
      {title:"الطبقات",desc:"في القدر: طبقة دجاج، ثم أرز، ثم بصل مقرمش، نعناع، كزبرة. ارشِّ فوقه حليب الزعفران."},
      {title:"الدَّم",desc:"أحكِم إغلاق القدر بالألومنيوم ثم الغطاء. اطبخ على نار هادئة جداً 25 دقيقة."}]},
  f9:{
    ingredients:["300 غ فيليه دجاج","4 م.ك صلصة صويا","3 م.ك ميرين","2 م.ك سيك","1 م.ك سكر","1 م.ص زيت سمسم","بذور سمسم","بصل أخضر للتزيين"],
    steps:[
      {title:"الصلصة",desc:"اجمع الصويا والميرين والسيك والسكر. حرّك حتى يذوب السكر."},
      {title:"التحمير",desc:"اشرّح جلد الدجاج. احمِّره في مقلاة مدهونة قليلاً بجلده للأسفل 5 دقائق حتى يذهب."},
      {title:"التزجيج",desc:"اقلبه، أضف الصلصة. اطبخ 4–5 دقائق مع الرشّ المتكرر بينما تتركّز الصلصة."},
      {title:"التقليص",desc:"اتركها تتكاثف حتى تصبح طلاءً لامعاً."},
      {title:"التقديم",desc:"شرّحه وقدّمه فوق الأرز على البخار. زيّنه ببذور السمسم والبصل الأخضر."}]},
  f10:{
    ingredients:["300 غ فيليه دجاج مفروم ناعم","3 فصوص ثوم","3 فلفل حار bird's eye","2 م.ك صلصة المحار","1 م.ك صلصة السمك","1 م.ص صلصة صويا","1 م.ص سكر","كمية كبيرة ريحان تايلاندي","بيض مقلي للتقديم"],
    steps:[
      {title:"التحضير",desc:"اهرس الثوم والفلفل الحار في الهاون — القوام الخشن أفضل من الناعم."},
      {title:"تحمير البهارات",desc:"قلِّ معجون الثوم والفلفل في زيت ساخن جداً 30 ثانية حتى يفوح الأريج."},
      {title:"طهي الدجاج",desc:"أضف الدجاج المفروم. قلِّبه على نار عالية 4–5 دقائق مع تكسير أي تكتلات."},
      {title:"الصلصة",desc:"أضف صلصة المحار وصلصة السمك والصويا والسكر. اخلط كل شيء دقيقة واحدة."},
      {title:"الريحان",desc:"ارفع عن النار. أضف أوراق الريحان وقلّبها — الحرارة المتبقية تذبلها بشكل مثالي. قدّمه فوق الأرز مع بيض مقلي."}]},
  f11:{
    ingredients:["4 فيليه دجاج","عصير ليمونتين","3 م.ك زيت زيتون","1 م.ك زعتر طازج","1 م.ك أوريغانو طازج","3 فصوص ثوم مفرومة","ملح وفلفل"],
    steps:[
      {title:"المارينيد",desc:"اخلط عصير الليمون وزيت الزيتون والثوم والأعشاب. تبّل بالملح والفلفل."},
      {title:"التتبيل",desc:"غلّف الدجاج وتبّله على الأقل 30 دقيقة وحتى 4 ساعات."},
      {title:"الشوي",desc:"اشوِ على حرارة متوسطة-عالية 6–7 دقائق لكل جانب."},
      {title:"الراحة",desc:"اتركه يرتاح 5 دقائق بعيداً عن الشواية."},
      {title:"التقديم",desc:"قدّمه مع نصفَي ليمون مشويَّين وسلطة خضراء."}]},
  f12:{
    ingredients:["1 دجاجة كاملة مقطّعة","1 ليمون محفوظ مقطّع أرباعاً","100 غ زيتون أخضر","1 بصلة مشرّحة","3 فصوص ثوم","1 م.ص زنجبيل","1 م.ص كمون","1 م.ص كزبرة","½ م.ص قرفة","زعفران في ماء دافئ","كزبرة طازجة"],
    steps:[
      {title:"التتبيل",desc:"اخلط البهارات مع الثوم والزيت. غلّف الدجاج وتبّله ساعتين."},
      {title:"التحمير",desc:"احمِّر قطع الدجاج في مقلاة أو طاجن. ضعها جانباً."},
      {title:"قاعدة البصل",desc:"قلِّ البصل 8 دقائق في نفس المقلاة. أضف الزنجبيل والثوم دقيقتين."},
      {title:"الطهي البطيء",desc:"أعِد الدجاج. أضف ماء الزعفران والليمون المحفوظ والزيتون. غطِّ واطبخ على نار هادئة 40 دقيقة."},
      {title:"التقديم",desc:"زيّن بالكزبرة الطازجة. قدّمه مع الكسكس أو الخبز العربي."}]},
  r1:{
    ingredients:["4 قطع ضأن","3 م.ك زيت زيتون","3 فصوص ثوم مفرومة","إكليل الجبل الطازج","زعتر طازج","ملح وفلفل أسود","ليمون للتقديم"],
    steps:[
      {title:"تلطيف الحرارة",desc:"أخرج القطع من الثلاجة 30 دقيقة قبل الطهي. اللحم البارد = طهي غير متساوٍ."},
      {title:"التتبيل",desc:"غلّف القطع بزيت الزيتون والثوم وإكليل الجبل والزعتر والملح والفلفل."},
      {title:"تسخين الشواية",desc:"سخّن الشواية أو مقلاة الحديد الزهر على نار عالية جداً."},
      {title:"الشوي",desc:"اشوِ 3 دقائق لكل جانب للنضج المتوسط. اضغط على العظم دقيقة لإذابة الدهن."},
      {title:"الراحة",desc:"اتركها ترتاح 5 دقائق على طبق دافئ. اعصر عليها ليموناً طازجاً."}]},
  r2:{
    ingredients:["300 غ لحم بقري مفروم","200 غ لحم ضأن مفروم","1 بصلة مبشورة","3 فصوص ثوم مفرومة","2 م.ص كمون","1 م.ص كزبرة","½ م.ص قرفة","½ م.ص بهار حلو","بقدونس ونعناع طازجَين","ملح وفلفل"],
    steps:[
      {title:"الخلط",desc:"اجمع كل المكوّنات. اعجنها كالعجين دقيقتين."},
      {title:"التبريد",desc:"ضع الخليط في الثلاجة 30 دقيقة. الدهن البارد يساعد الكفتة على الحفاظ بشكلها."},
      {title:"التشكيل",desc:"يدان مبلّلتان. شكّلها على أسياخ في أسطوانات بطول 12 سم مع الضغط جيداً."},
      {title:"الشوي",desc:"اشوِ على نار عالية مع التقليب كل 2–3 دقائق. إجمالي الطهي 10–12 دقيقة."},
      {title:"التقديم",desc:"قدّمها مع الخبز العربي والطماطم المشوية وصلصة الزبادي."}]},
  r3:{
    ingredients:["400 غ سيرلوين لحم بقري","ملح بحر وفلفل أسود","باقة بقدونس أوراق مسطّحة","4 فصوص ثوم","1 كراث","3 م.ك خل النبيذ الأحمر","6 م.ك زيت زيتون","1 م.ص رقائق فلفل حار"],
    steps:[
      {title:"التشيميتشوري",desc:"افرم البقدونس والثوم والكراث ناعماً. اخلط مع الخل والزيت والفلفل الحار والملح. حضّره أولاً — يحتاج وقتاً للنكهة."},
      {title:"التتبيل",desc:"تبّل السيرلوين بسخاء بملح البحر والفلفل."},
      {title:"الشوي",desc:"اشوِ على أعلى حرارة 3–4 دقائق لكل جانب للنضج المتوسط."},
      {title:"الراحة",desc:"اتركه يرتاح على لوح تقطيع 5 دقائق."},
      {title:"التقديم",desc:"شرّحه عكس الألياف. ارشِّ التشيميتشوري بسخاء."}]},
  r4:{
    ingredients:["600 غ كتف ضأن","2 م.ك بابريكا مدخنة","1 م.ك كمون","1 م.ك سكر بني","1 م.ص ثوم بودرة","ملح وفلفل","خبز بريوش، كولسلو، مخللات"],
    steps:[
      {title:"فرك جاف",desc:"اخلط كل البهارات والسكر. ادهن كل أجزاء الكتف. ضعه مثالياً في الثلاجة ليلة كاملة."},
      {title:"الطهي البطيء",desc:"اشوِ على 150 درجة مغطىً بالألومنيوم 3 ساعات. درجة الحرارة المستهدفة: 85–90 درجة داخلياً."},
      {title:"تكوين القشرة",desc:"انزع الألومنيوم، ارفع الحرارة إلى 220 درجة 15 دقيقة لتكوين قشرة."},
      {title:"التفتيت",desc:"اتركه يرتاح 15 دقيقة ثم مزّقه بشوكتين."},
      {title:"التجميع",desc:"حمِّص خبز البريوش. اعبّه باللحم المفتّت والكولسلو والمخللات."}]},
  r5:{
    ingredients:["600 غ كتف ضأن قطعاً كبيرة","500 مل زبادي طبيعي","1 م.ص كركم","1 م.ص بهار حلو","2 ورق غار","لوز وصنوبر محمّصَين","أرز طويل الحبة","خبز مرقوق أو خبز عربي"],
    steps:[
      {title:"تحمير اللحم",desc:"احمِّر الضأن في السمن مع البصل. تبّل. غطِّه بالماء. اطبخه 1 ساعة."},
      {title:"صلصة الزبادي",desc:"اخفق الزبادي مع نصف كوب ماء. سخّنه ببطء مع التحريك المستمر — لا تتركه يغلي أبداً."},
      {title:"الدمج",desc:"أضف الضأن المطهو إلى صلصة الزبادي. اطبخه على نار هادئة 20 دقيقة مع التحريك باستمرار."},
      {title:"طهي الأرز",desc:"اطبخ الأرز في مرق الضأن للحصول على أقصى نكهة."},
      {title:"التقديم",desc:"ضع الخبز في طبق كبير، ثم الأرز، ثم الضأن، اسكب الصلصة، زيّن بالمكسرات المحمّصة."}]},
  r6:{
    ingredients:["500 غ سيرلوين لحم بقري","400 غ أرز بسمتي","1 بصلة","½ كوب زبيب","½ كوب صنوبر ولوز محمّص","2 م.ص بهارات","1 م.ص كركم","سمن","مرق لحم بقري"],
    steps:[
      {title:"تتبيل اللحم",desc:"ادهن اللحم بالبهارات والملح والفلفل. احمِّره في السمن من جميع الجوانب."},
      {title:"الشوي البطيء",desc:"أضف المرق، غطِّ واشوِه على 170 درجة لمدة 1,5–2 ساعة."},
      {title:"الأرز المتبّل",desc:"قلِّ البصل في السمن. أضف الأرز والكركم والزبيب. حمِّصه 2 دقيقة. أضف المرق واطبخه."},
      {title:"التقطيع",desc:"اتركه يرتاح 15 دقيقة. شرّحه إلى شرائح سميكة."},
      {title:"التقديم",desc:"ضع الأرز المتبّل في طبق كبير. رتّب شرائح اللحم فوقه. انثر المكسرات. اسكب عصارة الشوي."}]},
  r7:{
    ingredients:["500 غ ضأن","1 بصلة كبيرة","4 فصوص ثوم","2 سم زنجبيل","4 م.ك فلفل كشميري","2 م.ص كزبرة بودرة","1 م.ص كمون","½ م.ص بذور شمر","2 حبهان","1 كوب زبادي طبيعي","سمن"],
    steps:[
      {title:"البهارات الكاملة",desc:"سخّن السمن. قلِّ الهيل والشمر 30 ثانية حتى تفوح رائحتهما."},
      {title:"قاعدة البصل",desc:"أضف البصل المشرّح رفيعاً. اطبخه 20 دقيقة على نار هادئة حتى يصبح بني غامق."},
      {title:"البهارات العطرية",desc:"أضف معجون الزنجبيل والثوم. اطبخ 3 دقائق. أضف البهارات الجافة. اطبخ 2 دقيقة."},
      {title:"اللحم",desc:"أضف قطع الضأن. احمِّرها على نار متوسطة-عالية 8–10 دقائق من جميع الجوانب."},
      {title:"الطهي",desc:"أضف الزبادي تدريجياً. أضف نصف كوب ماء. غطِّ واطبخ 45 دقيقة حتى يصبح الضأن طرياً جداً."}]},
  r8:{
    ingredients:["400 غ لحم بقري مفروم","200 غ بازلاء مجمّدة","2 بصلة مفرومة","3 فصوص ثوم","2 سم زنجبيل","2 طماطم مقطّعة","1 م.ص بذور كمون","2 م.ص غرام ماسالا","1 م.ص كركم","1 م.ص فلفل حار","كزبرة طازجة"],
    steps:[
      {title:"بذور الكمون",desc:"سخّن الزيت. أضف بذور الكمون ودعها تفرقع 30 ثانية."},
      {title:"البصل",desc:"أضف البصل المفروم. اطبخه 10 دقائق حتى يذهب. أضف الثوم والزنجبيل، اطبخ 2 دقيقة."},
      {title:"الطماطم",desc:"أضف الطماطم المقطّعة وكل البهارات الجافة. اطبخ 5 دقائق حتى تتفتّت الطماطم."},
      {title:"اللحم المفروم",desc:"أضف اللحم المفروم. فكّكه واقلِه على نار عالية 8 دقائق حتى يتحمّر ويجفّ."},
      {title:"البازلاء",desc:"أضف البازلاء المجمّدة و100 مل ماء. اطبخ 5 دقائق. زيّن بالكزبرة الطازجة."}]},
  r9:{
    ingredients:["400 غ سيرلوين لحم بقري مشرّح رفيعاً","5 م.ك صلصة صويا","3 م.ك سكر بني","2 م.ك زيت سمسم","4 فصوص ثوم مبشورة","2 سم زنجبيل مبشور","1 كمثرى آسيوية مبشورة","بذور سمسم، بصل أخضر"],
    steps:[
      {title:"التقطيع الرفيع",desc:"شرّح اللحم بورقة رقيقة — ضعه في الفريزر 30 دقيقة أولاً لتسهيل التقطيع."},
      {title:"المارينيد",desc:"اخلط الصويا والسكر وزيت السمسم والثوم والزنجبيل والكمثرى المبشورة."},
      {title:"التتبيل",desc:"غلّف اللحم جيداً. تبّله 30 دقيقة على الأقل وحتى 24 ساعة في الثلاجة."},
      {title:"الطهي",desc:"اطبخه على دفعات في مقلاة ساخنة جداً. لا تكدّسه — نريد تحمير لا بخار."},
      {title:"التقديم",desc:"قدّمه فوق الأرز على البخار مع الكيمتشي والبصل الأخضر وبذور السمسم."}]},
  r10:{
    ingredients:["300 غ ضأن مشرّح رفيعاً","3 م.ك صلصة هويسين","2 م.ك صلصة صويا","1 م.ك صلصة المحار","1 م.ص نشا الذرة","3 فصوص ثوم","2 سم زنجبيل","4 بصل أخضر","1 م.ص زيت سمسم"],
    steps:[
      {title:"الفيلفيتينج",desc:"غلّف شرائح الضأن بنشا الذرة ورشّة ملح."},
      {title:"الصلصة",desc:"اخلط الهويسين والصويا وصلصة المحار وزيت السمسم في وعاء."},
      {title:"التحمير",desc:"اطبخ الضأن في وك ساخن جداً في طبقة واحدة، 2 دقيقة. ضعه جانباً."},
      {title:"البهارات العطرية",desc:"أضف الثوم والزنجبيل والجزء الأبيض من البصل الأخضر. قلِّ دقيقة واحدة."},
      {title:"الإنهاء",desc:"أعِد الضأن. أضف الصلصة. اقلب دقيقة حتى يصبح كل شيء لامعاً."}]},
  r11:{
    ingredients:["600 غ ضأن مفروم أو كتف","2 جزرة مكعبات","1 بصلة","2 م.ك معجون طماطم","200 مل مرق ضأن","1 م.ك صلصة وورشستر","1 كغ بطاطا للهريس","50 غ زبدة","إكليل جبل وزعتر"],
    steps:[
      {title:"تحمير اللحم",desc:"احمِّر اللحم المفروم في الزيت على نار عالية. تبّله بسخاء."},
      {title:"الخضروات",desc:"أضف البصل والجزر. اطبخ 8 دقائق. أضف معجون الطماطم والأعشاب."},
      {title:"الطهي",desc:"أضف المرق وصلصة وورشستر. غطِّ واطبخ 25 دقيقة حتى يتكاثف."},
      {title:"البطاطا المهروسة",desc:"اغلِ البطاطا واهرسها مع الزبدة والكريمة. تبّلها جيداً."},
      {title:"الفرن",desc:"ضع الحشوة في طبق. غطِّه بالهريس. اشوِه على 200 درجة 25 دقيقة حتى يذهب."}]},
  r12:{
    ingredients:["300 غ ضأن مشرّح رقيقاً","300 مل مرق داشي أو دجاج","4 م.ك صلصة صويا","3 م.ك ميرين","2 م.ك سيك","1 م.ك سكر","توفو وفطر وشعيرية وبصل أخضر","بيض مسلوق ناعم للتقديم"],
    steps:[
      {title:"المرق",desc:"اطبخ البصل في الداشي والصويا والميرين والسيك والسكر 10 دقائق."},
      {title:"اللحم",desc:"أضف شرائح الضأن. اطبخها 2–3 دقائق فقط."},
      {title:"التذوق",desc:"تذوّق المرق — يجب أن يكون حلو-مالح. عدّل الصويا أو السكر."},
      {title:"التجميع",desc:"ضع الأرز في الأوعية. قدّم الضأن والبصل مع المرق."},
      {title:"التزيين",desc:"أضف بيضة ناعمة (6,5 دقيقة) وزنجبيل مخلّل وبصلاً أخضر."}]},
  b1:{
    ingredients:["400 غ ريبآي ستيك (3 سم على الأقل)","ملح بحر خشن","فلفل أسود مطحون خشن","3 م.ك زبدة","4 فصوص ثوم مسحوقة","أغصان زعتر طازج","شحم لحم بقري أو زيت عالي الدخان"],
    steps:[
      {title:"التجفيف والتتبيل",desc:"جفّف الستيك تماماً. أضف الملح فقط قبل 45 دقيقة من الطهي. الفلفل مباشرة قبل المقلاة."},
      {title:"مقلاة ساخنة جداً",desc:"سخّن مقلاة الحديد الزهر على أعلى نار 3 دقائق حتى تدخّن."},
      {title:"التحمير الأول",desc:"أضف قطرة شحم. ضع الستيك. لا تحرّكه 2,5 دقيقة لتكوين قشرة."},
      {title:"دهن الزبدة",desc:"اقلبه. أضف الزبدة والثوم والزعتر فوراً. أمِّل المقلاة وارشِّه باستمرار 2 دقيقة."},
      {title:"الراحة",desc:"اتركه يرتاح على شبكة 8 دقائق. شرّحه عكس الألياف ورشّ فوقه زبدة المقلاة."}]},
  b2:{
    ingredients:["600 غ لحم بقري مفروم (20% دهون)","8 شرائح جبن أمريكي","4 خبز بريوش","خسّ مشرّح","مخللات مشرّحة","صلصة البرغر: مايونيز، كاتشب، خردل، خل مخلل، بابريكا"],
    steps:[
      {title:"كرات لا دوائر",desc:"قسّم اللحم إلى كرات 150 غ فضفاضة. لا تضغطها ولا تتبّلها بعد."},
      {title:"صفيحة ساخنة جداً",desc:"سخّن صفيحة ثقيلة أو مقلاة حديد زهر على أعلى نار. ادهنها قليلاً."},
      {title:"السحق",desc:"ضع الكرة على الصفيحة. اسحقها فوراً بالملعقة المسطّحة. أضف الملح. اطبخ 90 ثانية حتى تتقرمش الأطراف."},
      {title:"القلب والجبن",desc:"اقلبها مرة واحدة، ضع الجبن فوراً. اطبخ 45 ثانية. ارفعها."},
      {title:"التجميع",desc:"حمِّص الخبز. ادهنه بالصلصة. ارصف برغرين لكل حبة. قدّمها فوراً."}]},
  b3:{
    ingredients:["400 غ ريبآي سميك مع العظم","ملح خشن","فلفل أسود","ثوم بودرة","إكليل جبل طازج للدهن","زبدة"],
    steps:[
      {title:"التتبيل",desc:"تبّل الريبآي من جميع الجوانب بالملح والفلفل والثوم. ضعه مثالياً في الثلاجة مكشوفاً ليلة كاملة."},
      {title:"الشوي العكسي",desc:"للستيك السميك: اشوِه على 110 درجة 25 دقيقة حتى يصل الداخل إلى 45 درجة."},
      {title:"تسخين الشبكة",desc:"سخّن الشواية على أعلى حرارة ممكنة بينما يرتاح الستيك."},
      {title:"التحمير القوي",desc:"احمِّره على الشواية الحارة 2 دقيقة لكل جانب. احمِّر طبقة الدهن أيضاً."},
      {title:"الراحة",desc:"اتركه يرتاح 10 دقائق. أنهِه بنوبة زبدة."}]},
  b4:{
    ingredients:["800 غ صدر لحم بقري (بريسكت)","2 م.ك قهوة مطحونة","2 م.ك بابريكا مدخنة","1 م.ك سكر بني","1 م.ك فلفل أسود","1 م.ك ملح","1 م.ص ثوم بودرة","1 م.ص بصل بودرة"],
    steps:[
      {title:"الفرك الجاف",desc:"اخلط كل المكوّنات الجافة. ادهن البريسكت بسخاء من كل الجوانب. ضعه في الثلاجة مكشوفاً ليلة كاملة."},
      {title:"الطهي البطيء",desc:"اطبخه على 120 درجة (حرارة غير مباشرة أو فرن منخفض) 3–3,5 ساعات حتى يصل الداخل إلى 75 درجة."},
      {title:"التغليف",desc:"لفّه بإحكام بورق الجزار. اطبخه 1 ساعة إضافية حتى يصل إلى 92 درجة."},
      {title:"الراحة",desc:"اتركه يرتاح ملفوفاً ساعة على الأقل — إلزامي تماماً."},
      {title:"التقطيع",desc:"شرّحه عكس الألياف بسماكة قلم الرصاص. قدّمه مع المخللات والخبز الأبيض."}]},
  b5:{
    ingredients:["400 غ سيرلوين لحم بقري مشرّح رفيعاً","1 م.ص كمون","1 م.ص كزبرة","1 م.ص قرفة","½ م.ص هيل","½ م.ص كركم","3 م.ك خل","3 م.ك زيت زيتون","ثوم، خبز عربي، طماطم، لفت مخلّل، طحينة"],
    steps:[
      {title:"المارينيد",desc:"اخلط البهارات والخل والزيت والثوم. غلّف شرائح اللحم. تبّل ساعتين."},
      {title:"التكديس والشوي",desc:"كدّس الشرائح بإحكام على سيخ أو في قالب كيك. اشوِه على 220 درجة 25 دقيقة."},
      {title:"التقطيع الرفيع",desc:"قطّع شرائح رفيعة من الخارج."},
      {title:"التحمير",desc:"احمِّر الشرائح سريعاً في مقلاة ساخنة جداً دقيقة واحدة."},
      {title:"التجميع",desc:"سخّن الخبز العربي. ادهنه بالطحينة. أضف اللحم والطماطم واللفت المخلّل."}]},
  b6:{
    ingredients:["400 غ لحم بقري مفروم","1 بصلة مفرومة ناعماً","2 طماطم مكعبات","2 فلفل أخضر","1 م.ص كمون","1 م.ص كزبرة","½ م.ص قرفة","بقدونس طازج","4 أرغفة خبز عربي"],
    steps:[
      {title:"تحضير الحشوة",desc:"اجمع اللحم المفروم الخام مع كل المكوّنات — لا تطبخ اللحم أولاً."},
      {title:"الحشو",desc:"افتح الخبز العربي. احشُ نصفه بخليط اللحم الخام. اضغط النصف الآخر بإحكام."},
      {title:"القلي",desc:"في مقلاة جافة على نار متوسطة، اطبخ الخبز المحشو 6–7 دقائق لكل جانب مع الضغط بالملعقة."},
      {title:"الفحص",desc:"يجب أن يكون الخبز مقرمشاً. اللحم بالداخل يجب أن يكون مطهواً تماماً."},
      {title:"التقديم",desc:"قطّعه أرباعاً. قدّمه مع سلطة طماطم طازجة وطحينة."}]},
  b7:{
    ingredients:["500 غ لحم بقري مكعبات","2 بصلة","4 فصوص ثوم","2 سم زنجبيل","3 م.ص مسحوق كاري مدراس","1 م.ص كركم","1 علبة طماطم مقطّعة","1 م.ك عجينة تمر هندي","أوراق كاري","زيت جوز الهند"],
    steps:[
      {title:"قاعدة الكاري",desc:"قلِّ البصل المفروم في زيت جوز الهند 15 دقيقة على نار منخفضة حتى يصبح بني غامق. أضف أوراق الكاري."},
      {title:"عجينة البهارات",desc:"أضف عجينة الزنجبيل والثوم وكل البهارات الجافة. قلِّ 3 دقائق حتى يفصل الزيت."},
      {title:"اللحم البقري",desc:"أضف مكعبات اللحم. احمِّرها من جميع الجوانب 8 دقائق على نار عالية."},
      {title:"الطهي",desc:"أضف الطماطم والتمر الهندي. غطِّ واطبخ على نار هادئة 30–35 دقيقة حتى يصبح اللحم طرياً جداً."},
      {title:"الإنهاء",desc:"اكشف واطبخ 5 دقائق للتكثيف. قدّمه مع الأرز أو الباراثا."}]},
  b8:{
    ingredients:["500 غ لحم بقري مفروم","1 بصلة مبشورة","3 فصوص ثوم","2 سم زنجبيل مبشور","1 م.ص غرام ماسالا","1 م.ص كمون","½ م.ص فلفل حار","كزبرة ونعناع طازجَين","1 م.ك دقيق حمّص","ملح"],
    steps:[
      {title:"الخلط",desc:"اجمع كل المكوّنات. اعجنها دقيقتين. ضعها في الثلاجة 30 دقيقة."},
      {title:"السيخ",desc:"يدان مبلّلتان. قسّمها إلى 8. شكّلها على أسياخ معدنية مسطّحة في أسطوانات بطول 15 سم."},
      {title:"الشوي",desc:"اشوِ على نار عالية مع التقليب كل 2 دقيقة. إجمالي الطهي 10–12 دقيقة."},
      {title:"التحمير",desc:"ارفع إلى أعلى حرارة آخر دقيقتين للحصول على بقع متفحّمة."},
      {title:"التقديم",desc:"قدّمه مع صلصة النعناع والبصل بعصير الليمون والنان الدافئ."}]},
  b9:{
    ingredients:["300 غ سيرلوين لحم بقري مشرّح رقيقاً كالورق","1 بصلة كبيرة مشرّحة","300 مل مرق داشي أو دجاج","4 م.ك صلصة صويا","3 م.ك ميرين","2 م.ك سيك","1 م.ك سكر","أرز ياباني على البخار","زنجبيل مخلّل، بيضة ناعمة"],
    steps:[
      {title:"طهي البصل",desc:"اطبخ البصل في الداشي والصويا والميرين والسيك والسكر 10 دقائق حتى يصبح شفافاً."},
      {title:"إضافة اللحم",desc:"أضف شرائح اللحم الرقيقة جداً. اطبخها 2–3 دقائق فقط."},
      {title:"التذوق",desc:"تذوّق المرق — يجب أن يكون حلو-مالح. عدّل حسب ذوقك."},
      {title:"التجميع",desc:"ضع الأرز في الأوعية. اسكب اللحم والبصل مع مرق وفير."},
      {title:"التزيين",desc:"أضف بيضة ناعمة (6,5 دقيقة) وزنجبيلاً مخلّلاً وبصلاً أخضر."}]},
  b10:{
    ingredients:["500 غ عظام لحم بقري أو لحم للطهي البطيء","200 غ شعيرية أرز","1 بصلة محمّصة","5 سم زنجبيل محمّص","3 نجوم يانسون","3 قرنفل","1 عصا قرفة","صلصة سمك","رشادة وريحان وليمون وفلفل حار للتقديم"],
    steps:[
      {title:"تحمير البهارات العطرية",desc:"احرق البصل والزنجبيل مباشرة على اللهب أو تحت الشواية حتى تتفحّم. هذا يعطي عمق الفو الدخاني."},
      {title:"تحميص البهارات",desc:"حمِّص اليانسون والقرنفل والقرفة في مقلاة جافة دقيقة واحدة حتى تفوح رائحتها."},
      {title:"المرق",desc:"اطبخ العظام مع الخضروات المحمّصة والبهارات وصلصة السمك ساعة كاملة. اقشط المرق باستمرار."},
      {title:"التصفية",desc:"صفِّ المرق — يجب أن يكون صافياً كالكريستال. تبّله بصلصة السمك والسكر."},
      {title:"التقديم",desc:"انقع الشعيرية. ضعها في الأوعية. اسكب المرق الساخن. أضف شرائح اللحم الخام — تطهو في المرق."}]},
  b11:{
    ingredients:["400 غ فيليه لحم بقري","200 غ فطر مشكّل مفروم ناعماً","4 شرائح برزاولا أو لحم","1 عجينة مورّقة جاهزة","1 م.ك خردل ديجون","1 صفار بيض","ملح وفلفل","زعتر"],
    steps:[
      {title:"التحمير",desc:"احمِّر الفيليه في مقلاة ساخنة جداً من جميع الجوانب — دقيقة لكل جانب. اتركه يرتاح وادهنه بالديجون."},
      {title:"الديكسيل",desc:"اطبخ الفطر مع الزعتر على نار عالية حتى يجفّ تماماً — نحو 15 دقيقة."},
      {title:"اللف",desc:"رتّب البرزاولا على غلاف بلاستيكي. افرد الفطر فوقها. لفّ الفيليه بإحكام. ضعه في الثلاجة 20 دقيقة."},
      {title:"العجين المورّق",desc:"افرد العجينة. ضع لفّة الفيليه على الحافة. لفّها بإحكام. أغلق الأطراف. ادهنها بصفار البيض."},
      {title:"الفرن",desc:"اشوِه على 220 درجة 25–28 دقيقة للنضج المتوسط. اتركه يرتاح 10 دقائق قبل التشريح."}]},
  b12:{
    ingredients:["500 غ لحم بقري مفروم ناعماً جداً","200 غ برغل منقوع","1 بصلة","1 م.ص بهار حلو","½ م.ص قرفة","½ م.ص كمون","ملح","صنوبر وزبيب للحشو"],
    steps:[
      {title:"الخليط الخارجي",desc:"خلّط اللحم والبرغل المنقوع والبصل والبهارات في الخلاّط حتى يصبح ناعماً."},
      {title:"الحشو",desc:"قلِّ اللحم المفروم المتبقّي مع الصنوبر والزبيب والبهارات."},
      {title:"التشكيل",desc:"يدان مبلّلتان. خذ من الخليط الخارجي، أفرغ وسطه، احشه، أغلقه بشكل طربيد."},
      {title:"القلي",desc:"قلِّه في زيت ساخن 3–4 دقائق لكل جانب حتى يذهب بشكل غامق."},
      {title:"التقديم",desc:"قدّمه مع الزبادي الطبيعي والنعناع الطازج."}]},
  a1:{
    ingredients:["1 دجاجة كاملة","400 غ سيرلوين لحم بقري","خضروات للشوي: جزر، بصل، جذر البقدونس","بطاطا للشوي","زعتر وإكليل جبل طازجَين","زبدة","مرق لحم بقري للصلصة"],
    steps:[
      {title:"التخطيط",desc:"ابدأ باللحم البقري — يحتاج وقتاً أطول. تبّل كلاهما بالملح ساعة قبل الطهي."},
      {title:"شوي الدجاج",desc:"احشِ الجوف بالأعشاب والليمون. ادهنه بالزبدة. اشوِه على 200 درجة ساعة و15 دقيقة."},
      {title:"شوي اللحم",desc:"احمِّر السيرلوين في مقلاة. اشوِه على 200 درجة 20 دقيقة لكل 500 غ للنضج المتوسط. اتركه يرتاح 15 دقيقة."},
      {title:"الخضروات",desc:"اسلق البطاطا 7 دقائق. اشوِها في دهن اللحم على 220 درجة 40 دقيقة حتى تتقرمش."},
      {title:"الصلصة",desc:"قشّر الصواني بالنبيذ الأحمر ومرق اللحم. قلّله وصفِّه. تبّل."}]},
  a2:{
    ingredients:["أرجل وصدر دجاج","سيرلوين لحم بقري","قطع ضأن","زيت زيتون، ملح، فلفل","ليمون","أعشاب طازجة","خبز مشوي وسلطة"],
    steps:[
      {title:"تسلسل الطهي",desc:"ابدأ بقطع الضأن (15 دقيقة)، ثم اللحم (10 دقائق)، ثم الدجاج (20 دقيقة). تدرّج في البدايات."},
      {title:"التتبيل",desc:"تبّل ببساطة — زيت زيتون وملح وفلفل. دع جودة اللحم تتكلم."},
      {title:"شوي الدجاج",desc:"اشوِ الأرجل على حرارة غير مباشرة 20 دقيقة، أنهِها 5 دقائق على مباشرة."},
      {title:"اللحم والضأن",desc:"اشوِ السيرلوين 3 دقائق لكل جانب. اشوِ القطع 3 دقائق لكل جانب. اتركها جميعاً ترتاح."},
      {title:"الطبق",desc:"رتّب على لوح كبير مع الليمون المشوي والأعشاب الطازجة وسلطة كبيرة."}]},
  a3:{
    ingredients:["أرجل دجاج كاملة","سيرلوين لحم بقري","قطع ضأن","لحم مفروم للبرغر","مزيج بهارات BBQ","طلاء عسل","خبز البرغر والإضافات"],
    steps:[
      {title:"التحضير المسبق",desc:"تبّل الدجاج من الليلة السابقة. شكّل برغر، ضعها في الثلاجة."},
      {title:"خطة التوقيت",desc:"دجاج 40 دقيقة، قطع الضأن 12 دقيقة، اللحم 8 دقائق، البرغر 10 دقائق. احسب بالعكس."},
      {title:"منطقتا الشواية",desc:"اضبط مناطق مباشرة وغير مباشرة. المنطقة البطيئة للدجاج، الساخنة للحم البقري."},
      {title:"الطهي بالموجات",desc:"الدجاج أولاً. أضف الضأن واللحم في آخر 15 دقيقة."},
      {title:"التقديم",desc:"رتّب الصلصات والسلطات والإضافات. دع الضيوف يبنون أطباقهم."}]},
  a4:{
    ingredients:["1 دجاجة كاملة مقطّعة","1 كغ بصل مشرّح رفيعاً","3 م.ك سماق","1 م.ص بهار حلو","½ م.ص قرفة","4 م.ك زيت زيتون","خبز مرقوق","صنوبر ولوز محمّص"],
    steps:[
      {title:"كرملة البصل",desc:"اطبخ شرائح البصل في زيت الزيتون على نار متوسطة-منخفضة 40 دقيقة حتى يصبح طرياً جداً وذهبياً. هذا هو روح الطبق."},
      {title:"تتبيل الدجاج",desc:"ادهن القطع بالسماق والبهار الحلو والقرفة والملح وزيت الزيتون."},
      {title:"الدمج",desc:"اخلط نصف البصل مع الدجاج. اشوِه على 200 درجة 35–40 دقيقة."},
      {title:"طبقة الخبز",desc:"ضع الخبز في طبق التقديم. غطِّه بالبصل المكرمل المتبقّي."},
      {title:"التقديم",desc:"ضع الدجاج المشوي فوق الخبز بالبصل. انثر المكسرات المحمّصة. رشّ زيت الزيتون."}]},
  a5:{
    ingredients:["400 غ قطع دجاج","300 غ قطع ضأن","500 غ أرز بسمتي","3 بصلات كبيرة","سمن","زعفران في حليب دافئ","خلطة بهارات برياني","نعناع وكزبرة طازجَين"],
    steps:[
      {title:"طهي اللحوم منفصلة",desc:"ابرز الدجاج في صلصة زبادي متبّلة 20 دقيقة. ابرز الضأن في صلصة منفصلة 35 دقيقة."},
      {title:"قلي البصل",desc:"قلِّ البصل المشرّح رفيعاً في السمن حتى يصبح بني غامق ومقرمشاً. يستغرق 25 دقيقة."},
      {title:"الأرز نصف المسلوق",desc:"اغلِ ماءً مملّحاً مع الهيل. اطبخ الأرز 6 دقائق بالضبط — صفِّه وهو لا يزال طفيف القساوة."},
      {title:"الطبقات",desc:"في القدر: دجاج، ثم ضأن، ثم أرز، ثم حليب الزعفران، ثم البصل والأعشاب."},
      {title:"الدَّم",desc:"أغلق بإحكام. اطبخ على نار هادئة جداً 25 دقيقة."}]},
  a6:{
    ingredients:["سيرلوين لحم بقري مشرّح رقيقاً كالورق","فيليه دجاج مشرّح رفيعاً","ضأن مشرّح رفيعاً","مرق متبّل: مرق، زنجبيل، ثوم، فلفل حار، صويا","شعيرية أرز، توفو، فطر","صلصات الغمس: معجون السمسم، هويسين، زيت الفلفل الحار"],
    steps:[
      {title:"تحضير المرق",desc:"اطبخ المرق مع الزنجبيل والثوم وعجينة الفلفل الحار والصويا وزيت السمسم. تذوّق وعدّل."},
      {title:"تقطيع اللحوم",desc:"ضع اللحوم في الفريزر 30 دقيقة ثم شرّحها رقيقة كالورق. رتّبها في أطباق حول الطاولة."},
      {title:"تجهيز الطاولة",desc:"ضع وعاء الهوت بوت الكهربائي أو الموقد المحمول في وسط الطاولة. رتّب كل المكوّنات حوله."},
      {title:"الصلصات",desc:"أوعية فردية: معجون سمسم مخفّف بالمرق، هويسين، زيت الفلفل الحار. كلٌّ يعدّل حسب ذوقه."},
      {title:"الطهي والأكل",desc:"كل شخص يطبخ قطعه بغمسها في المرق الساخن 30–60 ثانية."}]},
  a7:{
    ingredients:["سيرلوين لحم بقري مشرّح رفيعاً","فيليه دجاج","تتبيلة بولغوغي: صويا، كمثرى، سكر، سمسم","تتبيلة الدجاج: غوتشوجانغ، ثوم، سكر، زيت","أوراق خسّ، أرز، كيمتشي","صلصات وإضافات"],
    steps:[
      {title:"المارينيدات",desc:"حضّر التتبيلتين. تبّل اللحم البقري والدجاج منفصلَين على الأقل ساعتين."},
      {title:"التجهيز",desc:"سخّن مقلاة شواء أو شواية طاولة. حضّر الخسّ والأرز والكيمتشي والإضافات."},
      {title:"شوي اللحم البقري",desc:"اطبخ بولغوغي على دفعات على نار عالية، 2 دقيقة لكل جانب."},
      {title:"شوي الدجاج",desc:"اطبخ دجاج الغوتشوجانغ 4 دقائق لكل جانب حتى يصبح محمّراً ولامعاً."},
      {title:"لفائف السام",desc:"لفّ اللحم المشوي في أوراق الخسّ مع الأرز والكيمتشي والثوم وعجينة السامجانغ."}]},
  a8:{
    ingredients:["أرجل وصدر دجاج","قطع ضأن","200 مل زبادي طبيعي","2 م.ص ماسالا تندوري","1 م.ص كركم","1 م.ص بابريكا","عجينة زنجبيل-ثوم","عصير ليمون","صلصة نعناع، بصل مشرّح"],
    steps:[
      {title:"التشريح",desc:"اشرّح الدجاج والضأن بعمق لتتغلغل التتبيلة حتى العظم."},
      {title:"المارينيد",desc:"اخلط الزبادي وكل البهارات وعجينة الزنجبيل والثوم وعصير الليمون. غلّف تماماً."},
      {title:"التتبيل",desc:"ضعه في الثلاجة على الأقل 4 ساعات — الليل يحوّل اللحم."},
      {title:"الحرارة العالية",desc:"شواية أو فرن على أعلى درجة (250 درجة+). اطبخ الدجاج 25 دقيقة، الضأن 10 دقائق."},
      {title:"التقديم",desc:"رتّبه في طبق مع البصل المشرّح وأرباع الليمون وصلصة النعناع الطازجة."}]},
  a9:{
    ingredients:["1 دجاجة كاملة مفرودة","سيرلوين لحم بقري","قطع ضأن","صلصة بيري بيري: فلفل حار، ليمون، ثوم، زيت زيتون","كزبرة طازجة","خبز مشوي"],
    steps:[
      {title:"صلصة بيري بيري",desc:"خلّط الفلفل الحار الأحمر والثوم وعصير الليمون وزيت الزيتون والملح. تذوّق — يجب أن يكون حاراً."},
      {title:"تتبيل الدجاج",desc:"غلّف الدجاجة المفرودة بالبيري بيري. تبّل ساعتين على الأقل."},
      {title:"شوي الدجاج",desc:"اشوِ على حرارة غير مباشرة 35 دقيقة، أنهِها 5 دقائق على مباشرة. التفحّم أساسي."},
      {title:"شوي اللحم والضأن",desc:"تبّل ببساطة. اشوِ السيرلوين 3 دقائق لكل جانب، القطع 3 دقائق لكل جانب."},
      {title:"الطبق",desc:"شرّح كل شيء ورتّبه على لوح كبير. رشّ بيري بيري إضافياً، انثر الكزبرة."}]},
  a10:{
    ingredients:["فيليه دجاج للشاورما","ضأن مفروم للكفتة","لحم بقري للفتّة","حمّص وتبولة وفتّوش","خبز عربي","صلصة توم، طحينة، مخللات"],
    steps:[
      {title:"تحضير الدجاج",desc:"تبّل الدجاج ببهارات الشاورما. اشوِه وشرّحه."},
      {title:"الكفتة",desc:"اخلط الضأن المفروم مع البصل والبقدونس والكمون والقرفة. شكّله على أسياخ. اشوِه."},
      {title:"الفتة",desc:"قلِّ اللحم البقري المفروم المتبّل. رتّب الخبز المحمّص واللحم والزبادي والحمّص في طبقات."},
      {title:"الترتيب",desc:"رتّب كل شيء في أطباق صغيرة على كامل الطاولة."},
      {title:"المشاركة",desc:"المزة اجتماعي — الكل يأخذ ويشارك. قدّمه مع الخبز العربي."}]},
};

// Merge full translations into RECIPE_STEPS_T
Object.assign(RECIPE_STEPS_T.pt, PT_STEPS);
Object.assign(RECIPE_STEPS_T.ar, AR_STEPS);

function getRecipeSteps(lang, recipe) {
  const lookupLang = lang === 'lb' || lang === 'bs' ? 'de' : lang;
  const st = RECIPE_STEPS_T[lookupLang]?.[recipe.id];
  if (!st) return { ingredients: recipe.ingredients, steps: recipe.steps, hasFullTranslation: false };
  const hasIngredients = st.ingredients && st.ingredients.length > 0;
  const hasFullSteps = st.steps && st.steps[0]?.desc;
  const ingredients = hasIngredients ? st.ingredients : recipe.ingredients;
  const steps = hasFullSteps
    ? st.steps
    : recipe.steps.map((s, i) => ({
        title: st.steps?.[i]?.title || s.title,
        desc: s.desc,
      }));
  return { ingredients, steps, hasFullTranslation: hasFullSteps && hasIngredients };
}
const BOX_T = {
  en:{
    flock:{ name:"The Flock", tagline:"Pure poultry power", desc:"All bird, all day. Whole chicken, juicy legs and tender filets — the clean protein pick.", contents:{ lite:["1 whole chicken (1 kg)","4 chicken legs","200g chicken filets"], max:["2 whole chickens (2 kg)","6 chicken legs","500g chicken filets","4 turkey escalopes"], ultra:["3 whole chickens (3.5 kg)","10 chicken legs","1 kg chicken filets","6 turkey escalopes"] }},
    riot:{ name:"Red Riot",   tagline:"Beef meets lamb",       desc:"The boldest duo in the box. Heritage beef and aromatic lamb — for when you mean business.", contents:{ lite:["250g beef sirloin","200g minced beef","2 lamb chops"], max:["500g beef sirloin","400g minced beef","4 lamb chops","300g lamb shoulder"], ultra:["1 kg beef sirloin","800g minced beef","8 lamb chops","600g lamb shoulder","2 lamb racks"] }},
    bull:{ name:"The Bull",   tagline:"Beef. Just beef.",      desc:"No distractions. No compromises. Premium dry-aged beef cuts for the serious carnivore.", contents:{ lite:["200g ribeye steak","300g minced beef","150g beef tenderloin"], max:["400g ribeye steak","600g minced beef","300g beef tenderloin","300g beef sirloin"], ultra:["800g ribeye steak","1.2 kg minced beef","600g beef tenderloin","600g beef sirloin","400g slow-cook beef"] }},
    crown:{ name:"The Crown", tagline:"The complete box", desc:"The whole show — poultry, beef and lamb. Maximum variety, maximum satisfaction.", contents:{ lite:["1 whole chicken","200g beef sirloin","2 lamb chops","200g minced beef"], max:["2 whole chickens","400g beef sirloin","4 lamb chops","400g minced beef","4 chicken legs","2 lamb chops"], ultra:["3 whole chickens","800g beef sirloin","8 lamb chops","800g minced beef","8 chicken legs","300g beef tenderloin","500g lamb shoulder"] }},
  },
  fr:{
    flock:{ name:"The Flock", tagline:"Pur pouvoir volaille", desc:"Tout en volaille, toujours. Poulet entier, cuisses juteuses et filets tendres — le choix protéines sain.", contents:{ lite:["1 poulet entier (1 kg)","4 cuisses de poulet","200g de filets de poulet"], max:["2 poulets entiers (2 kg)","6 cuisses de poulet","500g de filets de poulet","4 escalopes de dinde"], ultra:["3 poulets entiers (3,5 kg)","10 cuisses de poulet","1 kg de filets de poulet","6 escalopes de dinde"] }},
    riot:{ name:"Red Riot",   tagline:"Le bœuf rencontre l'agneau", desc:"Le duo le plus audacieux de la boîte. Bœuf de race et agneau aromatique — pour les sérieux.", contents:{ lite:["250g de faux-filet de bœuf","200g de bœuf haché","2 côtelettes d'agneau"], max:["500g de faux-filet de bœuf","400g de bœuf haché","4 côtelettes d'agneau","300g d'épaule d'agneau"], ultra:["1 kg de faux-filet de bœuf","800g de bœuf haché","8 côtelettes d'agneau","600g d'épaule d'agneau","2 carrés d'agneau"] }},
    bull:{ name:"The Bull",   tagline:"Bœuf. Juste du bœuf.", desc:"Pas de distraction. Pas de compromis. Des coupes de bœuf affinées premium pour le carnivore sérieux.", contents:{ lite:["200g d'entrecôte","300g de bœuf haché","150g de filet de bœuf"], max:["400g d'entrecôte","600g de bœuf haché","300g de filet de bœuf","300g de faux-filet"], ultra:["800g d'entrecôte","1,2 kg de bœuf haché","600g de filet de bœuf","600g de faux-filet","400g de bœuf à braiser"] }},
    crown:{ name:"The Crown", tagline:"Tout, déchaîné", desc:"Le spectacle complet — volaille, bœuf et agneau. Variété maximale, satisfaction maximale.", contents:{ lite:["1 poulet entier","200g de faux-filet de bœuf","2 côtelettes d'agneau","200g de bœuf haché"], max:["2 poulets entiers","400g de faux-filet de bœuf","4 côtelettes d'agneau","400g de bœuf haché","4 cuisses de poulet","2 côtelettes d'agneau"], ultra:["3 poulets entiers","800g de faux-filet de bœuf","8 côtelettes d'agneau","800g de bœuf haché","8 cuisses de poulet","300g de filet de bœuf","500g d'épaule d'agneau"] }},
  },
  de:{
    flock:{ name:"The Flock", tagline:"Reine Geflügelpower", desc:"Alles Geflügel, den ganzen Tag. Ganzes Hähnchen, saftige Keulen und zarte Filets — die saubere Proteinwahl.", contents:{ lite:["1 ganzes Hähnchen (1 kg)","4 Hähnchenkeulen","200g Hähnchenfilets"], max:["2 ganze Hähnchen (2 kg)","6 Hähnchenkeulen","500g Hähnchenfilets","4 Putenschnitzel"], ultra:["3 ganze Hähnchen (3,5 kg)","10 Hähnchenkeulen","1 kg Hähnchenfilets","6 Putenschnitzel","2 Entenbrustfilets"] }},
    riot:{ name:"Red Riot",   tagline:"Rind trifft Lamm",   desc:"Das kühnste Duo in der Box. Heritage-Rindfleisch und aromatisches Lamm — für die Ernsthaften.", contents:{ lite:["250g Rindersirloin","200g Rinderhackfleisch","2 Lammkoteletts"], max:["500g Rindersirloin","400g Rinderhackfleisch","4 Lammkoteletts","300g Lammschulter"], ultra:["1 kg Rindersirloin","800g Rinderhackfleisch","8 Lammkoteletts","600g Lammschulter","2 Lammkarrees"] }},
    bull:{ name:"The Bull",   tagline:"Rind. Nur Rind.",     desc:"Keine Ablenkung. Kein Kompromiss. Premium trockengereifte Rindfleischcuts für den ernsthaften Fleischliebhaber.", contents:{ lite:["200g Ribeye-Steak","300g Rinderhackfleisch","150g Rinderfilet"], max:["400g Ribeye-Steak","600g Rinderhackfleisch","300g Rinderfilet","300g Rindersirloin"], ultra:["800g Ribeye-Steak","1,2 kg Rinderhackfleisch","600g Rinderfilet","600g Rindersirloin","400g Schmorfleisch"] }},
    crown:{ name:"The Crown", tagline:"Die komplette Box",  desc:"Die ganze Show — Geflügel, Rind und Lamm. Maximale Vielfalt, maximale Zufriedenheit.", contents:{ lite:["1 ganzes Hähnchen","200g Rindersirloin","2 Lammkoteletts","200g Rinderhackfleisch"], max:["2 ganze Hähnchen","400g Rindersirloin","4 Lammkoteletts","400g Rinderhackfleisch","4 Hähnchenkeulen","2 Lammkoteletts"], ultra:["3 ganze Hähnchen","800g Rindersirloin","8 Lammkoteletts","800g Rinderhackfleisch","8 Hähnchenkeulen","300g Rinderfilet","500g Lammschulter"] }},
  },
  lb:{
    flock:{ name:"The Flock", tagline:"Reng Gefligel Kraaft", desc:"Nëmmen Gefligel, den ganzen Dag. Ganze Poulet, safteg Schenkelen a zarte Filets — déi propper Protein-Wiel.", contents:{ lite:["1 ganze Poulet (1 kg)","4 Poulet-Schenkelen","200g Poulet-Filets"], max:["2 ganz Poulet (2 kg)","6 Poulet-Schenkelen","500g Poulet-Filets","4 Truthahn-Escalopen"], ultra:["3 ganz Poulet (3,5 kg)","10 Poulet-Schenkelen","1 kg Poulet-Filets","6 Truthahn-Escalopen"] }},
    riot:{ name:"Red Riot",   tagline:"Rëndfleesch treffe Lamm", desc:"Daat déifste Duo an der Box. Rëndfleesch a aromesch Lamm — fir wann Dir et ernst mannt.", contents:{ lite:["250g Rëndfleesch Sirloin","200g Rëndfleesch gehackt","2 Lammkoteletten"], max:["500g Rëndfleesch Sirloin","400g Rëndfleesch gehackt","4 Lammkoteletten","300g Lammschëller"], ultra:["1 kg Rëndfleesch Sirloin","800g Rëndfleesch gehackt","8 Lammkoteletten","600g Lammschëller","2 Lamm-Karrée"] }},
    bull:{ name:"The Bull",   tagline:"Rëndfleesch. Nëmmen Rëndfleesch.", desc:"Keng Ablenkung. Kee Kompromëss. Premium gerëften Rëndfleesch-Stécker fir de serious Fleesch-Liebhaber.", contents:{ lite:["200g Ribeye Steak","300g Rëndfleesch gehackt","150g Filet Mignon"], max:["400g Ribeye Steak","600g Rëndfleesch gehackt","300g Filet Mignon","300g Rëndfleesch Sirloin"], ultra:["800g Ribeye Steak","1,2 kg Rëndfleesch gehackt","600g Filet Mignon","600g Rëndfleesch Sirloin","400g Schmorfleisch"] }},
    crown:{ name:"The Crown", tagline:"Die komplette Box", desc:"Déi ganz Show — Gefligel, Rëndfleesch a Lamm. Maximal Varietéit, maximal Zefriddenheet.", contents:{ lite:["1 ganze Poulet","200g Rëndfleesch Sirloin","2 Lammkoteletten","200g Rëndfleesch gehackt"], max:["2 ganz Poulet","400g Rëndfleesch Sirloin","4 Lammkoteletten","400g Rëndfleesch gehackt","4 Poulet-Schenkelen","2 Lammkoteletten"], ultra:["3 ganz Poulet","800g Rëndfleesch Sirloin","8 Lammkoteletten","800g Rëndfleesch gehackt","8 Poulet-Schenkelen","300g Filet Mignon","500g Lammschëller"] }},
  },
  bs:{
    flock:{ name:"The Flock", tagline:"Čista snaga peradi", desc:"Samo perad, cijeli dan. Cijela piletina, sočni bataci i nježni fileti — čist proteinski izbor.", contents:{ lite:["1 cijela piletina (1 kg)","4 pileća bataka","200g pilećih fileta"], max:["2 cijele piletine (2 kg)","6 pilećih bataka","500g pilećih fileta","4 purića eskalopa"], ultra:["3 cijele piletine (3,5 kg)","10 pilećih bataka","1 kg pilećih fileta","6 purića eskalopa"] }},
    riot:{ name:"Red Riot", tagline:"Govedina sreće jagnje", desc:"Najsmjeliji duo u kutiji. Govedina i aromatična jagnjetina — za kad mislite ozbiljno.", contents:{ lite:["250g goveđeg bifteka","200g mljevene govedine","2 jagnjeća kotleta"], max:["500g goveđeg bifteka","400g mljevene govedine","4 jagnjeća kotleta","300g jagnjeće plećke"], ultra:["1 kg goveđeg bifteka","800g mljevene govedine","8 jagnjećih kotleta","600g jagnjeće plećke","2 jagnjeća rebra"] }},
    bull:{ name:"The Bull", tagline:"Govedina. Samo govedina.", desc:"Bez ometanja. Bez kompromisa. Premium odležana govedina za ozbiljne mesojede.", contents:{ lite:["200g ribeye odreska","300g mljevene govedine","150g goveđeg filea"], max:["400g ribeye odreska","600g mljevene govedine","300g goveđeg filea","300g goveđeg bifteka"], ultra:["800g ribeye odreska","1,2 kg mljevene govedine","600g goveđeg filea","600g goveđeg bifteka","400g govedine za sporo kuhanje"] }},
    crown:{ name:"The Crown", tagline:"Kompletna kutija", desc:"Cijela predstava — perad, govedina i jagnjetina. Maksimalna raznolikost, maksimalno zadovoljstvo.", contents:{ lite:["1 cijela piletina","200g goveđeg bifteka","2 jagnjeća kotleta","200g mljevene govedine"], max:["2 cijele piletine","400g goveđeg bifteka","4 jagnjeća kotleta","400g mljevene govedine","4 pileća bataka"], ultra:["3 cijele piletine","800g goveđeg bifteka","8 jagnjećih kotleta","800g mljevene govedine","8 pilećih bataka","300g goveđeg filea","500g jagnjeće plećke"] }},
  },
  pt:{
    flock:{ name:"The Flock", tagline:"Poder puro de aves",  desc:"Só aves, sempre. Frango inteiro, pernas suculentas e filets tenros — a escolha proteica limpa.", contents:{ lite:["1 frango inteiro (1 kg)","4 pernas de frango","200g de filets de frango"], max:["2 frangos inteiros (2 kg)","6 pernas de frango","500g de filets de frango","4 escalopes de peru"], ultra:["3 frangos inteiros (3,5 kg)","10 pernas de frango","1 kg de filets de frango","6 escalopes de peru","2 filets de peito de pato"] }},
    riot:{ name:"Red Riot",   tagline:"Vaca encontra borrego", desc:"O duo mais ousado da caixa. Vaca de raça e borrego aromático — para quem leva a sério.", contents:{ lite:["250g de lombo de vaca","200g de carne picada de vaca","2 costeletas de borrego"], max:["500g de lombo de vaca","400g de carne picada de vaca","4 costeletas de borrego","300g de pá de borrego"], ultra:["1 kg de lombo de vaca","800g de carne picada de vaca","8 costeletas de borrego","600g de pá de borrego","2 carrés de borrego"] }},
    bull:{ name:"The Bull",   tagline:"Vaca. Só vaca.",       desc:"Sem distrações. Sem compromissos. Cortes de vaca maturada premium para o carnívoro a sério.", contents:{ lite:["200g de bife entrecosto","300g de carne picada de vaca","150g de filet mignon"], max:["400g de bife entrecosto","600g de carne picada de vaca","300g de filet mignon","300g de lombo de vaca"], ultra:["800g de bife entrecosto","1,2 kg de carne picada de vaca","600g de filet mignon","600g de lombo de vaca","400g de carne para estufar"] }},
    crown:{ name:"The Crown", tagline:"A caixa completa",  desc:"O espectáculo completo — aves, vaca e borrego. Variedade máxima, satisfação máxima.", contents:{ lite:["1 frango inteiro","200g de lombo de vaca","2 costeletas de borrego","200g de carne picada de vaca"], max:["2 frangos inteiros","400g de lombo de vaca","4 costeletas de borrego","400g de carne picada de vaca","4 pernas de frango","2 costeletas de borrego"], ultra:["3 frangos inteiros","800g de lombo de vaca","8 costeletas de borrego","800g de carne picada de vaca","8 pernas de frango","300g de filet mignon","500g de pá de borrego"] }},
  },
  ar:{
    flock:{ name:"قطيع الدواجن", tagline:"قوة الدواجن الخالصة", desc:"دواجن فقط، طوال اليوم. دجاج كامل، أرجل طرية وفيليه طازج — الاختيار البروتيني الصحي الأمثل.", contents:{ lite:["1 دجاجة كاملة (1 كغ)","4 أرجل دجاج","200 غ فيليه دجاج"], max:["2 دجاجة كاملة (2 كغ)","6 أرجل دجاج","500 غ فيليه دجاج","4 شرائح ديك رومي"], ultra:["3 دجاجات كاملة (3.5 كغ)","10 أرجل دجاج","1 كغ فيليه دجاج","6 شرائح ديك رومي","2 فيليه صدر بط"] }},
    riot:{ name:"الفوضى الحمراء", tagline:"لحم البقر يلتقي الضأن", desc:"الثنائي الأجرأ في الصندوق. لحم بقري أصيل وضأن عطري — للشغوفين الحقيقيين باللحوم.", contents:{ lite:["250 غ سيرلوين لحم بقري","200 غ لحم بقري مفروم","2 قطعة لحم ضأن"], max:["500 غ سيرلوين لحم بقري","400 غ لحم بقري مفروم","4 قطع لحم ضأن","300 غ كتف ضأن"], ultra:["1 كغ سيرلوين لحم بقري","800 غ لحم بقري مفروم","8 قطع لحم ضأن","600 غ كتف ضأن","2 كاريه ضأن"] }},
    bull:{ name:"الثور", tagline:"لحم بقري. فقط لحم بقري.", desc:"بلا تشتيت. بلا تنازلات. أفضل قطع اللحم البقري المعتّق للمتذوق الحقيقي.", contents:{ lite:["200 غ ريبآي ستيك","300 غ لحم بقري مفروم","150 غ فيليه لحم بقري"], max:["400 غ ريبآي ستيك","600 غ لحم بقري مفروم","300 غ فيليه لحم بقري","300 غ سيرلوين لحم بقري"], ultra:["800 غ ريبآي ستيك","1.2 كغ لحم بقري مفروم","600 غ فيليه لحم بقري","600 غ سيرلوين لحم بقري","400 غ لحم للطهي البطيء"] }},
    crown:{ name:"الوحش الكامل", tagline:"الصندوق الكامل", desc:"العرض الكامل — دواجن ولحم بقري وضأن. أقصى تنوع، أقصى رضا.", contents:{ lite:["1 دجاجة كاملة","200 غ سيرلوين لحم بقري","2 قطعة لحم ضأن","200 غ لحم بقري مفروم"], max:["2 دجاجة كاملة","400 غ سيرلوين لحم بقري","4 قطع لحم ضأن","400 غ لحم بقري مفروم","4 أرجل دجاج","2 قطعة لحم ضأن"], ultra:["3 دجاجات كاملة","800 غ سيرلوين لحم بقري","8 قطع لحم ضأن","800 غ لحم بقري مفروم","8 أرجل دجاج","300 غ فيليه لحم بقري","500 غ كتف ضأن"] }},
  },
};

/* ─── RECIPE METADATA TRANSLATIONS ──────────────────────────────────────── */
const RECIPE_META_T = {
  en:{
    f1:{name:"Roast Whole Chicken",desc:"The Sunday classic. Crispy skin, juicy meat, unbeatable aroma.",tip:"Rub herb butter under the skin before roasting for next-level flavour."},
    f2:{name:"Pan-Seared Chicken Filets",desc:"Weeknight hero. Golden outside, impossibly juicy inside.",tip:"Never press down on chicken in the pan — it squeezes out the juices."},
    f3:{name:"BBQ Spatchcock Chicken",desc:"Butterflied for faster, even cooking. Maximum char, maximum flavour.",tip:"Brining overnight in salted water gives you ultra-juicy BBQ chicken."},
    f4:{name:"Smoky BBQ Chicken Legs",desc:"Falling-off-the-bone tender with a sticky, caramelised BBQ glaze.",tip:"Save the marinade, reduce it in a pan and serve as extra dipping sauce."},
    f5:{name:"Chicken Shawarma",desc:"The legendary Levantine street food. Spiced, juicy, absolutely addictive.",tip:"A few drops of pomegranate molasses in the marinade adds incredible depth."},
    f6:{name:"Shish Tawook",desc:"Lebanese grilled chicken skewers — tender, aromatic, flame-kissed.",tip:"Toum (Lebanese garlic sauce) is non-negotiable. Blend garlic, oil, lemon and salt."},
    f7:{name:"Chicken Tikka Masala",desc:"The world's most beloved curry. Smoky chicken in a velvety tomato cream sauce.",tip:"Charring the chicken before adding to sauce is the secret to authentic tikka masala."},
    f8:{name:"Chicken Biryani",desc:"The king of rice dishes. Aromatic basmati layered with spiced chicken.",tip:"Never skip the dum (steam) stage — it's what makes biryani biryani."},
    f9:{name:"Teriyaki Chicken",desc:"Sticky, glossy, sweet-savoury perfection. The Japanese classic.",tip:"Score the chicken so it stays flat and the glaze clings to every crevice."},
    f10:{name:"Thai Basil Chicken",desc:"Thailand's most popular street food. 15 minutes, explosive flavour.",tip:"The high heat is everything. If your pan isn't smoking, it's not hot enough."},
    f11:{name:"Lemon Herb Grilled Chicken",desc:"Bright, zesty and smoky. A crowd-pleasing BBQ classic.",tip:"Squeeze the grilled lemon over the chicken just before eating for maximum brightness."},
    f12:{name:"Moroccan Chicken Tagine",desc:"Slow-cooked with preserved lemon, olives and aromatic spices.",tip:"Preserved lemon is the soul of this dish — find it in Middle Eastern shops."},
    r1:{name:"Classic Grilled Lamb Chops",desc:"Simple, perfect, timeless. The best lamb chops you'll ever make.",tip:"Medium-rare is 57°C internal. A meat thermometer is the best kitchen investment."},
    r2:{name:"Beef & Lamb Kofta",desc:"Middle-Eastern spiced meatballs on skewers. Packed with cumin and herbs.",tip:"Grating rather than chopping the onion prevents kofta from falling apart."},
    r3:{name:"BBQ Sirloin with Chimichurri",desc:"Argentine-style grilled beef with vibrant green herb sauce.",tip:"Always slice beef against the grain — it shortens muscle fibres for tenderness."},
    r4:{name:"Smoky Lamb Shoulder Sliders",desc:"Low and slow smoked lamb shoulder, pulled and piled into soft buns.",tip:"The longer the rest after pulling, the more juices redistribute into the meat."},
    r5:{name:"Lamb Mansaf",desc:"Jordan's national dish. Lamb slow-cooked in yogurt sauce, served on flatbread.",tip:"Adding cornstarch to the yogurt prevents it splitting when heated."},
    r6:{name:"Beef Ouzi",desc:"Gulf-style slow-roasted beef over spiced rice with nuts and raisins.",tip:"Baharat is a blend of black pepper, coriander, cinnamon, cloves and nutmeg."},
    r7:{name:"Lamb Rogan Josh",desc:"The jewel of Kashmiri cuisine. Deeply aromatic, ruby-red lamb curry.",tip:"Kashmiri chilli gives the iconic red colour without intense heat."},
    r8:{name:"Keema Curry",desc:"Spiced minced beef with peas. The ultimate quick weeknight curry.",tip:"Cooking on high heat until mince is quite dry concentrates all the flavour."},
    r9:{name:"Korean Beef Bulgogi",desc:"Sweet, savoury, slightly smoky Korean BBQ beef. Best thing in a pan.",tip:"The grated Asian pear is the traditional tenderiser — absolutely worth finding."},
    r10:{name:"Mongolian Lamb Stir-Fry",desc:"Bold Chinese-American classic. Tender lamb with a glossy hoisin sauce.",tip:"Velveting is the restaurant secret that makes stir-fry meat tender, not chewy."},
    r11:{name:"Lamb Shepherd's Pie",desc:"The ultimate British comfort food. Slow-cooked lamb under golden mash.",tip:"Fork the mashed potato top before baking — it crisps up more."},
    r12:{name:"Japanese Lamb Sukiyaki",desc:"A warming Japanese hot pot with thinly sliced lamb in a sweet soy broth.",tip:"The raw egg dip is traditional and absolutely delicious — don't skip it."},
    b1:{name:"Perfect Cast Iron Ribeye",desc:"The definitive steakhouse ribeye at home. Crust like glass, pink inside.",tip:"Never cook a cold steak. Room temperature for 1 hour = even cooking throughout."},
    b2:{name:"Smash Burgers",desc:"The diner-style smash burger that changed burger culture forever.",tip:"20% fat mince is essential. Lean mince makes dry, sad burgers."},
    b3:{name:"Cowboy Ribeye on the Bone",desc:"Thick-cut, bone-in ribeye cooked over live fire. Prehistoric, magnificent.",tip:"The reverse-sear method gives perfect edge-to-edge doneness."},
    b4:{name:"Coffee-Rubbed BBQ Brisket",desc:"Dark, crackling bark outside. Meltingly tender inside.",tip:"If brisket temperature stalls around 70°C, push through — it WILL rise again."},
    b5:{name:"Beef Shawarma",desc:"The Levantine street food icon. Spiced sliced beef in flatbread.",tip:"The layering and roasting technique mimics a shawarma spit at home."},
    b6:{name:"Hawawshi (Stuffed Egyptian Bread)",desc:"Crispy Egyptian flatbread stuffed with spiced minced beef.",tip:"Using raw meat in the filling keeps it incredibly juicy."},
    b7:{name:"Beef Madras Curry",desc:"South Indian-style hot, tangy beef curry with a deep, complex sauce.",tip:"Tamarind is essential for the sour note that defines Madras — don't skip it."},
    b8:{name:"Beef Seekh Kebab",desc:"Charred minced beef kebabs spiced with ginger, chilli and garam masala.",tip:"Chickpea flour binds the kebab and adds a subtle nuttiness."},
    b9:{name:"Japanese Gyudon (Beef Bowl)",desc:"Tokyo's iconic beef and onion rice bowl. The fastest comfort food.",tip:"Ask your butcher to slice the sirloin paper-thin, or semi-freeze it to slice."},
    b10:{name:"Vietnamese Beef Pho",desc:"Vietnam's soul-warming noodle soup with a deeply fragrant, clear broth.",tip:"A great pho broth should be clear, not cloudy. Constant skimming is the key."},
    b11:{name:"Beef Wellington",desc:"The ultimate showstopper. Tenderloin wrapped in mushroom duxelles and golden pastry.",tip:"Refrigerating after wrapping is crucial — it holds the shape and keeps pastry crisp."},
    b12:{name:"Lebanese Beef Kibbeh",desc:"Lebanon's national dish — spiced minced beef in a bulgur wheat casing.",tip:"Keeping the outer mix very cold makes shaping much easier."},
    a1:{name:"Sunday Roast Feast",desc:"The full Sunday roast — chicken AND beef, all the trimmings.",tip:"Resting the beef is as important as cooking it. Never skip it."},
    a2:{name:"Mixed Grill Platter",desc:"The whole box on one platter. Every protein, perfectly cooked.",tip:"Let each piece rest before adding to the platter — a warm oven keeps everything hot."},
    a3:{name:"The Ultimate Garden Party BBQ",desc:"Chicken, beef, lamb — all on the grill at once. Feed a crowd.",tip:"Write out your timing plan before you start. Chaos kills a BBQ."},
    a4:{name:"Musakhan (Palestinian Roast Chicken)",desc:"Palestine's national dish. Chicken roasted with caramelised onion and sumac.",tip:"More sumac than you think. Be bold with it — it makes musakhan extraordinary."},
    a5:{name:"Crown Biryani",desc:"Mixed meat biryani — chicken and lamb layered with fragrant basmati.",tip:"Two separate meat preparations create an unmatchable depth of flavour."},
    a6:{name:"Hot Pot Night",desc:"Interactive Chinese hot pot — paper-thin meats cooked at the table.",tip:"Hot pot is an event, not just a meal. Dim the lights and let it run 2 hours."},
    a7:{name:"Korean BBQ Night",desc:"Korean BBQ at home — marinated meats grilled at the table.",tip:"The ssam wrap (lettuce cup) balances the richness of the meat perfectly."},
    a8:{name:"Mixed Tandoori Platter",desc:"A full tandoori platter — marinated chicken and lamb, char-grilled.",tip:"The yogurt marinade tenderises AND protects from fierce heat."},
    a9:{name:"Portuguese-Style BBQ Platter",desc:"Piri-piri chicken, grilled beef and lamb chops — a celebration on a board.",tip:"Good piri-piri should make you sweat a little — don't hold back on the chillies."},
    a10:{name:"Levantine Mezze Feast",desc:"A spread of small dishes centered around different meats — the social meal.",tip:"Mezze is designed to be slow and social. Set it all out and take your time."},
  },
  fr:{
    f1:{name:"Poulet rôti entier",desc:"Le classique du dimanche. Peau croustillante, viande juteuse, arôme imbattable.",tip:"Frottez du beurre aux herbes sous la peau avant la cuisson pour un goût exceptionnel."},
    f2:{name:"Filets de poulet poêlés",desc:"Le héros du soir de semaine. Doré dehors, incroyablement juteux dedans.",tip:"Ne jamais appuyer sur le poulet dans la poêle — cela exprime les jus."},
    f3:{name:"Poulet papillon au BBQ",desc:"Papillonné pour une cuisson plus rapide et uniforme. Charbon maximal, saveur maximale.",tip:"Faire tremper toute la nuit dans de l'eau salée donne un poulet BBQ ultra-juteux."},
    f4:{name:"Cuisses de poulet BBQ fumées",desc:"Tendres à tomber avec un glaçage BBQ caramélisé et collant.",tip:"Gardez la marinade, réduisez-la dans une casserole et servez comme sauce."},
    f5:{name:"Shawarma de poulet",desc:"Le légendaire street food levantin. Épicé, juteux, absolument addictif.",tip:"Quelques gouttes de mélasse de grenade dans la marinade ajoutent une profondeur incroyable."},
    f6:{name:"Chich Taouk",desc:"Brochettes de poulet grillées libanaises — tendres, aromatiques, grillées à la flamme.",tip:"Le toum (sauce à l'ail libanaise) est indispensable. Mixez ail, huile, citron et sel."},
    f7:{name:"Poulet Tikka Masala",desc:"Le curry le plus aimé au monde. Poulet fumé dans une sauce crémeuse tomate veloutée.",tip:"Carboniser le poulet avant de l'ajouter à la sauce est le secret du vrai tikka masala."},
    f8:{name:"Biryani de poulet",desc:"Le roi des plats de riz. Basmati aromatique en couches avec du poulet épicé.",tip:"Ne jamais sauter l'étape dum (vapeur) — c'est ce qui fait le biryani."},
    f9:{name:"Poulet Teriyaki",desc:"Collant, brillant, parfaitement sucré-salé. Le classique japonais.",tip:"Entaillez le poulet pour qu'il reste plat et que le glaçage adhère partout."},
    f10:{name:"Poulet au Basilic Thaï",desc:"Le street food le plus populaire de Thaïlande. 15 minutes, saveur explosive.",tip:"La chaleur intense est tout. Si votre poêle ne fume pas, elle n'est pas assez chaude."},
    f11:{name:"Poulet grillé citron-herbes",desc:"Vif, zesty et fumé. Un classique BBQ qui plaît à tous.",tip:"Pressez le citron grillé sur le poulet juste avant de manger pour un maximum de fraîcheur."},
    f12:{name:"Tajine de poulet marocain",desc:"Mijoté avec du citron confit, des olives et des épices aromatiques.",tip:"Le citron confit est l'âme de ce plat — trouvez-le dans les épiceries orientales."},
    r1:{name:"Côtelettes d'agneau grillées",desc:"Simple, parfait, intemporel. Les meilleures côtelettes d'agneau que vous ferez.",tip:"Saignant = 57°C à cœur. Un thermomètre à viande est le meilleur investissement cuisine."},
    r2:{name:"Kofta bœuf et agneau",desc:"Boulettes moyen-orientales épicées sur brochettes. Cumin, coriandre et herbes.",tip:"Râper plutôt que hacher l'oignon évite que les koftas ne se défassent."},
    r3:{name:"Sirloin BBQ avec Chimichurri",desc:"Bœuf grillé à l'argentine avec une sauce verte aux herbes vibrante.",tip:"Toujours trancher le bœuf contre le grain — raccourcit les fibres pour plus de tendreté."},
    r4:{name:"Sliders d'épaule d'agneau fumée",desc:"Épaule d'agneau cuite lentement, effilochée et empilée dans des petits pains.",tip:"Plus le repos après effilochage est long, plus les jus se redistribuent dans la viande."},
    r5:{name:"Mansaf d'agneau",desc:"Le plat national jordanien. Agneau mijoté dans la sauce au yaourt, servi sur pain.",tip:"Ajouter de la maïzena au yaourt évite qu'il ne se dissocie à la chaleur."},
    r6:{name:"Ouzi de bœuf",desc:"Bœuf rôti lentement à la façon du Golfe sur du riz épicé aux noix et raisins.",tip:"Le baharat est un mélange de poivre noir, coriandre, cannelle, clous de girofle et muscade."},
    r7:{name:"Rogan Josh d'agneau",desc:"Le joyau de la cuisine cachemirienne. Curry d'agneau rouge rubis profondément aromatique.",tip:"Le piment du Cachemire donne la couleur rouge iconique sans chaleur intense."},
    r8:{name:"Curry Keema",desc:"Bœuf haché épicé aux petits pois. Le curry rapide par excellence.",tip:"Cuire à feu vif jusqu'à ce que la viande soit bien sèche concentre toutes les saveurs."},
    r9:{name:"Bulgogi de bœuf coréen",desc:"Bœuf BBQ coréen sucré-salé légèrement fumé. La meilleure chose à mettre dans une poêle.",tip:"La poire asiatique râpée est l'attendrisseur traditionnel — vaut vraiment la peine."},
    r10:{name:"Sauté d'agneau à la mongole",desc:"Classique sino-américain audacieux. Agneau tendre avec une sauce hoisin brillante.",tip:"Le veloutage est le secret des restaurants pour une viande tendre et non caoutchouteuse."},
    r11:{name:"Shepherd's Pie à l'agneau",desc:"Le comfort food britannique ultime. Agneau mijoté sous une purée dorée.",tip:"Fourchettez le dessus de la purée avant d'enfourner — elle croustille davantage."},
    r12:{name:"Sukiyaki d'agneau japonais",desc:"Un chaud pot japonais réchauffant avec de l'agneau tranché fin dans un bouillon.",tip:"Le trempette dans l'oeuf cru est traditionnel et absolument délicieux."},
    b1:{name:"Parfait Ribeye en fonte",desc:"Le ribeye de steakhouse ultime à la maison. Croûte de verre, rose à l'intérieur.",tip:"Ne jamais cuire un steak froid. 1 heure à température ambiante = cuisson uniforme."},
    b2:{name:"Smash Burgers",desc:"Le smash burger style diner qui a révolutionné la culture burger.",tip:"La viande hachée à 20% de gras est essentielle. La viande maigre donne des burgers secs."},
    b3:{name:"Ribeye de cowboy à l'os",desc:"Ribeye épais à l'os cuit sur feu vif. Préhistorique, magnifique.",tip:"La méthode reverse-sear donne une cuisson parfaite de bord en bord."},
    b4:{name:"Brisket BBQ au café",desc:"Croûte sombre et craquante dehors. Fondant à l'intérieur.",tip:"Si la température du brisket stagne à 70°C, persévérez — elle REMONTERA."},
    b5:{name:"Shawarma de bœuf",desc:"L'icône du street food levantin. Bœuf épicé tranché dans du pain pita.",tip:"La technique d'empilement et rôtissage imite une broche à shawarma à la maison."},
    b6:{name:"Hawawshi (Pain égyptien farci)",desc:"Pain plat égyptien croustillant farci de bœuf haché épicé. Street food parfait.",tip:"Utiliser de la viande crue dans la farce la garde incroyablement juteuse."},
    b7:{name:"Curry Madras de bœuf",desc:"Curry de bœuf chaud et acidulé style Inde du Sud avec une sauce profonde.",tip:"Le tamarin est essentiel pour la note acidulée qui définit le Madras."},
    b8:{name:"Seekh Kebab de bœuf",desc:"Kebabs de bœuf haché carbonisés épicés au gingembre, piment et garam masala.",tip:"La farine de pois chiches lie les kebabs et ajoute un goût de noisette subtil."},
    b9:{name:"Gyudon japonais (bol de bœuf)",desc:"L'iconique bol de bœuf et oignon de Tokyo. Le comfort food le plus rapide.",tip:"Demandez à votre boucher de couper le sirloin très fin, ou congelez-le pour le trancher."},
    b10:{name:"Pho de bœuf vietnamien",desc:"La soupe réconfortante du Vietnam. Un bouillon clair profondément parfumé.",tip:"Un bon bouillon pho doit être clair, pas trouble. Écumer constamment est la clé."},
    b11:{name:"Bœuf Wellington",desc:"Le plat vedette ultime. Filet enveloppé dans la duxelles et la pâte feuilletée dorée.",tip:"Réfrigérer après l'emballage est crucial — maintient la forme et garde la pâte croustillante."},
    b12:{name:"Kibbeh libanais",desc:"Le plat national du Liban — bœuf haché épicé dans une enveloppe de boulgour.",tip:"Garder le mélange extérieur très froid rend le façonnage beaucoup plus facile."},
    a1:{name:"Festin du dimanche",desc:"Le roast du dimanche complet — poulet ET bœuf, tous les accompagnements.",tip:"Laisser reposer le bœuf est aussi important que le cuire. Ne jamais sauter cette étape."},
    a2:{name:"Plateau mixte grillé",desc:"Toute la box sur un plateau. Chaque protéine, parfaitement cuite.",tip:"Laisser reposer chaque morceau avant de l'ajouter au plateau — le four garde tout chaud."},
    a3:{name:"Le BBQ de garden party ultime",desc:"Poulet, bœuf, agneau — tout sur le gril en même temps. Pour nourrir une foule.",tip:"Écrivez votre plan de timing avant de commencer. Le chaos tue un BBQ."},
    a4:{name:"Musakhan (Poulet palestinien)",desc:"Le plat national palestinien. Poulet rôti avec oignons caramélisés et sumac.",tip:"Plus de sumac que vous ne pensez. Soyez audacieux — c'est ce qui rend le musakhan extraordinaire."},
    a5:{name:"Biryani Royal",desc:"Biryani aux viandes mélangées — poulet et agneau en couches avec du basmati parfumé.",tip:"Deux préparations de viande séparées créent une profondeur de saveur inégalée."},
    a6:{name:"Soirée Fondue Asiatique",desc:"Hot pot chinois interactif — viandes ultra-fines cuites à table.",tip:"Le hot pot est un événement, pas un simple repas. Tamisez les lumières et profitez 2 heures."},
    a7:{name:"Soirée BBQ Coréen",desc:"BBQ coréen à la maison — viandes marinées grillées à table.",tip:"Le ssam (feuille de laitue farcie) équilibre parfaitement la richesse des viandes."},
    a8:{name:"Plateau Tandoori mixte",desc:"Un plateau tandoori complet — poulet et agneau marinés, grillés au charbon.",tip:"La marinade au yaourt attendrit ET protège de la chaleur intense."},
    a9:{name:"Plateau BBQ portugais",desc:"Poulet piri-piri, bœuf et côtelettes d'agneau grillés — une fête sur un plateau.",tip:"Un bon piri-piri doit vous faire transpirer un peu — ne retenez pas les piments."},
    a10:{name:"Festin mezze levantin",desc:"Un assortiment de petits plats autour de différentes viandes — le repas social.",tip:"Le mezze est conçu pour être lent et convivial. Installez tout et prenez votre temps."},
  f13:{name:"Frango Piri-Piri (Poulet Grillé Portugais)",desc:"Le plat qui a rendu le poulet portugais célèbre dans le monde entier. Épicé, à l'ail, inoubliable.",tip:"La sauce piri-piri s'améliore après une journée au réfrigérateur — en faire le double et en garder pour badigeonner."},
  f14:{name:"Korma de Poulet",desc:"Riche, crémeux et délicatement épicé — le curry doux qui séduit toute la table.",tip:"Les noix de cajou moulues sont l'épaississant traditionnel qui donne au korma sa texture soyeuse."},
  f15:{name:"Chicken Karahi",desc:"Le curry de poulet au wok bien-aimé du Pakistan — riche en tomates, gingembre prononcé, style restaurant à la maison.",tip:"Un vrai karahi n'a presque pas d'eau ajoutée — les tomates et le poulet créent toute la sauce."},
  f16:{name:"Bosanski Pilav (Pilaf de Poulet Bosniaque)",desc:"Un plat de riz balkanique réconfortant, poulet et riz mijotés lentement ensemble dans une seule casserole.",tip:"Résister à l'envie de remuer pendant la cuisson du riz — c'est le secret d'un pilaf qui n'est pas pâteux."},
  r13:{name:"Ćevapi avec Somun",desc:"Le street-food le plus emblématique des Balkans — saucisses de viande hachée grillées dans un pain plat moelleux.",tip:"Le bicarbonate de soude est le secret balkanique — il garde les ćevapi légers et tendres, jamais denses."},
  r14:{name:"Kebab Seekh d'Agneau",desc:"Agneau haché épicé moulé sur des brochettes et grillé au charbon — un essentiel du BBQ pakistanais.",tip:"Des brochettes plates (pas rondes) empêchent le kebab de tourner et de se détacher sur le gril."},
  r15:{name:"Lamb Karahi",desc:"Agneau avec os cuit rapidement et à feu vif dans une base de tomate et gingembre — savoureux, favori des restaurants.",tip:"L'agneau avec os donne au karahi sa profondeur de saveur — ne pas substituer par du désossé si possible."},
  r16:{name:"Espetada (Brochettes de Bœuf Portugaises)",desc:"Les célèbres brochettes de bœuf à l'ail de Madère, traditionnellement grillées à feu ouvert.",tip:"Les morceaux d'ail se caramélisent et s'adoucissent — ne pas les négliger, les manger."},
  b13:{name:"Goulash de Bœuf Luxembourgeois",desc:"Une version luxembourgeoise généreuse du classique d'Europe centrale — riche, profondément paprika, fait pour les soirées froides.",tip:"Cuisson lente et douce non négociable ici — précipiter le braisage donne un bœuf sec et dur."},
  b14:{name:"Nihari de Bœuf",desc:"Le légendaire ragoût pakistanais mijoté lentement, traditionnellement laissé toute la nuit pour le petit-déjeuner. Profond, sombre et inoubliable.",tip:"Griller la farine jusqu'à brun foncé avant de l'ajouter donne au nihari sa couleur sombre caractéristique et sa profondeur de noisette."},
  b15:{name:"Chapli Kebab",desc:"Les célèbres galettes de bœuf haché plates et croustillantes de Peshawar, pleines de graines de grenade et de coriandre.",tip:"La tomate et l'oignon doivent être très finement hachés, presque en purée — cela garde les galettes tendres à l'intérieur."},
  b16:{name:"Bife à Café (Steak au Beurre-Café Portugais)",desc:"Un classique des cafés de Lisbonne — un steak fin dans une sauce brillante au beurre, ail et café. Ça semble étrange, c'est incroyable.",tip:"Ne pas éviter le café en pensant qu'il sera amer — il s'adoucit en une base savoureuse et profonde pour la sauce."},
  a11:{name:"Bosanski Lonac (Marmite de Viandes Bosniaque)",desc:"Le plat national bosniaque en une marmite — couches de bœuf, agneau et légumes mijotés ensemble dans un pot en argile.",tip:"La magie du lonac est la patience — résister à l'envie de remuer. Les couches cuisent les unes dans les autres naturellement."},
  a12:{name:"Assiette Grillée Mixte Luxembourgeoise",desc:"Un plat grillé généreux de style luxembourgeois — assaisonnement simple, viande de qualité, confort bistro classique.",tip:"Échelonner les temps de cuisson permet à tout de finir et reposer ensemble — prévoir le poulet en premier."},
  a13:{name:"Plateau de Grillades Mixtes Pakistanais",desc:"Kebab seekh, tikka de poulet et côtelettes d'agneau ensemble sur un plateau fumé et épicé — un favori du BBQ pakistanais.",tip:"Échelonner le gril pour que tout arrive chaud à table ensemble — poulet et seekh cuisent à vitesse similaire, commencer l'agneau un peu plus tôt."},
  a14:{name:"Grillades Mixtes Tandoori Indiennes",desc:"Poulet tandoori classique et côtelettes d'agneau, grillés au charbon avec une marinade fumée au yaourt — saveur tandoor de restaurant à la maison.",tip:"La double marinade — acide d'abord, puis yaourt-épices — est la véritable technique tandoori et fait une différence notable."},
  },
  de:{
    f1:{name:"Ofenhähnchen",desc:"Der Sonntags-Klassiker. Knusprige Haut, saftiges Fleisch, unschlagbares Aroma.",tip:"Kräuterbutter unter die Haut reiben vor dem Braten — das gibt Next-Level-Geschmack."},
    f2:{name:"Gebratene Hähnchenfilets",desc:"Der Wochentags-Held. Außen goldbraun, innen unglaublich saftig.",tip:"Niemals auf das Hähnchen in der Pfanne drücken — das presst den Saft heraus."},
    f3:{name:"Spatchcock-Hähnchen vom Grill",desc:"Aufgeklappt für schnelleres, gleichmäßiges Garen. Maximale Röstaromen.",tip:"Über Nacht in Salzwasser einlegen gibt ultra-saftiges BBQ-Hähnchen."},
    f4:{name:"Rauchige BBQ-Hähnchenkeulen",desc:"Zart zum Ablecken mit einer klebrigen, karamellisierten BBQ-Glasur.",tip:"Die Marinade aufbewahren, in der Pfanne einkochen und als Dip-Sauce servieren."},
    f5:{name:"Hähnchen-Shawarma",desc:"Das legendäre levantinische Street Food. Würzig, saftig, absolut unwiderstehlich.",tip:"Einige Tropfen Granatapfelmelasse in der Marinade ergeben unglaubliche Tiefe."},
    f6:{name:"Shish Tawook",desc:"Libanesische Hähnchen-Grillspieße — zart, aromatisch, über der Flamme gegart.",tip:"Toum (libanesische Knoblauchsauce) ist unverzichtbar. Knoblauch, Öl, Zitrone, Salz mixen."},
    f7:{name:"Chicken Tikka Masala",desc:"Das beliebteste Curry der Welt. Rauchiges Hähnchen in samtiger Tomaten-Sahne-Sauce.",tip:"Das Anbrennen des Hähnchens vor dem Hinzufügen zur Sauce ist das Geheimnis des echten Tikka Masala."},
    f8:{name:"Hähnchen-Biryani",desc:"Der König der Reisgerichte. Aromatischer Basmati mit gewürztem Hähnchen.",tip:"Die Dum-Stufe (Dampfgaren) niemals überspringen — das macht Biryani zu Biryani."},
    f9:{name:"Teriyaki-Hähnchen",desc:"Klebrig, glänzend, süß-herzhaft perfekt. Der japanische Klassiker.",tip:"Das Hähnchen einritzen damit es flach bleibt und die Glasur überall haftet."},
    f10:{name:"Thailändisches Basilikum-Hähnchen",desc:"Thailands beliebtestes Street Food. 15 Minuten, explosive Aromen.",tip:"Die hohe Hitze ist alles. Wenn die Pfanne nicht raucht, ist sie nicht heiß genug."},
    f11:{name:"Zitronenkütern-Grillhähnchen",desc:"Frisch, würzig und rauchig. Ein BBQ-Klassiker für alle.",tip:"Die gegrillte Zitrone kurz vor dem Essen auspressen für maximale Frische."},
    f12:{name:"Marokkanisches Hähnchen-Tagine",desc:"Langsam gegart mit Salzzitronen, Oliven und aromatischen Gewürzen.",tip:"Salzzitrone ist die Seele dieses Gerichts — in orientalischen Geschäften erhältlich."},
    r1:{name:"Klassische Lammkoteletts",desc:"Einfach, perfekt, zeitlos. Die besten Lammkoteletts, die Sie je zubereiten werden.",tip:"Medium-rare = 57°C Kerntemperatur. Ein Fleischthermometer ist die beste Kücheninvestition."},
    r2:{name:"Rind- und Lamm-Kofta",desc:"Nahöstliche gewürzte Hackfleischspieße. Voll mit Kreuzkümmel und Kräutern.",tip:"Die Zwiebel reiben statt hacken verhindert, dass Kofta auseinanderfällt."},
    r3:{name:"BBQ-Sirloin mit Chimichurri",desc:"Argentinisch gegrilltes Rindfleisch mit lebhafter grüner Kräutersauce.",tip:"Rindfleisch immer gegen die Faser schneiden — kürzt Muskelfasern für mehr Zartheit."},
    r4:{name:"Rauchige Lammschulter-Sliders",desc:"Langsam geräucherte Lammschulter, gezupft in weiche Brötchen gestapelt.",tip:"Je länger die Ruhezeit nach dem Zupfen, desto mehr Säfte verteilen sich im Fleisch."},
    r5:{name:"Lammfleisch Mansaf",desc:"Jordaniens Nationalgericht. Lamm in Joghurtsauce, auf Fladenbrot serviert.",tip:"Stärke zum Joghurt geben verhindert das Gerinnen beim Erhitzen."},
    r6:{name:"Rind-Ouzi",desc:"Golf-Stil langsam geröstetes Rindfleisch über Gewürzreis mit Nüssen.",tip:"Baharat ist eine Mischung aus schwarzem Pfeffer, Koriander, Zimt, Nelken und Muskat."},
    r7:{name:"Lamm Rogan Josh",desc:"Das Juwel der kashmirischen Küche. Tiefes, rubinrotes Lamm-Curry.",tip:"Kashmiri-Chili gibt die ikonische rote Farbe ohne intensive Schärfe."},
    r8:{name:"Keema Curry",desc:"Gewürztes Hackfleisch mit Erbsen. Das ultimative schnelle Wochentags-Curry.",tip:"Bei hoher Hitze kochen bis das Hack ganz trocken ist konzentriert alle Aromen."},
    r9:{name:"Koreanisches Rindfleisch Bulgogi",desc:"Süß-herzhaftes, leicht rauchiges koreanisches BBQ-Rindfleisch.",tip:"Die geriebene asiatische Birne ist der traditionelle Zartmacher — unbedingt finden."},
    r10:{name:"Mongolisches Lamm-Stir-Fry",desc:"Kühner chinesisch-amerikanischer Klassiker. Zartes Lamm mit Hoisin-Sauce.",tip:"Das Velveting ist das Restaurantgeheimnis für zartes, nicht zähes Stir-Fry-Fleisch."},
    r11:{name:"Lamm Shepherd's Pie",desc:"Das ultimative britische Comfort Food. Langsam gekochtes Lamm unter goldener Püree.",tip:"Die Kartoffelpüree-Oberfläche vor dem Backen gabelförmig einritzen — wird knuspriger."},
    r12:{name:"Japanisches Lamm Sukiyaki",desc:"Ein wärmendes japanisches Hot Pot mit dünn geschnittenem Lamm.",tip:"Das Tunken in rohes Ei ist traditionell und absolut köstlich."},
    b1:{name:"Perfektes Gusseisen-Ribeye",desc:"Das definitive Steakhouse-Ribeye zu Hause. Kruste wie Glas, innen rosa.",tip:"Niemals ein kaltes Steak braten. 1 Stunde Zimmertemperatur = gleichmäßiges Garen."},
    b2:{name:"Smash Burger",desc:"Der Diner-Smash-Burger, der die Burger-Kultur für immer verändert hat.",tip:"20% Fettgehalt-Hack ist unerlässlich. Mageres Hack macht trockene, traurige Burger."},
    b3:{name:"Cowboy-Ribeye am Knochen",desc:"Dickes, knochenfrisches Ribeye über offenem Feuer. Prähistorisch, großartig.",tip:"Die Reverse-Sear-Methode gibt perfektes Garen von Rand zu Rand."},
    b4:{name:"Kaffee-Brisket vom BBQ",desc:"Dunkle, knackige Kruste außen. Schmelzend zart innen.",tip:"Wenn die Brisket-Temperatur bei 70°C stagniert, weiter — sie WIRD wieder steigen."},
    b5:{name:"Rind-Shawarma",desc:"Die levantinische Street-Food-Ikone. Gewürztes, geschnittenes Rindfleisch im Fladenbrot.",tip:"Die Schichtungs- und Röst-Technik imitiert zu Hause einen Shawarma-Drehspieß."},
    b6:{name:"Hawawshi (Ägyptisches gefülltes Brot)",desc:"Knuspriges ägyptisches Fladenbrot gefüllt mit gewürztem Hackfleisch.",tip:"Rohes Fleisch in der Füllung bleibt unglaublich saftig."},
    b7:{name:"Rind-Madras-Curry",desc:"Süd-indischer Stil heißes, würziges Rindfleisch-Curry mit tiefem Geschmack.",tip:"Tamarinde ist für die saure Note essentiell, die Madras definiert."},
    b8:{name:"Rind Seekh Kebab",desc:"Verkohlte Hackfleisch-Kebabs mit Ingwer, Chili und Garam Masala.",tip:"Kichererbsenmehl bindet den Kebab und gibt eine subtile Nussigkeit."},
    b9:{name:"Japanisches Gyudon (Rindfleisch-Bowl)",desc:"Tokios ikonische Rindfleisch-Zwiebel-Bowl. Das schnellste Comfort Food.",tip:"Den Metzger bitten, das Sirloin papierdünn zu schneiden, oder einfrieren zum Schneiden."},
    b10:{name:"Vietnamesisches Rindfleisch Pho",desc:"Vietnams wärmende Nudelsuppe. Eine tief aromatische, klare Brühe.",tip:"Eine gute Pho-Brühe sollte klar, nicht trübe sein. Ständiges Abschäumen ist der Schlüssel."},
    b11:{name:"Beef Wellington",desc:"Das ultimative Showstopper-Gericht. Filet in Pilzduxelles und Blätterteig.",tip:"Kühlen nach dem Einwickeln ist entscheidend — hält die Form und hält den Teig knusprig."},
    b12:{name:"Libanesisches Kibbeh",desc:"Libanons Nationalgericht — gewürztes Hackfleisch in Bulgur-Weizenmantel.",tip:"Die äußere Mischung sehr kalt halten macht das Formen viel einfacher."},
    a1:{name:"Sonntagsbraten-Fest",desc:"Der komplette Sonntagsbraten — Hähnchen UND Rindfleisch, alle Beilagen.",tip:"Das Rindfleisch ruhen zu lassen ist genauso wichtig wie das Kochen."},
    a2:{name:"Gemischter Grill-Teller",desc:"Die ganze Box auf einem Teller. Jedes Protein, perfekt gegart.",tip:"Jeden Stück ruhen lassen vor dem Anrichten — ein warmer Ofen hält alles heiß."},
    a3:{name:"Das ultimative Garten-BBQ",desc:"Hähnchen, Rind, Lamm — alles gleichzeitig auf dem Grill. Für eine Menschenmenge.",tip:"Den Zeitplan vorher aufschreiben. Chaos tötet ein BBQ schneller als schlechtes Fleisch."},
    a4:{name:"Musakhan (Palästinensisches Brathuhn)",desc:"Palästinas Nationalgericht. Hähnchen mit karamellisierten Zwiebeln und Sumach.",tip:"Mehr Sumach als gedacht. Mutig damit sein — das macht Musakhan außergewöhnlich."},
    a5:{name:"Crown Biryani",desc:"Gemischtes Fleisch-Biryani — Hähnchen und Lamm mit Basmati geschichtet.",tip:"Zwei getrennte Fleischzubereitungen schaffen eine unübertreffliche Geschmackstiefe."},
    a6:{name:"Hot-Pot-Abend",desc:"Interaktiver chinesischer Hot Pot — hauchdünne Fleischstücke am Tisch gegart.",tip:"Hot Pot ist ein Ereignis, kein einfaches Abendessen. Lichter dimmen und 2 Stunden genießen."},
    a7:{name:"Koreanischer BBQ-Abend",desc:"Koreanisches BBQ zu Hause — mariniertes Fleisch am Tisch gegrillt.",tip:"Der Ssam-Wrap (Salatblatt) gleicht die Reichhaltigkeit des Fleisches perfekt aus."},
    a8:{name:"Gemischter Tandoori-Teller",desc:"Ein kompletter Tandoori-Teller — Hähnchen und Lamm, am Grill verkohlt.",tip:"Die Joghurt-Marinade macht zart UND schützt vor der intensiven Hitze."},
    a9:{name:"Portugiesischer BBQ-Teller",desc:"Piri-piri-Hähnchen, gegrilltes Rindfleisch und Lammkoteletts — ein Fest auf einem Brett.",tip:"Gutes Piri-piri sollte einen ein wenig schwitzen lassen — keine Zurückhaltung bei den Chilis."},
    a10:{name:"Levantinisches Mezze-Fest",desc:"Eine Auswahl kleiner Gerichte rund um verschiedene Fleischsorten — das gesellige Essen.",tip:"Mezze ist für langsame, gesellige Mahlzeiten gedacht. Alles aufstellen und Zeit nehmen."},
  f13:{name:"Frango Piri-Piri (Portugiesisches Grillhähnchen)",desc:"Das Gericht, das portugiesisches Hähnchen weltberühmt gemacht hat. Feurig, knoblauchig, unvergesslich.",tip:"Piri-Piri-Sauce wird nach einem Tag im Kühlschrank noch besser — die doppelte Menge machen und etwas zum Bestreichen aufheben."},
  f14:{name:"Hähnchen-Korma",desc:"Reichhaltig, cremig und sanft gewürzt — das milde Curry, das jeden am Tisch überzeugt.",tip:"Gemahlene Cashewnüsse sind das traditionelle Bindemittel, das dem Korma seine seidige Textur verleiht."},
  f15:{name:"Chicken Karahi",desc:"Pakistans beliebtes Wok-Hähnchencurry — tomatenreich, ingwerbetont, Restaurant-Stil zu Hause.",tip:"Ein echtes Karahi hat fast kein zugesetztes Wasser — Tomaten und Hähnchen erzeugen die gesamte Sauce."},
  f16:{name:"Bosanski Pilav (Bosnischer Hähnchen-Pilaw)",desc:"Ein tröstliches Balkan-Reisgericht, Hähnchen und Reis langsam zusammen in einem Topf geschmort.",tip:"Widerstehe dem Drang, während des Reiskochens zu rühren — das ist das Geheimnis eines Pilaws, der nicht matschig wird."},
  r13:{name:"Ćevapi mit Somun",desc:"Das ikonischste Street Food des Balkans — gegrillte Hackfleisch-Würstchen in weichem Fladenbrot.",tip:"Natron ist das Balkan-Geheimnis — es hält Ćevapi leicht und zart, niemals dicht."},
  r14:{name:"Lamm-Seekh-Kebab",desc:"Gewürztes Lammhack, auf Spieße geformt und über Holzkohle gegrillt — ein pakistanisches BBQ-Muss.",tip:"Flache Spieße (nicht rund) verhindern, dass sich der Kebab auf dem Grill dreht und auseinanderfällt."},
  r15:{name:"Lamm-Karahi",desc:"Lamm mit Knochen, schnell und heiß in einer Tomaten-Ingwer-Basis gekocht — tiefwürzig, Restaurant-Favorit.",tip:"Lamm mit Knochen verleiht dem Karahi seine Geschmackstiefe — wenn möglich nicht durch knochenloses ersetzen."},
  r16:{name:"Espetada (Portugiesische Rinderspieße)",desc:"Madeiras berühmte knoblauchgespickte Rinderspieße, traditionell über offenem Feuer gegrillt.",tip:"Die Knoblauchstücke karamellisieren und werden süß — nicht auslassen, sondern essen."},
  b13:{name:"Luxemburgisches Rindergulasch",desc:"Eine herzhafte luxemburgische Version des mitteleuropäischen Klassikers — reich, tief paprikahaltig, gemacht für kalte Abende.",tip:"Langsam und sanft ist hier nicht verhandelbar — überstürztes Schmoren ergibt zähes, trockenes Rindfleisch."},
  b14:{name:"Rinder-Nihari",desc:"Der legendäre langsam gekochte pakistanische Eintopf, traditionell über Nacht für das Frühstück geköchelt. Tief, dunkel und unvergesslich.",tip:"Das Mehl vor dem Hinzufügen dunkelbraun zu rösten verleiht Nihari seine charakteristische dunkle Farbe und nussige Tiefe."},
  b15:{name:"Chapli Kebab",desc:"Peshawars berühmte flache, knusprig-randige Hackfleischpatties, gespickt mit Granatapfelkernen und Koriander.",tip:"Tomate und Zwiebel sollten sehr fein gehackt sein, fast breiig — das hält die Patties innen zart."},
  b16:{name:"Bife à Café (Portugiesisches Kaffee-Butter-Steak)",desc:"Ein Lissabonner Café-Klassiker — ein dünnes Steak in einer glänzenden Butter-Knoblauch-Kaffee-Sauce. Klingt seltsam, schmeckt unglaublich.",tip:"Den Kaffee nicht weglassen, weil man denkt, er schmeckt bitter — er mildert sich zu einer tiefen, herzhaften Basis für die Sauce."},
  a11:{name:"Bosanski Lonac (Bosnischer Fleischtopf)",desc:"Bosniens nationales Eintopfgericht — Schichten aus Rind, Lamm und Gemüse, zusammen in einem Tontopf geschmort.",tip:"Die Magie des Lonac ist Geduld — dem Drang zu rühren widerstehen. Die Schichten garen von selbst ineinander."},
  a12:{name:"Luxemburgische Gemischte Grillplatte",desc:"Eine großzügige Grillplatte im luxemburgischen Stil — einfache Würzung, hochwertiges Fleisch, klassischer Bistro-Komfort.",tip:"Die Grillzeiten zu staffeln bedeutet, dass alles zusammen fertig wird und ruht — das Hähnchen zuerst einplanen."},
  a13:{name:"Pakistanische Gemischte Grillplatte",desc:"Seekh-Kebab, Hähnchen-Tikka und Lammkoteletts zusammen auf einer rauchigen, würzigen Platte — ein pakistanischer BBQ-Favorit.",tip:"Den Grill staffeln, damit alles zusammen heiß auf den Tisch kommt — Hähnchen und Seekh garen ähnlich schnell, Lamm etwas früher beginnen."},
  a14:{name:"Indische Gemischte Tandoori-Grillplatte",desc:"Klassisches Tandoori-Hähnchen und Lammkoteletts, holzkohlegegrillt mit rauchiger Joghurt-Marinade — Restaurant-Tandoor-Geschmack zu Hause.",tip:"Die doppelte Marinade — zuerst Säure, dann Joghurt-Gewürze — ist die echte Tandoori-Technik und macht einen spürbaren Unterschied."},
  },
  lb:{
    f1:{name:"Gebakene ganze Poulet",desc:"De Sonndeg-Klassiker. Knusprig Haut, safteg Fleesch, onschlagbaren Arôme.",tip:"Kraider-Botter ënner d'Haut riebe virum Baken fir e Geschmaach vun der nächster Ebene."},
    f2:{name:"Gebratene Poulet-Filets",desc:"Den Held vum Wochendag. Golden äbausst, ongleeblech safteg bannen.",tip:"Ni op de Poulet an der Pfann drécken — dat presst d'Saft eraus."},
    f3:{name:"BBQ Spatchcock Poulet",desc:"Opgemécht fir méi séier a gläichmässeg ze kachen. Maximal Arôme.",tip:"Iwwernuecht a Salzwaasser léien gëtt Iech e super-saftege BBQ-Poulet."},
    f4:{name:"Raachemeg BBQ Poulet-Schenkelen",desc:"Weech bis op den Knochen mat enger glazéierter BBQ-Sauce.",tip:"Marinade behalen, an enger Pfann reduzéieren a als extra Dip-Sauce servéieren."},
    f5:{name:"Poulet Shawarma",desc:"Deen legendäre levantineschen Stroosseniessenst. Gewierzt, safteg, absolut addiktiv.",tip:"E puer Drëps Granatapfelmolassen an der Marinade ginn eng ongleeblech Déift."},
    f6:{name:"Shish Tawook",desc:"Libanesesch gegrillte Poulet-Spiesscher — zart, aromatesch, iwwer der Flamm gebrannt.",tip:"Toum (libanesesch Knueweschsauce) ass obligatoresch. Knuewel, Ueleg, Zitroun a Salz mixen."},
    f7:{name:"Chicken Tikka Masala",desc:"De beléifste Curry vun der Welt. Raachemeg Poulet an enger samteger Tomaten-Cremm-Sauce.",tip:"De Poulet viru senger Zugab zur Sauce ze verbrenne ass de Geheimnis vum echten Tikka Masala."},
    f8:{name:"Poulet Biryani",desc:"De Kinnek vun den Reesgeriichter. Aromatesche Basmati mat gewierztem Poulet a Schichten.",tip:"D'Dum-Etapp (Dämpfen) ni iwwerspringen — dat ass wat Biryani zu Biryani mécht."},
    f9:{name:"Teriyaki Poulet",desc:"Kleebrig, gläizend, siss-haarteg Perfektioun. De japanischen Klassiker.",tip:"De Poulet aschneiden fir datt en flaach bleift an d'Glasur un all Spalt kleeft."},
    f10:{name:"Thaïländescht Basilikum-Poulet",desc:"Thaïlands populäerste Stroosseniessenst. 15 Minutten, explodéierend Arom.",tip:"Déi héich Hëtzt ass alles. Wann Är Pfann net daucht, ass se net waarm genuch."},
    f11:{name:"Zitrounenkraider-Grillpoulet",desc:"Frësch, zesty a raachemeg. E BBQ-Klassiker deen jiddereen iwwerzeegt.",tip:"Déi gegrillte Zitroun direkt virum Iesse ausdrécken fir maximal Frëschheet."},
    f12:{name:"Maroukanescht Poulet Tagine",desc:"Lues gekacht mat konservéierter Zitroun, Oliven a aromateschen Gewierzer.",tip:"Konservéiert Zitroun ass d'Séil vun dësem Geriicht — an orientalesche Geschäfter ze fannen."},
    r1:{name:"Klassesch gegrillte Lammkoteletten",desc:"Einfach, perfekt, zeitlos. Déi bescht Lammkoteletten déi Dir jee maacht.",tip:"Medim-rare ass 57°C. En Fleesch-Thermometer ass déi bescht Kichen-Investitioun."},
    r2:{name:"Rëndfleesch & Lamm Kofta",desc:"Mëttlïstesch gewierzte Hackfleesch-Spiesscher. Vollgepackt mat Kumin an Kraider.",tip:"D'Zoepel riiwwen amplaz ze schneiden verhënnert datt Kofta zerfält."},
    r3:{name:"BBQ Sirloin mat Chimichurri",desc:"Argentinesch gebratent Rëndfleesch mat enger lebhafter grénger Kraider-Sauce.",tip:"Rëndfleesch ëmmer géint de Korn schneiden — mécht all Bëss méi zart."},
    r4:{name:"Raachemeg Lammschëller Sliders",desc:"Lues a lues geraucht Lammschëller, gerass a weech Briecher gestapelt.",tip:"Jo méi laang d'Rou nom Rappen, jo méi Saft verdeelt sech am Fleesch."},
    r5:{name:"Lamm Mansaf",desc:"Jordaniens Nationalgeriicht. Lamm lues am Joghurt-Sauce gekacht, op Flaachbrout servéiert.",tip:"Maïzena am Joghurt verhënnert datt en sech trennt wann en erhëtzt gëtt."},
    r6:{name:"Rëndfleesch Ouzi",desc:"Golf-Stil lues gebratent Rëndfleesch iwwer gewierztem Rees mat Nëss a Rosinen.",tip:"Baharat ass eng Mischung vu schwaarzem Peffere, Koriander, Zimt, Nägelchen a Muskat."},
    r7:{name:"Lamm Rogan Josh",desc:"De Juwel vun der Kaschmirer Kichen. Déif aromatesch, rubinroude Lamm-Curry.",tip:"Kaschmirer Chili gëtt déi ikonesch rout Faarf ouni intensiv Schärft."},
    r8:{name:"Keema Curry",desc:"Gewierzt Hackfleesch mat Ierbsen. Den ultimativen séieren Wochendag-Curry.",tip:"Bei héijer Hëtzt kachen bis d'Hackfleesch ganz drëchen ass konzentréiert all den Arom."},
    r9:{name:"Koreanesch Rëndfleesch Bulgogi",desc:"Siss, haarteg, liicht raachemeg koreanesch BBQ Rëndfleesch. Dat Bescht an enger Pfann.",tip:"Déi geriibwen asiatesch Bir ass den traditionelle Weichmacher — et ass wierklech de Wäert et ze fannen."},
    r10:{name:"Mongolescht Lamm Stir-Fry",desc:"Kühn chinesisch-amerikaneschen Klassiker. Zartt Lamm mat enger glänzender Hoisin-Sauce.",tip:"Velveting ass d'Restaurantgeheimnis fir zartt, net zieh Stir-Fry-Fleesch."},
    r11:{name:"Lamm Shepherd's Pie",desc:"Dat ultimativt brittescht Comfort Food. Lues gekacht Lamm ënner goldener Purée.",tip:"D'Kartoffelpurée-Uewerfläch virum Baken mat enger Forkel andrécken — gëtt méi knuspreg."},
    r12:{name:"Japanesch Lamm Sukiyaki",desc:"En waarmende japanecht Hot Pot mat dünnem Lammschnéi an engem Sojabriot.",tip:"Déi rou Ee-Dip ass traditionell a absolut lecker — ni iwwerspringen."},
    b1:{name:"Perfekte Gusseise Ribeye",desc:"Dat definitiv Steakhaus-Ribeye doheem. Kruste wéi Glas, rose bannen.",tip:"Ni e kale Steak kachen. 1 Stonn bei Raumtemperatur = gläichmässeg Garen duerchgehend."},
    b2:{name:"Smash Burgers",desc:"De Diner-Smash-Burger deen d'Burger-Kultur fir ëmmer geännert huet.",tip:"20% Fett-Hackfleesch ass essentiell. Mager Hackfleesch mécht drëchen, traureg Burger."},
    b3:{name:"Cowboy Ribeye um Knochen",desc:"Déck geschnidden, Knochen-Ribeye iwwer offenem Feier. Virhistoresch, magnifik.",tip:"D'Reverse-Sear Methode gëtt perfekt Garen vun Rand zu Rand."},
    b4:{name:"Kaffi-Rëndfleesch Brisket",desc:"Donkel, knuspreg Rind äbausst. Zerfléissend zart bannen.",tip:"Wann d'Brisket-Temperatur bei 70°C stagnéiert, weidermaachen — se WÄERT nees eropgoen."},
    b5:{name:"Rëndfleesch Shawarma",desc:"Deen Levantineschen Stroosseniessenst-Klassiker. Gewierzt Rëndfleesch am Flaachbrout.",tip:"Déi Stapel-a-Bak-Technik imitéiert en Shawarma-Dreespiess doheem — a funktionéiert wierklech."},
    b6:{name:"Hawawshi (Gestoppte egyptescht Brout)",desc:"Knuspreg egyptescht Flaachbrout gestoppt mat gewiertzem Hackfleesch. Perfekte Stroosseniessen.",tip:"Ro Fleesch an der Fëllung benotzen hält et ongleeblech safteg."},
    b7:{name:"Rëndfleesch Madras Curry",desc:"Südindianescht Stil waarme, séierem Rëndfleesch-Curry mat enger déifer Sauce.",tip:"Tamarind ass essentiell fir den séieren Toun deen Madras definéiert — ni iwwerspringen."},
    b8:{name:"Rëndfleesch Seekh Kebab",desc:"Verbrannte Hackfleesch-Kebabs gewierzt mat Gingember, Chili a Garam Masala.",tip:"Kichererbsenmihl verbënnt de Kebab a gëtt eng subtile Nussegkeet."},
    b9:{name:"Japanesch Gyudon (Rëndfleesch-Bowl)",desc:"Tokios ikonesch Rëndfleesch-an-Zoepel-Bowl. Dat séierste Comfort Food.",tip:"Ären Fleesche bieden dat Sirloin pabeiersdünn ze schneiden, oder halbgefruer fir doheem ze schneiden."},
    b10:{name:"Vietnamesch Rëndfleesch Pho",desc:"Vietnams séilenopwiermend Nudelzopp. Eng déif aromatesch, kloer Brüh.",tip:"Eng gutt Pho-Brüh soll kloer, net trëw sinn. Dauerhaftes Ofschommen ass de Schlëssel."},
    b11:{name:"Beef Wellington",desc:"Dat ultimativt Showstopper-Geriicht. Filet a Champignonmischung a Blätterteig gewickelt.",tip:"No dem Awickelen killen ass kritesch — hält d'Form a behält de Blätterteig knuspreg."},
    b12:{name:"Libanesecht Rëndfleesch Kibbeh",desc:"Lëtzebuerg seng Nationalgeriicht — gewierzt Hackfleesch an engem Bulgur-Weezemantel.",tip:"Déi äischteg Mischung ganz kal halen mécht d'Formen vill méi einfach."},
    a1:{name:"Sonndeg Brotmahlzäit Fest",desc:"De komplette Sonndeg-Braten — Poulet AN Rëndfleesch, all d'Bäilage.",tip:"D'Rëndfleesch raschten ze loossen ass sou wichteg wéi et ze kachen. Ni iwwerspringen."},
    a2:{name:"Gemëschte Grill-Teller",desc:"Déi ganz Box op engem Teller. All Protein, perfekt gekacht.",tip:"All Stéck raschten ier et um Teller ugeluecht gëtt — en waarmen Ofen hält alles waarm."},
    a3:{name:"Deen Ultimate Gaart BBQ",desc:"Poulet, Rëndfleesch, Lamm — alles gläichzäiteg um Grill. Fir eng Mënschenschar.",tip:"Den Zäitplang virgeschreiwen ier Dir ufänkt. Chaos schleet en BBQ méi séier wéi schlecht Fleesch."},
    a4:{name:"Musakhan (Palästinensescht gebakenes Poulet)",desc:"Palästinas Nationalgeriicht. Poulet mat karamelliséiertem Zoepel a Sumach gebakt.",tip:"Méi Sumach wéi Dir denkt. Mutwëlleg domat sinn — dat ass wat Musakhan aussergewéinlech mécht."},
    a5:{name:"Crown Biryani",desc:"Gemëschte Fleesch Biryani — Poulet a Lamm mat aromateschen Basmati a Schichten.",tip:"Zwee getrennten Fleesch-Virbereedungen schaffen eng oniwwertrefflech Geschmaackstieft."},
    a6:{name:"Hot Pot Owend",desc:"Interaktiv chinesescht Hot Pot — pabeiersdünnet Fleesch, um Dësch gekacht.",tip:"Hot Pot ass en Événement, net just eng Mahlzäit. D'Luuchten dämpen a 2 Stonnen genéissen."},
    a7:{name:"Koreanesch BBQ Owend",desc:"Koreanesch BBQ doheem — marinéiert Fleesch, um Dësch gegrillt.",tip:"De Ssam Wrap (Salatblat) gläicht d'Räichheet vum Fleesch perfekt aus."},
    a8:{name:"Gemëschte Tandoori Teller",desc:"E komplette Tandoori Teller — Poulet a Lamm marinéiert, um Grill verbrannt.",tip:"Déi Joghurt-Marinade mécht zart AN schützt virun der intensiver Hëtzt."},
    a9:{name:"Portugisescht BBQ Teller",desc:"Piri-Piri Poulet, Rëndfleesch a Lammkoteletten — eng Feier op engem Brett.",tip:"Gudde Piri-Piri soll Iech e bëssen schwëtzen loossen — net zréckhalen mat de Chilis."},
    a10:{name:"Levantinescht Mezze Fest",desc:"E Sortiment vu klenge Geriichter ronderëm verschidde Fleeschzorten — déi geselleg Mahlzäit.",tip:"Mezze ass fir lues a geselleg Mohlzeiten designt. Alles opstellen a sech Zäit loossen."},
  f13:{name:"Frango Piri-Piri (Portugisescht Grillhong)",desc:"D'Gerecht, dat portugisescht Hong weltberühmt gemaach huet. Feurege, mat Knuewel, onvergiesslech.",tip:"Piri-Piri Sauce gëtt no engem Dag am Frigo nach besser — d'duebel Quantitéit maachen an e bëssen fir ze bestrachen zerécklooss."},
  f14:{name:"Poulet-Korma",desc:"Räich, cremeg a mëll gewürzt — de mëllen Curry deen jiddereen um Dësch iwwerzeegt.",tip:"Gemuelene Cashewnëss sinn dat traditionellt Bindmëttel, dat dem Korma seng seideg Textur gëtt."},
  f15:{name:"Chicken Karahi",desc:"Pakistan säi beléift Wok-Poulet-Curry — domatenräich, mat vill Iwer, Restaurant-Stil doheem.",tip:"E richtege Karahi huet bal keen dobäigesat Waasser — d'Tomaten an d'Poulet maachen déi ganz Sauce."},
  f16:{name:"Bosanski Pilav (Bosneschen Poulet-Pilaf)",desc:"E rouege Balkan Reis-Geriicht, Poulet a Reis zesumme lues gedämpft an engem Pott.",tip:"Widderstoen dem Drang ze réieren wärend de Reis kacht — dat ass de Geheimnis vun engem Pilaf deen net brei gëtt."},
  r13:{name:"Ćevapi mat Somun",desc:"D'ikonesch Stroossefudder vum Balkan — gegrillte Hackfleesch-Wurschten an engem waarme Fladenbrout.",tip:"Bicarbonat ass de Balkan Geheimnis — et hält Ćevapi liicht a zaart, ni décht."},
  r14:{name:"Lamm Seekh Kebab",desc:"Gewierztes Lammhack, op Spiéss geformt a gegrillt iwwer Kuel — e pakistanescht BBQ Muss.",tip:"Flaach Spiéss (net rond) verhënneren, datt de Kebab sech dréint an auserneen fällt op de Grill."},
  r15:{name:"Lamm Karahi",desc:"Lamm mat Schuel séier a waarm gedämpft an enger Tomate-Iwer-Bas — déif geschmackvoll, Restaurant Favorit.",tip:"Lamm mat Schuel gëtt dem Karahi seng Geschmackstiefe — wann méiglech net duerch knochenlos ersetzen."},
  r16:{name:"Espetada (Portugisesch Rëndsspiéss)",desc:"Madeira seng berühmt Knuewel-gespéckte Rëndsspiéss, traditionell iwwer op Feier gegrillt.",tip:"D'Knuewelstécker karamelliséieren a ginn séiss — net auslooss, iessen."},
  b13:{name:"Lëtzebuerger Rëndsgoulasch",desc:"Eng häerzhaft Lëtzebuerger Versioun vum mëtteleuropäesche Klassiker — räich, déif Paprika, gemaach fir kal Owenden.",tip:"Lues a sanft ass hei net verhandelbar — Iwwerhaascht beim Schmueren gëtt zähe, dréchent Rëndfleesch."},
  b14:{name:"Rëndfleesch Nihari",desc:"Deen legendäre lues gekachte pakistaneschen Eintopf, traditionell iwwer Nuecht fir de Frühstück gekacht. Déif, donkel an onvergiesslech.",tip:"D'Miel donkelbrong ze reesten ier et bäigesat gëtt gëtt dem Nihari seng charakteristesch donkel Faarf an nossäg Déift."},
  b15:{name:"Chapli Kebab",desc:"Peshawar seng berühmt flaach, knusprech-rand Hackfleesch-Fricadellen, gefëllt mat Grenadinkären a Coriander.",tip:"Tomat an Ënnizwiebel sollen ganz fein gehackt sinn, bal breiig — dat hält d'Fricadellen zaart bannendran."},
  b16:{name:"Bife à Café (Portugisescht Kaffi-Botter Steak)",desc:"E Lissabon Café Klassiker — e dënnt Steak an enger glänzender Botter-Knuewel-Kaffi Sauce. Kléngt komesch, schmaacht onheemlech.",tip:"Loosst de Kaffi net ewech well Dir denkt et schmaacht bitter — et gëtt mëll zu enger déiwer, häerzhafter Basis fir d'Sauce."},
  a11:{name:"Bosanski Lonac (Bosneschen Fleeschpott)",desc:"Bosnien säin national Eintopf-Geriicht — Schichten aus Rëndfleesch, Lamm a Geméis zesumme an engem Toungpott gedämpft.",tip:"D'Magie vum Lonac ass Gedold — dem Drang ze réieren widderstoen. D'Schichten kachen sech vun eleng an-a-nee."},
  a12:{name:"Lëtzebuerger Gemëschte Grillassiette",desc:"Eng generéis Lëtzebuerger-Stil Grillplack — einfach Wierzung, Qualitéitsfleesch, klassesche Bistro-Komfort.",tip:"D'Grillzäiten ze stafelen bedeit datt alles zesumme fäerdeg gëtt an ausrouht — de Poulet als éischt plangen."},
  a13:{name:"Pakistanesch Gemëscht Grillplack",desc:"Seekh Kebab, Poulet Tikka a Lammkoteletten zesumme op enger rauchereger, gewierzter Plack — e pakistanesche BBQ Favorit.",tip:"De Grill stafelen esou datt alles zesumme waarm um Dësch ukënnt — Poulet a Seekh kachen ähnlech séier, Lamm e bëssen éischter ufänken."},
  a14:{name:"Indesch Gemëscht Tandoori Grillplack",desc:"Klassescht Tandoori-Poulet a Lammkoteletten, mat Holzkuel gegrillt mat enger rauchereger Joghurt-Marinade — Restaurant Tandoor Goût doheem.",tip:"Déi duebel Marinad — éischt Aciditéit, dunn Joghurt-Gewierzer — ass déi richteg Tandoori Technik a mécht en oppfällege Ënnerscheed."},
  },
  bs:{
    f1:{name:"Pečena cijela piletina",desc:"Nedjeljna klasika. Hrskava koža, sočno meso, nenadmašna aroma.",tip:"Utrljajte maslac s biljem ispod kože prije pečenja za okus sljedeće razine."},
    f2:{name:"Pečeni pileći fileti na tavi",desc:"Heroj radnog dana. Zlatno izvana, nevjerovatno sočno iznutra.",tip:"Nikad ne pritiskajte piletinu u tavi — to iscijedi sokove."},
    f3:{name:"BBQ Spatchcock piletina",desc:"Otvorena za brže i ravnomjernije pečenje. Maksimalna aroma.",tip:"Noćno salamurenje daje super sočnu BBQ piletinu."},
    f4:{name:"Dimljeni BBQ pileći bataci",desc:"Mekani do kosti s glaziranim BBQ umakom.",tip:"Sačuvajte marinadu, reducirajte u tavi i poslužite kao extra umak za umakanje."},
    f5:{name:"Pileća šavarma",desc:"Legendarni levantinski ulični specijalitet. Začinjen, sočan, apsolutno adiktivan.",tip:"Nekoliko kapi melase od nara u marinadi daje nevjerovatnu dubinu."},
    f6:{name:"Šiš tavuk",desc:"Libanski pečeni pileći ražnjići — nježni, aromatični, zapečeni nad plamenom.",tip:"Toum (libanonski umak od bijelog luka) je obavezan. Miksajte bijeli luk, ulje, limun i sol."},
    f7:{name:"Chicken Tikka Masala",desc:"Najpopularniji curry na svijetu. Dimljena piletina u kremastom umaku od rajčice.",tip:"Zapečenje piletine prije dodavanja u umak je tajna pravog Tikka Masale."},
    f8:{name:"Pileći biryani",desc:"Kralj jela od riže. Aromatični basmati s začinjenom piletinom.",tip:"Nikad ne preskačite dum korak — to je ono što biryani čini biryanim."},
    f9:{name:"Teriyaki piletina",desc:"Ljepljiva, sjajna, slatko-slana savršenost. Japanska klasika.",tip:"Zarežite kožu da ostane ravna i glazura prione na svaki prorez."},
    f10:{name:"Tajlandska piletina s bosiljkom",desc:"Najpopularniji tajlandski ulični specijalitet. 15 minuta, eksplozivna aroma.",tip:"Visoka temperatura je sve. Ako vaša tava ne dimi, nije dovoljno vruća."},
    f11:{name:"Piletina s limunom i biljem na žaru",desc:"Svježe, začinsko i dimljeno. BBQ klasik koji impresionira svakoga.",tip:"Iscijedite grilani limun odmah prije posluživanja za maksimalnu svježinu."},
    f12:{name:"Marokanska piletina tagine",desc:"Kuhano na laganoj vatri s konzerviranim limunom, maslinama i aromatičnim začinima.",tip:"Konzervirani limun je duša ovog jela — pronaći u orijentalnijim radnjama."},
    r1:{name:"Klasični jagnjeći kotleti s roštilja",desc:"Jednostavno, savršeno, bezvremeno. Najbolji jagnjeći kotleti koje ćete ikad napraviti.",tip:"Medium-rare je 57°C. Termometar za meso je najbolja investicija u kuhinji."},
    r2:{name:"Kofta od govedine i jagnjetine",desc:"Bliskoistočni začinjeni ražnjići od mljevenog mesa. Puni kumina i bilja.",tip:"Ribanje luka umjesto sjeckanja sprječava raspadanje kofti."},
    r3:{name:"BBQ biftek s chimichurrijem",desc:"Argentinski pečeni biftek s živahnim zelenim umakom od bilja.",tip:"Uvijek režite meso nasuprot vlaknima — svaki zalogaj je nježniji."},
    r4:{name:"Dimljena jagnjeća plećka slajderi",desc:"Lagano dimljena jagnjeća plećka, istrgana i složena u meke kiflice.",tip:"Što duže odmori po cijepanju, sokovi se bolje raspoređuju."},
    r5:{name:"Jagnjeći mansaf",desc:"Jordansko nacionalno jelo. Jagnjetina kuhana na laganoj vatri u jogurtovom umaku, servirana na flatbread.",tip:"Kukuruzni škrob u jogurtu sprečava razdvajanje pri zagrijavanju."},
    r6:{name:"Goveđi ouzi",desc:"Styl Zaljeva — sporo pečena govedina na začinjenoj riži s orahovim jezgricama i grožđicama.",tip:"Baharat je mješavina crnog papra, korijandera, cimeta, karanfilića i muškatnog oraščića."},
    r7:{name:"Jagnjeći rogan josh",desc:"Dragulj kašmirske kuhinje. Duboko aromatičan, rubinski crveni curry od jagnjetine.",tip:"Kašmirska čili paprika daje ikonično crvenu boju bez intenzivne ljutine."},
    r8:{name:"Keema curry",desc:"Začinjena mljevena govedina s graškom. Ultimativni brzi curry za radni dan.",tip:"Kuhanje na visokoj temperaturi dok mljeveno meso ne bude potpuno suho koncentrira sve arome."},
    r9:{name:"Korejski goveđi bulgogi",desc:"Slatki, slani, blago dimljeni korejski BBQ govedina. Najbolje u tavi.",tip:"Ribana azijska kruška je tradicionalni omekšivač — vrijedi je pronaći."},
    r10:{name:"Mongolska jagnjetina stir-fry",desc:"Smjela kinesko-američka klasika. Nježna jagnjetina s sjajnim hoisin umakom.",tip:"Velveting je restoranski secret za mekanu jagnjetinu u woku."},
    r11:{name:"Jagnjeći shepherd's pie",desc:"Ultimativna britanska comfort hrana. Jagnjetina kuhana na laganoj vatri ispod zlatnog pire krompira.",tip:"Utisnite površinu pirea vilicom prije pečenja — postaje hrskavije."},
    r12:{name:"Japanski jagnjeći sukiyaki",desc:"Zagrijavajući japanski hot pot s tanko rezanom jagnjetinom u sojinoj juhi.",tip:"Sirovo jaje za umakanje je tradicionalno i apsolutno ukusno — nikad ne preskačite."},
    b1:{name:"Savršeni ribeye na lijevanom gvožđu",desc:"Definitivan steakhouse ribeye kod kuće. Kora poput stakla, ružičasto iznutra.",tip:"Nikad ne pecite hladan odrezak. 1 sat na sobnoj temperaturi = ravnomjerno pečenje od ruba do ruba."},
    b2:{name:"Smash burgeri",desc:"Diner smash burger koji je zauvijek promijenio burgersku kulturu.",tip:"20% masti u mljevenom mesu je bitno. Mješavina s manje masti pravi suhe, tužne burgere."},
    b3:{name:"Cowboy ribeye na kosti",desc:"Debelo rezan, ribeye na kosti iznad otvorene vatre. Praistorijski, veličanstven.",tip:"Reverse-sear metoda daje savršeno pečenje od ruba do ruba."},
    b4:{name:"Brisket s kafom",desc:"Tamna, hrskava kora izvana. Raspadajuće nježno iznutra.",tip:"Kad temperatura brisket zastane na 70°C, nastavite — ona ĆE se ponovo popeti."},
    b5:{name:"Goveđa šavarma",desc:"Levantinska ulična ikona. Začinjena govedina u flatbread.",tip:"Tehnika složene i pečene imitira šavarma ražanj kod kuće — i radi."},
    b6:{name:"Hawawshi",desc:"Hrskav egipatski flatbread punjen začinjenim mljevenim mesom. Savršena ulična hrana.",tip:"Korišćenje sirovog mesa u punjenju čuva ga nevjerovatno sočnim."},
    b7:{name:"Goveđi Madras curry",desc:"Južnoindijski stil vrući, kiseli curry od govedine s dubokim umakom.",tip:"Tamarind je bitan za kiseli ton koji definira Madras — nikad ne preskačite."},
    b8:{name:"Goveđi seekh kebab",desc:"Zapečeni kebabi od mljevenog mesa začinjeni đumbirom, čilijem i garam masalom.",tip:"Grama brašno vezuje kebab i daje suptilnu orašastu notu."},
    b9:{name:"Japanski gyudon (goveđa zdjela)",desc:"Tokijska ikonična zdjela s govedinom i lukom. Najbrža comfort hrana.",tip:"Zamolite mesara da narezuje Sirloin tanko kao papir, ili polusmrznute da narezujete kod kuće."},
    b10:{name:"Vijetnamski goveđi pho",desc:"Vijetnamska juha koja grije dušu. Duboka aromatična, bistra juha.",tip:"Dobra pho juha treba biti bistra, ne mutna. Neprestano skidanje pjene je ključ."},
    b11:{name:"Beef Wellington",desc:"Ultimativno showstopper jelo. File omotan u miješavinu gljiva i lisnato tijesto.",tip:"Hlađenje nakon omotavanja je kritično — čuva oblik i lisnato tijesto hrskavim."},
    b12:{name:"Libanski goveđi kibbeh",desc:"Začinjena govedina u bulgur omotaču. Hrskavo izvana, sočno iznutra.",tip:"Vanjsku mješavinu čuvati hladnom čini oblikovanje mnogo lakšim."},
    a1:{name:"Nedjeljni pečeni gozba",desc:"Kompletno nedjeljno pečenje — piletina I govedina, sve prilog.",tip:"Odmor mesa je jednako važan kao i kuhanje. Nikad ne preskačite."},
    a2:{name:"Mješoviti roštilj tanjir",desc:"Cijela kutija na jednom tanjiru. Svaki protein, savršeno pečen.",tip:"Odmorite sve komade prije slaganja na tanjir — topla pećnica čuva sve toplo."},
    a3:{name:"Ultimativni vrtni BBQ",desc:"Piletina, govedina, jagnjetina — sve istovremeno na roštilju. Za gomilu.",tip:"Napišite plan rasporeda prije nego počnete. Haos ruši BBQ brže od lošeg mesa."},
    a4:{name:"Musakhan",desc:"Palestinsko nacionalno jelo. Piletina pečena s karameliziranim lukom i sumakom.",tip:"Više sumaka nego što mislite. Budite rasipni s njim — to je ono što Musakhan čini posebnim."},
    a5:{name:"Crown Biryani",desc:"Mješoviti meso biryani — piletina i jagnjetina složeni s aromatičnim basmatiem.",tip:"Dvije odvojene pripreme mesa stvaraju nevjerovatnu dubinu okusa."},
    a6:{name:"Hot Pot večer",desc:"Interaktivni kineski Hot Pot — tanko rezano meso, kuhano za stolom.",tip:"Hot Pot je događaj, ne samo obrok. Prigušite svjetla i uživajte 2 sata."},
    a7:{name:"Korejska BBQ večer",desc:"Korejski BBQ kod kuće — marinirano meso, pečeno za stolom.",tip:"Ssam omot (list salate) savršeno uravnotežuje bogatstvo mesa."},
    a8:{name:"Mješoviti tandoori tanjir",desc:"Kompletan tandoori tanjir — piletina i jagnjetina marinirani, zapečeni na roštilju.",tip:"Jogurtova marinada omekšava I štiti od intenzivne topline."},
    a9:{name:"Portugalni BBQ tanjir",desc:"Piri-piri piletina, govedina i jagnjeći kotleti — proslava na dasci.",tip:"Dobra piri-piri treba da vas malo znoji — ne štedite na čilijima."},
    a10:{name:"Levantinska mezze gozba",desc:"Asortiman malih jela oko raznih vrsta mesa — socijalni obrok.",tip:"Mezze je dizajniran za sporost i druženost. Rasporedite sve i uzmite vremena."},
  f13:{name:"Frango Piri-Piri (Portugalska Piletina sa Roštilja)",desc:"Jelo koje je proslavilo portugalsku piletinu širom svijeta. Vatreno, sa puno bijelog luka, nezaboravno.",tip:"Piri-piri umak se poboljša nakon dana u frižideru — napravite duplo i sačuvajte malo za premazivanje."},
  f14:{name:"Piletina Korma",desc:"Bogato, kremasto i blago začinjeno — blagi kari koji osvaja svakoga za stolom.",tip:"Mljeveni indijski oraščići su tradicionalno sredstvo za zgušnjavanje koje daje kormi svilenkastu teksturu."},
  f15:{name:"Piletina Karahi",desc:"Pakistanski omiljeni pileći kari iz vok tave — bogat paradajzom, sa naglaskom na đumbir, restoranski stil kod kuće.",tip:"Pravi karahi ima jako malo dodane vode — paradajz i piletina prave cijeli sos."},
  f16:{name:"Bosanski Pilav",desc:"Utješno balkansko jelo od riže, piletina i riža polako kuhani zajedno u jednom loncu.",tip:"Odolite iskušenju da mješate dok se riža kuha — to je tajna pilava koji nije kašast."},
  r13:{name:"Ćevapi sa Somunom",desc:"Najpoznatija ulična hrana Balkana — pečeni ćevapi od mljevenog mesa u mekom somunu.",tip:"Soda bikarbona je balkanska tajna — održava ćevape lakim i mekim, nikad gustim."},
  r14:{name:"Jagnjeći Seekh Kebab",desc:"Začinjena mljevena jagnjetina oblikovana na ražnjiće i pečena na drveni ugalj — pakistanski roštiljski must.",tip:"Ravni ražnjići (ne okrugli) sprečavaju kebab da se okreće i raspada na roštilju."},
  r15:{name:"Jagnjeći Karahi",desc:"Jagnjetina sa kosti brzo i vruće kuhana u paradajz-đumbir osnovi — duboko ukusno, restoranski favorit.",tip:"Meso sa kosti daje karahiju dubinu ukusa — ne zamjenjujte mesom bez kosti ako je moguće."},
  r16:{name:"Espetada",desc:"Čuveni ražnjići od govedine sa bijelim lukom sa Madeire, tradicionalno pečeni na otvorenoj vatri.",tip:"Komadi bijelog luka karameliziraju i omekšaju — ne izostavljajte ih, jedite ih."},
  b13:{name:"Luksemburški Gulaš od Govedine",desc:"Srdačna luksemburška verzija srednjoevropskog klasika — bogata, duboko paprikasta, napravljena za hladne večeri.",tip:"Sporo i nježno je ovdje neizostavno — žurba sa dinstanjem daje žilavu, suhu govedinu."},
  b14:{name:"Nihari od Govedine",desc:"Legendarni sporo kuhani pakistanski gulaš, tradicionalno kuhan preko noći za doručak. Dubok, taman i nezaboravan.",tip:"Prženje brašna do tamno smeđe boje prije dodavanja daje niháriju njegovu karakterističnu tamnu boju i orašastu dubinu."},
  b15:{name:"Chapli Kebab",desc:"Čuveni pljosnati, hrskavih ivica pljeskavice od mljevene govedine iz Pešavara, pune sjemenki nara i korijandera.",tip:"Paradajz i luk trebaju biti veoma sitno isjeckani, skoro kao pire — to čuva pljeskavice mekim iznutra."},
  b16:{name:"Bife à Café",desc:"Klasik lisabonskih kafića — tanak odrezak u sjajnom maslac-bijeli luk-kafa sosu. Zvuči čudno, ukus je nevjerovatan.",tip:"Ne izostavljajte kafu misleći da će biti gorka — ublažava se u dubok, ukusan temelj za sos."},
  a11:{name:"Bosanski Lonac",desc:"Bosansko nacionalno jelo iz jednog lonca — slojevi govedine, jagnjetine i povrća polako kuhani zajedno u glinenom loncu.",tip:"Magija lonca je strpljenje — odolite iskušenju da mješate. Slojevi se kuhaju jedni u druge sami."},
  a12:{name:"Luksemburški Mješani Roštilj Tanjir",desc:"Velikodušan roštilj tanjir u luksemburškom stilu — jednostavno začinjavanje, kvalitetno meso, klasična bistro udobnost.",tip:"Raspoređivanje vremena roštiljanja znači da sve završava i odmara zajedno — planirajte piletinu prvo."},
  a13:{name:"Pakistanski Mješani Roštilj Tanjir",desc:"Seekh kebab, piletina tikka i jagnjeći kotleti zajedno na dimljenom, začinjenom tanjiru — pakistanski roštiljski favorit.",tip:"Rasporedite roštilj tako da sve stigne toplo na sto zajedno — piletina i seekh se kuhaju sličnom brzinom, počnite jagnjetinu malo ranije."},
  a14:{name:"Indijski Mješani Tandoori Roštilj",desc:"Klasična tandoori piletina i jagnjeći kotleti, pečeni na drvenom uglju sa dimljenom marinadom od jogurta — restoranski tandoor ukus kod kuće.",tip:"Dupla marinada — prvo kiselina, zatim jogurt-začini — je prava tandoori tehnika i pravi primjetnu razliku."},
  },
  pt:{
    f1:{name:"Frango Assado Inteiro",desc:"O clássico de domingo. Pele crocante, carne suculenta, aroma imbatível.",tip:"Esfregue manteiga de ervas sob a pele antes de assar para um sabor de outro nível."},
    f2:{name:"Filets de Frango Grelhados",desc:"O herói da semana. Dourado por fora, incrivelmente suculento por dentro.",tip:"Nunca pressionar o frango na frigideira — isso espreme os sucos."},
    f3:{name:"Frango Borboleta na Grelha",desc:"Borboleteado para cozinhar mais rápido e uniformemente. Máximo de char, máximo sabor.",tip:"Mergulhar de um dia para o outro em água salgada dá um frango BBQ ultra-suculento."},
    f4:{name:"Pernas de Frango BBQ Fumado",desc:"Macio até cair do osso com um molho BBQ caramelizado e pegajoso.",tip:"Guardar a marinada, reduzir numa panela e servir como molho extra para mergulhar."},
    f5:{name:"Shawarma de Frango",desc:"O lendário street food levantino. Temperado, suculento, absolutamente viciante.",tip:"Umas gotas de melaço de romã na marinada adiciona uma profundidade incrível."},
    f6:{name:"Shish Tawook",desc:"Espetadas de frango grelhadas libanesas — tenras, aromáticas, tocadas pela chama.",tip:"Toum (molho de alho libanês) é obrigatório. Misture alho, óleo, limão e sal."},
    f7:{name:"Chicken Tikka Masala",desc:"O curry mais amado do mundo. Frango fumado num molho cremoso de tomate.",tip:"Carbonizar o frango antes de adicionar ao molho é o segredo do tikka masala autêntico."},
    f8:{name:"Biryani de Frango",desc:"O rei dos pratos de arroz. Basmati aromático em camadas com frango temperado.",tip:"Nunca saltar a etapa dum (vapor) — é o que faz o biryani ser biryani."},
    f9:{name:"Frango Teriyaki",desc:"Pegajoso, brilhante, perfeito entre o doce e o salgado. O clássico japonês.",tip:"Faça cortes no frango para ficar plano e o glaze aderir a cada ranhura."},
    f10:{name:"Frango com Manjericão Tailandês",desc:"O street food mais popular da Tailândia. 15 minutos, sabor explosivo.",tip:"O calor intenso é tudo. Se a frigideira não estiver a fumar, não está quente o suficiente."},
    f11:{name:"Frango Grelhado com Limão e Ervas",desc:"Fresco, cítrico e fumado. Um clássico BBQ que agrada a todos.",tip:"Esprema o limão grelhado sobre o frango mesmo antes de comer para máxima frescura."},
    f12:{name:"Tagine de Frango Marroquino",desc:"Cozido lentamente com limão preservado, azeitonas e especiarias aromáticas.",tip:"O limão preservado é a alma deste prato — encontre-o em mercearias do Médio Oriente."},
    r1:{name:"Costeletas de Borrego Clássicas",desc:"Simples, perfeito, intemporal. As melhores costeletas de borrego que fará.",tip:"Mal passado = 57°C no interior. Um termómetro de carne é o melhor investimento de cozinha."},
    r2:{name:"Kofta de Vaca e Borrego",desc:"Almôndegas médio-orientais temperadas em espeto. Cheias de cominhos e ervas.",tip:"Ralar em vez de picar a cebola evita que o kofta se desfaça."},
    r3:{name:"Sirloin BBQ com Chimichurri",desc:"Bife grelhado ao estilo argentino com um molho verde de ervas vibrante.",tip:"Sempre fatiar a vaca contra o grão — encurta as fibras musculares para maior maciez."},
    r4:{name:"Sliders de Pá de Borrego Fumada",desc:"Pá de borrego cozida lentamente, desfiada e empilhada em pãezinhos macios.",tip:"Quanto mais longo o descanso após desfiar, mais os sucos se redistribuem pela carne."},
    r5:{name:"Mansaf de Borrego",desc:"O prato nacional da Jordânia. Borrego cozido em molho de iogurte, servido no pão.",tip:"Adicionar amido de milho ao iogurte evita que se separe quando aquecido."},
    r6:{name:"Ouzi de Vaca",desc:"Vaca assada lentamente ao estilo do Golfo sobre arroz temperado com frutos secos.",tip:"Baharat é uma mistura de pimenta-preta, coentros, canela, cravinho e noz-moscada."},
    r7:{name:"Rogan Josh de Borrego",desc:"A joia da cozinha da Caxemira. Caril de borrego profundamente aromático, vermelho-rubi.",tip:"O pimento da Caxemira dá a cor vermelha icónica sem calor intenso."},
    r8:{name:"Caril Keema",desc:"Carne picada de vaca temperada com ervilhas. O caril rápido por excelência.",tip:"Cozinhar em fogo alto até a carne estar bastante seca concentra todo o sabor."},
    r9:{name:"Bulgogi de Vaca Coreano",desc:"Churrasco coreano de vaca doce-salgado e levemente fumado.",tip:"A pera asiática ralada é o amaciador tradicional — vale mesmo a pena encontrar."},
    r10:{name:"Stir-Fry de Borrego Mongol",desc:"Clássico sino-americano ousado. Borrego tenro com molho hoisin brilhante.",tip:"O velveting é o segredo dos restaurantes para carne de stir-fry tenra, não dura."},
    r11:{name:"Shepherd's Pie de Borrego",desc:"O comfort food britânico por excelência. Borrego cozido lentamente sob puré dourado.",tip:"Riscar a superfície do puré antes de ir ao forno — fica mais crocante."},
    r12:{name:"Sukiyaki de Borrego Japonês",desc:"Um hot pot japonês reconfortante com borrego fatiado fino em caldo de soja.",tip:"O molho de ovo cru é tradicional e absolutamente delicioso — não saltar."},
    b1:{name:"Ribeye Perfeito em Ferro Fundido",desc:"O ribeye de steakhouse definitivo em casa. Crosta como vidro, rosado por dentro.",tip:"Nunca cozinhar um bife frio. 1 hora à temperatura ambiente = cozedura uniforme."},
    b2:{name:"Smash Burgers",desc:"O smash burger estilo diner que mudou a cultura do hambúrguer para sempre.",tip:"Carne picada com 20% de gordura é essencial. Carne magra faz hambúrgueres secos e tristes."},
    b3:{name:"Ribeye de Cowboy no Osso",desc:"Ribeye grosso no osso cozido sobre lume vivo. Pré-histórico, magnífico.",tip:"O método reverse-sear dá cozedura perfeita de borda a borda."},
    b4:{name:"Brisket BBQ com Café",desc:"Exterior escuro e crocante. Interior derretido e tenro.",tip:"Se a temperatura do brisket estagnar nos 70°C, persistir — VAI voltar a subir."},
    b5:{name:"Shawarma de Vaca",desc:"O ícone do street food levantino. Vaca temperada e fatiada em pão pita.",tip:"A técnica de empilhar e assar imita um espeto de shawarma em casa — funciona mesmo."},
    b6:{name:"Hawawshi (Pão Egípcio Recheado)",desc:"Pão pita egípcio crocante recheado com carne picada temperada.",tip:"Usar carne crua no recheio mantém-no incrivelmente suculento."},
    b7:{name:"Caril Madras de Vaca",desc:"Caril de vaca picante e ácido ao estilo do Sul da Índia com molho profundo.",tip:"O tamarindo é essencial para a nota ácida que define o Madras — não saltar."},
    b8:{name:"Seekh Kebab de Vaca",desc:"Kebabs de carne picada carbonizados temperados com gengibre, malagueta e garam masala.",tip:"A farinha de grão-de-bico liga o kebab e adiciona um sabor subtil a noz."},
    b9:{name:"Gyudon Japonês (Bowl de Vaca)",desc:"O icónico bowl de vaca e cebola de Tóquio. O comfort food mais rápido.",tip:"Pedir ao talhante para fatiar o sirloin em papel fino, ou semi-congelar para fatiar em casa."},
    b10:{name:"Pho de Vaca Vietnamita",desc:"A sopa reconfortante do Vietname. Um caldo claro profundamente aromático.",tip:"Um bom caldo de pho deve ser claro, não turvo. Escumar constantemente é a chave."},
    b11:{name:"Beef Wellington",desc:"O prato de show definitivo. Filet embrulhado em duxelles de cogumelos e massa folhada dourada.",tip:"Refrigerar após embrulhar é crucial — mantém a forma e a massa crocante."},
    b12:{name:"Kibbeh Libanês",desc:"O prato nacional do Líbano — carne picada temperada em casing de trigo bulgur.",tip:"Manter a mistura exterior muito fria facilita muito a moldagem."},
    a1:{name:"Festim de Assado de Domingo",desc:"O assado de domingo completo — frango E vaca, todos os acompanhamentos.",tip:"Deixar a vaca repousar é tão importante quanto cozinhá-la. Nunca saltar."},
    a2:{name:"Travessa de Grelhados Mistos",desc:"Toda a caixa numa travessa. Cada proteína, perfeitamente cozinhada.",tip:"Deixar cada peça repousar antes de colocar na travessa — o forno mantém tudo quente."},
    a3:{name:"O BBQ de Festa de Jardim Definitivo",desc:"Frango, vaca, borrego — tudo na grelha ao mesmo tempo. Para alimentar uma multidão.",tip:"Escrever o plano de timing antes de começar. O caos mata um BBQ."},
    a4:{name:"Musakhan (Frango Assado Palestiniano)",desc:"O prato nacional da Palestina. Frango assado com cebola caramelizada e sumagre.",tip:"Mais sumagre do que pensa. Ser ousado com ele — é o que torna o musakhan extraordinário."},
    a5:{name:"Biryani Royal",desc:"Biryani Royal — frango e borrego em camadas com basmati aromático.",tip:"Duas preparações separadas de carne criam uma profundidade de sabor inigualável."},
    a6:{name:"Noite de Hot Pot",desc:"Hot pot chinês interactivo — carnes em fatias finas cozinhadas à mesa.",tip:"O hot pot é um evento, não apenas uma refeição. Baixar as luzes e deixar correr 2 horas."},
    a7:{name:"Noite de BBQ Coreano",desc:"BBQ coreano em casa — carnes marinadas grelhadas à mesa.",tip:"O wrap ssam (folha de alface) equilibra perfeitamente a riqueza da carne."},
    a8:{name:"Travessa Tandoori Mista",desc:"Uma travessa tandoori completa — frango e borrego marinados, grelhados no carvão.",tip:"A marinada de iogurte amacia E protege do calor intenso."},
    a9:{name:"Travessa BBQ ao Estilo Português",desc:"Frango piri-piri, vaca grelhada e costeletas de borrego — uma celebração numa tábua.",tip:"Um bom piri-piri deve fazer suar um pouco — não segurar nas malaguetas."},
    a10:{name:"Festa Mezze Levantina",desc:"Uma variedade de pequenos pratos centrados em diferentes carnes — a refeição social.",tip:"O mezze é concebido para ser lento e social. Pôr tudo à mesa e levar o tempo necessário."},
  f13:{name:"Frango Piri-Piri",desc:"O prato que tornou o frango português famoso no mundo inteiro. Picante, com alho, inesquecível.",tip:"O molho piri-piri melhora depois de um dia no frigorífico — faça o dobro e guarde um pouco para pincelar."},
  f14:{name:"Korma de Frango",desc:"Rico, cremoso e suavemente picante — o caril suave que conquista toda a mesa.",tip:"Castanhas de caju moídas são o espessante tradicional que dá ao korma a sua textura sedosa."},
  f15:{name:"Chicken Karahi",desc:"O amado caril de frango wok do Paquistão — rico em tomate, com gengibre marcante, estilo restaurante em casa.",tip:"Um karahi verdadeiro tem quase nenhuma água adicionada — os tomates e o frango criam todo o molho."},
  f16:{name:"Bosanski Pilav (Pilaf de Frango da Bósnia)",desc:"Um reconfortante prato de arroz balcânico, frango e arroz cozinhados lentamente juntos numa só panela.",tip:"Resista à vontade de mexer enquanto o arroz cozinha — é o segredo de um pilaf que não fica papa."},
  r13:{name:"Ćevapi com Somun",desc:"A comida de rua mais icónica dos Balcãs — salsichas de carne picada grelhadas em pão plano macio.",tip:"O bicarbonato de sódio é o segredo balcânico — mantém os ćevapi leves e tenros, nunca densos."},
  r14:{name:"Kebab Seekh de Borrego",desc:"Borrego picado temperado moldado em espetos e grelhado em carvão — um essencial do churrasco paquistanês.",tip:"Espetos planos (não redondos) evitam que o kebab gire e se desfaça na grelha."},
  r15:{name:"Lamb Karahi",desc:"Borrego com osso cozinhado rápido e quente numa base de tomate e gengibre — profundamente saboroso, favorito dos restaurantes.",tip:"O borrego com osso dá ao karahi a sua profundidade de sabor — não substituir por desossado se possível."},
  r16:{name:"Espetada",desc:"Os famosos espetos de vaca com alho da Madeira, tradicionalmente grelhados em fogo aberto.",tip:"Os pedaços de alho caramelizam e amolecem — não os deixe de lado, coma-os."},
  b13:{name:"Goulash de Vaca Luxemburguês",desc:"Uma versão luxemburguesa reconfortante do clássico da Europa Central — rico, profundamente apimentado com colorau, feito para noites frias.",tip:"Lento e suave é inegociável aqui — apressar o estufado dá carne dura e seca."},
  b14:{name:"Nihari de Vaca",desc:"O lendário guisado paquistanês cozinhado lentamente, tradicionalmente deixado a noite toda para o pequeno-almoço. Profundo, escuro e inesquecível.",tip:"Torrar a farinha até ficar castanha escura antes de adicionar dá ao nihari a sua cor escura característica e profundidade amendoada."},
  b15:{name:"Chapli Kebab",desc:"Os famosos hambúrgueres de carne picada, planos e crocantes nas bordas, de Peshawar, cheios de sementes de romã e coentros.",tip:"O tomate e a cebola devem ser cortados bem finamente, quase em puré — isso mantém os hambúrgueres tenros por dentro."},
  b16:{name:"Bife à Café",desc:"Um clássico dos cafés de Lisboa — um bife fino num molho brilhante de manteiga, alho e café. Parece estranho, sabe incrível.",tip:"Não deixe o café de fora por achar que vai ficar amargo — suaviza-se numa base saborosa e profunda para o molho."},
  a11:{name:"Bosanski Lonac (Panela de Carnes da Bósnia)",desc:"O prato nacional bósnio numa só panela — camadas de vaca, borrego e legumes cozinhados lentamente juntos numa panela de barro.",tip:"A magia do lonac é a paciência — resista à vontade de mexer. As camadas cozinham-se umas nas outras sozinhas."},
  a12:{name:"Prato Misto Grelhado Luxemburguês",desc:"Um generoso prato grelhado ao estilo luxemburguês — tempero simples, carne de qualidade, conforto clássico de bistrô.",tip:"Escalonar os tempos de grelha significa que tudo fica pronto e repousa junto — planear o frango primeiro."},
  a13:{name:"Prato Misto Grelhado Paquistanês",desc:"Kebab seekh, tikka de frango e costeletas de borrego juntos num prato fumado e picante — um favorito do churrasco paquistanês.",tip:"Escalone a grelha para que tudo chegue quente à mesa junto — frango e seekh cozinham a velocidades semelhantes, comece o borrego um pouco antes."},
  a14:{name:"Grelhados Mistos Tandoori Indianos",desc:"Frango tandoori clássico e costeletas de borrego, grelhados no carvão com uma marinada fumada de iogurte — sabor de tandoor de restaurante em casa.",tip:"A marinada dupla — ácido primeiro, depois iogurte-especiarias — é a verdadeira técnica tandoori e faz uma diferença notável."},
  },
  ar:{
    f1:{name:"دجاج محمر كامل",desc:"الكلاسيكي الأحد. جلد مقرمش، لحم طري، رائحة لا تُقاوم.",tip:"افرك الزبدة العشبية تحت الجلد قبل الشوي للحصول على نكهة استثنائية."},
    f2:{name:"فيليه دجاج مقلي",desc:"بطل أيام الأسبوع. ذهبي من الخارج، طري بشكل لا يُصدَّق من الداخل.",tip:"لا تضغط أبداً على الدجاج في المقلاة — هذا يعصر العصائر."},
    f3:{name:"دجاج سبتشكوك على الشواية",desc:"مفرود لطهي أسرع وأكثر اتساقاً. أقصى قدر من الشوي والنكهة.",tip:"النقع طوال الليل في الماء المملح يعطيك دجاج شواية طرياً بشكل مميز."},
    f4:{name:"أرجل دجاج مدخنة على الشواية",desc:"طرية جداً مع صلصة BBQ مكرملة لاصقة.",tip:"احتفظ بالمارينيد وقلله في مقلاة وقدمه كصلصة غمس إضافية."},
    f5:{name:"شاورما دجاج",desc:"أشهر طعام شارع شرق أوسطي. متبّل، طري، مُدمِن بشكل مطلق.",tip:"بضع قطرات من دبس الرمان في المارينيد تضيف عمقاً لا يصدق."},
    f6:{name:"شيش طاووق",desc:"أسياخ دجاج مشوية لبنانية — طرية وعطرة ومشوية على اللهب.",tip:"التوم (صلصة الثوم اللبنانية) إلزامي. اخلط الثوم والزيت والليمون والملح."},
    f7:{name:"تيكا ماسالا الدجاج",desc:"الكاري الأكثر شعبية في العالم. دجاج مدخن في صلصة طماطم كريمية.",tip:"تحمير الدجاج قبل إضافته للصلصة هو سر تيكا ماسالا الأصيل."},
    f8:{name:"برياني الدجاج",desc:"ملك أطباق الأرز. أرز بسمتي عطري على طبقات مع دجاج متبّل.",tip:"لا تتخطَّ أبداً مرحلة الدَّم (البخار) — هذا ما يجعل البرياني برياني."},
    f9:{name:"تيرياكي الدجاج",desc:"لاصق ولامع، ومثالي التوازن بين الحلو والمالح. الكلاسيكي الياباني.",tip:"اخدش الدجاج ليبقى مسطحاً والتزجيج يلتصق بكل شق."},
    f10:{name:"دجاج الريحان التايلاندي",desc:"أشهر أكل شارع تايلاندي. 15 دقيقة، نكهة انفجارية.",tip:"الحرارة العالية هي كل شيء. إذا لم تكن مقلاتك تدخن، فهي ليست ساخنة بما يكفي."},
    f11:{name:"دجاج مشوي بالليمون والأعشاب",desc:"منعش وحامض ومدخن. كلاسيكي BBQ يرضي الجميع.",tip:"اعصر الليمون المشوي على الدجاج مباشرة قبل الأكل للحصول على أقصى نضارة."},
    f12:{name:"طاجين الدجاج المغربي",desc:"يُطهى ببطء مع الليمون المحفوظ والزيتون والبهارات العطرية.",tip:"الليمون المحفوظ هو روح هذا الطبق — ابحث عنه في المتاجر الشرقية."},
    r1:{name:"قطع الضأن المشوية الكلاسيكية",desc:"بسيطة، مثالية وخالدة. أفضل قطع ضأن ستعدّها على الإطلاق.",tip:"متوسط النضج = 57 درجة داخلياً. ميزان حرارة اللحم هو أفضل استثمار مطبخي."},
    r2:{name:"كفتة اللحم البقري والضأن",desc:"كفتة شرق أوسطية متبّلة على أسياخ. محشوة بالكمون والأعشاب.",tip:"برش البصل بدلاً من تقطيعه يمنع الكفتة من التفكك."},
    r3:{name:"سيرلوين شواية مع تشيميتشوري",desc:"لحم بقري مشوي بالأسلوب الأرجنتيني مع صلصة خضراء عطرية.",tip:"دائماً اقطع اللحم البقري عكس الألياف للحصول على أقصى طراوة."},
    r4:{name:"سلايدرز كتف الضأن المدخنة",desc:"كتف ضأن مطهو ببطء، ممزق ومكدس في خبز طري.",tip:"كلما طالت فترة الراحة بعد التمزيق، كلما تشربت العصائر في اللحم أكثر."},
    r5:{name:"منسف الضأن",desc:"الطبق الوطني الأردني. ضأن مطهو في صلصة اللبن، يُقدَّم على الخبز والأرز.",tip:"إضافة ملعقة نشا للبن تمنع تقطعه عند التسخين."},
    r6:{name:"أوزي اللحم البقري",desc:"لحم بقري محمر ببطء على الطريقة الخليجية فوق أرز متبّل بالمكسرات.",tip:"البهارات خليط من الفلفل الأسود والكزبرة والقرفة والقرنفل وجوزة الطيب."},
    r7:{name:"كاري لحم الضأن روغان جوش",desc:"جوهرة المطبخ الكشميري. كاري ضأن عميق العطور أحمر كالياقوت.",tip:"الفلفل الكشميري يعطي اللون الأحمر الأيقوني دون حدة مفرطة."},
    r8:{name:"كاري الكيما",desc:"لحم مفروم متبّل مع البازلاء. الكاري السريع المثالي لأيام الأسبوع.",tip:"الطهي على نار عالية حتى يجف اللحم تماماً يُركّز كل النكهات."},
    r9:{name:"بولغوغي اللحم البقري الكوري",desc:"شواء كوري بقري حلو-مالح بلمسة مدخنة خفيفة. أفضل ما تضعه في مقلاة.",tip:"الكمثرى الآسيوية المبشورة هي المُطرّي التقليدي — تستحق البحث عنها."},
    r10:{name:"قلي الضأن المنغولي",desc:"كلاسيكي صيني-أمريكي جريء. ضأن طري مع صلصة هويسين لامعة.",tip:"الفيلفيتينج هو سر المطاعم للحصول على لحم قلي طري غير مطاطي."},
    r11:{name:"باي الضأن الراعي",desc:"الطعام المريح البريطاني الأمثل. ضأن مطهو ببطء تحت بطاطس مهروسة ذهبية.",tip:"اخدش سطح البطاطس المهروسة قبل الفرن — تصبح أكثر قرمشة."},
    r12:{name:"سوكياكي الضأن الياباني",desc:"طاجين ياباني دافئ مع الضأن مقطع رفيع في مرق الصويا الحلو.",tip:"الغمس في البيضة النيئة تقليدي ولذيذ للغاية — لا تتخطاه."},
    b1:{name:"ريبآي مثالي في مقلاة حديدية",desc:"ريبآي البيت الذي ينافس المطاعم. قشرة كالزجاج، وردي من الداخل.",tip:"لا تطبخ أبداً شريحة لحم باردة. ساعة على درجة الغرفة = طهي متساوٍ من جميع الجهات."},
    b2:{name:"سماش بيرغر",desc:"سماش بيرغر بأسلوب المطاعم الذي غير ثقافة البرغر إلى الأبد.",tip:"اللحم المفروم بنسبة 20٪ دهون ضروري. اللحم قليل الدهون يصنع برغر جافاً وحزيناً."},
    b3:{name:"ريبآي الكاوبوي على العظم",desc:"ريبآي سميك على العظم فوق لهب مباشر. ما قبل التاريخ، رائع.",tip:"طريقة الشوي العكسي تعطي درجة نضج مثالية من الحافة إلى الحافة."},
    b4:{name:"بريسكت شواية بالقهوة",desc:"قشرة خارجية داكنة ومقرمشة. طري من الداخل يذوب في الفم.",tip:"إذا ثبتت درجة حرارة البريسكت عند 70 درجة، واصل — ستعود للارتفاع."},
    b5:{name:"شاورما لحم بقري",desc:"أيقونة أكل الشارع الشرق أوسطي. لحم بقري متبّل في خبز.",tip:"تقنية التكديس والشوي تحاكي سيخ الشاورما في المنزل — وتنجح فعلاً."},
    b6:{name:"حواوشي (خبز مصري محشو)",desc:"خبز مصري مقرمش محشو بلحم مفروم متبّل. أكل شارع مثالي.",tip:"استخدام اللحم النيئ في الحشو يبقيه طرياً بشكل لا يصدق."},
    b7:{name:"كاري مدراس اللحم البقري",desc:"كاري لحم بقري حار وحامض بأسلوب جنوب الهند.",tip:"التمر الهندي ضروري للنكهة الحامضة التي تُعرّف مدراس — لا تتخطاه."},
    b8:{name:"سيخ كباب اللحم البقري",desc:"كباب لحم مفروم محروق متبّل بالزنجبيل والفلفل الحار وغرام ماسالا.",tip:"دقيق الحمص يربط الكباب ويضيف نكهة مكسرات خفية."},
    b9:{name:"غيودون ياباني (طبق لحم بقري)",desc:"طبق اللحم البقري والبصل الأيقوني في طوكيو. أسرع طعام مريح.",tip:"اطلب من الجزار تقطيع السيرلوين رفيعاً جداً، أو نصف تجميده للتقطيع في المنزل."},
    b10:{name:"فو اللحم البقري الفيتنامي",desc:"حساء الشعيرية الفيتنامي المريح. مرق صافٍ عميق النكهة.",tip:"مرق الفو الجيد يجب أن يكون صافياً لا عكراً. الكشط المستمر هو المفتاح."},
    b11:{name:"لحم ويلينغتون",desc:"الطبق المبهر بامتياز. الفيليه مُغلَّف في ديكسيل الفطر وعجين النفخ الذهبي.",tip:"التبريد بعد اللف ضروري — يحافظ على الشكل ويبقي العجين مقرمشاً."},
    b12:{name:"كبة لبنانية",desc:"الطبق الوطني اللبناني — لحم مفروم متبّل في غلاف من برغل القمح.",tip:"إبقاء خليط الغلاف بارداً جداً يجعل التشكيل أسهل بكثير."},
    a1:{name:"وليمة الشوي الأحد",desc:"الشوي الأحد الكامل — دجاج ولحم بقري مع كل المقبلات.",tip:"راحة اللحم البقري بعد الطهي بالغة الأهمية كالطهي نفسه. لا تتخطاه أبداً."},
    a2:{name:"طبق مشكّل مشوي",desc:"كل الصندوق على طبق واحد. كل بروتين مطهو بشكل مثالي.",tip:"دع كل قطعة ترتاح قبل وضعها في الطبق — فرن دافئ يبقي الجميع ساخناً."},
    a3:{name:"الشواء المثالي للحفلات",desc:"دجاج ولحم بقري وضأن — كل شيء على الشبكة دفعة واحدة. لإطعام جمع.",tip:"اكتب خطة التوقيت قبل البدء. الفوضى تقتل الشواء أسرع من اللحم السيء."},
    a4:{name:"مسخن (دجاج فلسطيني محمر)",desc:"الطبق الوطني الفلسطيني. دجاج محمر مع البصل المكرمل والسماق.",tip:"أكثر سماقاً مما تعتقد. كن جريئاً به — هو ما يجعل المسخن استثنائياً."},
    a5:{name:"برياني الوحش الكامل",desc:"برياني لحوم مشكّلة — دجاج وضأن على طبقات مع بسمتي عطري.",tip:"تحضيران منفصلان للحم يخلقان عمقاً لا يُضاهى في النكهة."},
    a6:{name:"ليلة الهوت بوت",desc:"هوت بوت صيني تفاعلي — لحوم مقطعة رفيعة تُطهى على الطاولة.",tip:"الهوت بوت حدث وليس مجرد وجبة. أدِّم الأضواء واستمتع لمدة ساعتين."},
    a7:{name:"ليلة الشواء الكوري",desc:"شواء كوري في المنزل — لحوم متبّلة تُشوى على الطاولة.",tip:"لفائف الساسام (ورق الخس) تُوازن دسامة اللحوم بشكل مثالي."},
    a8:{name:"طبق تندوري مشكّل",desc:"طبق تندوري كامل — دجاج وضأن متبّلان، مشويان على الفحم.",tip:"مارينيد الزبادي يُطرّي ويحمي من الحرارة الشديدة في آنٍ واحد."},
    a9:{name:"طبق شواء بالأسلوب البرتغالي",desc:"دجاج بيري بيري، لحم بقري وقطع ضأن مشوية — احتفال على لوح تقديم.",tip:"البيري بيري الجيد يجب أن يجعلك تتعرق قليلاً — لا تبخل على الفلفل الحار."},
    a10:{name:"وليمة مزة شامية",desc:"مجموعة من الأطباق الصغيرة المحيطة بأنواع مختلفة من اللحوم — الوجبة الاجتماعية.",tip:"المزة مصممة لتكون بطيئة واجتماعية. ضع كل شيء على الطاولة وخذ وقتك."},
  f13:{name:"فراخ بيري بيري (الدجاج المشوي البرتغالي)",desc:"الطبق الذي جعل الدجاج البرتغالي مشهوراً عالمياً. حار، بالثوم، لا يُنسى.",tip:"تتحسن صلصة البيري بيري بعد يوم في الثلاجة — اصنع كمية مضاعفة واحتفظ ببعضها للدهن."},
  f14:{name:"دجاج كورما",desc:"غني وكريمي ومتبل بلطف — كاري خفيف يفوز بإعجاب الجميع على المائدة.",tip:"الكاجو المطحون هو المكثف التقليدي الذي يمنح الكورما قوامه الحريري."},
  f15:{name:"دجاج كراهي",desc:"طبق الدجاج الباكستاني المحبوب المطهو في المقلاة — غني بالطماطم، بنكهة الزنجبيل القوية، بطعم المطعم في المنزل.",tip:"الكراهي الحقيقي لا يحتوي على ماء مضاف تقريباً — الطماطم والدجاج يصنعان الصلصة كاملة."},
  f16:{name:"بوسانسكي بيلاف (أرز الدجاج البوسني)",desc:"طبق أرز بلقاني مريح، الدجاج والأرز يُطهيان معاً ببطء في قدر واحد.",tip:"قاوم رغبة التحريك أثناء طهي الأرز — هذا هو سر البيلاف غير المتكتل."},
  r13:{name:"تشيفابي مع صومون",desc:"أشهر أطعمة الشارع في البلقان — نقانق اللحم المفروم المشوية في خبز مسطح طري.",tip:"صودا الخبز هي سر البلقان — تحافظ على قوام تشيفابي خفيف وطري، لا يكون كثيفاً أبداً."},
  r14:{name:"سيخ كباب لحم الخروف",desc:"لحم خروف مفروم متبل يُشكّل على أسياخ ويُشوى على الفحم — طبق أساسي في الشواء الباكستاني.",tip:"الأسياخ المسطحة (وليست المستديرة) تمنع الكباب من الدوران والتفكك على الشواية."},
  r15:{name:"كراهي لحم الخروف",desc:"لحم خروف بالعظم يُطهى بسرعة وعلى نار قوية في قاعدة من الطماطم والزنجبيل — لذيذ جداً، طبق مفضل في المطاعم.",tip:"اللحم بالعظم يمنح الكراهي عمق نكهته — لا تستبدله بلحم منزوع العظم إن أمكن."},
  r16:{name:"إسبيتادا (أسياخ اللحم البقري البرتغالية)",desc:"أسياخ لحم البقر الشهيرة بالثوم من ماديرا، تُشوى تقليدياً على نار مفتوحة.",tip:"قطع الثوم تتكرمل وتصبح طرية وحلوة — لا تتجاهلها، كلها."},
  b13:{name:"جولاش اللحم البقري اللوكسمبورغي",desc:"نسخة لوكسمبورغية دافئة من الطبق الأوروبي الوسطي الكلاسيكي — غني، بنكهة البابريكا العميقة، مثالي لليالي الباردة.",tip:"الطهي البطيء والهادئ غير قابل للتفاوض هنا — التسرع في الطهي ينتج لحماً جافاً وقاسياً."},
  b14:{name:"نهاري لحم بقري",desc:"طبق الحساء الباكستاني الأسطوري المطهو ببطء، يُترك تقليدياً طوال الليل لوجبة الإفطار. عميق، داكن، لا يُنسى.",tip:"تحميص الدقيق حتى يصبح بنياً داكناً قبل إضافته يمنح النهاري لونه الداكن المميز وعمقه الجوزي."},
  b15:{name:"تشابلي كباب",desc:"أقراص اللحم البقري المفروم الشهيرة من بيشاور، مسطحة ومقرمشة الحواف، مليئة ببذور الرمان والكزبرة.",tip:"يجب تقطيع الطماطم والبصل ناعماً جداً، تقريباً كالهريس — هذا يحافظ على طراوة الأقراص من الداخل."},
  b16:{name:"بيفي آ كافيه (ستيك القهوة والزبدة البرتغالي)",desc:"طبق كلاسيكي من مقاهي لشبونة — شريحة لحم رفيعة في صلصة لامعة من الزبدة والثوم والقهوة. يبدو غريباً، لكن طعمه رائع.",tip:"لا تتجنب القهوة ظناً أن طعمها سيكون مراً — تتحول إلى قاعدة عميقة ولذيذة للصلصة."},
  a11:{name:"بوسانسكي لوناتس (قدر اللحوم البوسني)",desc:"الطبق الوطني البوسني في قدر واحد — طبقات من لحم البقر والخروف والخضار تُطهى معاً ببطء في قدر من الطين.",tip:"سحر اللوناتس هو الصبر — قاوم رغبة التحريك. الطبقات تطهو بعضها في بعض من تلقاء نفسها."},
  a12:{name:"طبق الشواء المشكل اللوكسمبورغي",desc:"طبق شواء سخي على الطراز اللوكسمبورغي — تتبيل بسيط، لحم عالي الجودة، راحة البيسترو الكلاسيكية.",tip:"تدريج أوقات الشوي يعني أن كل شيء ينتهي ويرتاح معاً — خطط للدجاج أولاً."},
  a13:{name:"طبق الشواء المشكل الباكستاني",desc:"سيخ كباب وتكة الدجاج وقطع لحم الخروف معاً في طبق مدخّن ومتبل — طبق مفضل في الشواء الباكستاني.",tip:"درّج أوقات الشواء ليصل كل شيء ساخناً إلى المائدة معاً — الدجاج والسيخ يُطهيان بسرعة متقاربة، ابدأ بالخروف قليلاً قبلهما."},
  a14:{name:"شواء تندوري هندي مشكل",desc:"دجاج التندوري الكلاسيكي وقطع لحم الخروف، مشوية على الفحم مع تتبيلة زبادي مدخنة — نكهة مطعم التندوري في المنزل.",tip:"التتبيلة المزدوجة — الحمض أولاً، ثم الزبادي والتوابل — هي تقنية التندوري الحقيقية وتحدث فرقاً ملحوظاً."},
  },
};

/* Helper: get box translation */
function getBox(lang, key){ return BOX_T[lang]?.[key] || BOX_T.en[key]; }

/* Helper: get recipe translation */
function getRecipeMeta(lang, id){ return RECIPE_META_T[lang]?.[id] || RECIPE_META_T.en[id] || {}; }

function getCuisineName(lang, key) {
  const T_CUISINES = {
    en:["All Recipes","Classic","BBQ","Arabic","Indian","Asian"],
    fr:["Toutes les recettes","Classique","BBQ","Arabe","Indien","Asiatique"],
    de:["Alle Rezepte","Klassisch","BBQ","Arabisch","Indisch","Asiatisch"],
    pt:["Todas as receitas","Clássico","BBQ","Árabe","Indiano","Asiático"],
    ar:["جميع الوصفات","كلاسيكي","شواء","عربي","هندي","آسيوي"],
    lb:["All Recetten","Klassesch","BBQ","Arabesch","Indesch","Asiatesch"],
    bs:["Svi recepti","Klasično","BBQ","Arapska","Indijska","Azijska"],
  };
  const keys = ["all","classic","bbq","arabic","indian","asian"];
  const idx = keys.indexOf(key);
  if(idx === -1) return key;
  return (T_CUISINES[lang] || T_CUISINES.en)[idx];
}

const MOCK_USERS = {
  "demo@meatbeast.lu": {
    password:"demo1234", name:"Alex Müller",
    orders:[{id:"#MB-1042",box:"The Crown",tier:"Beast Max",date:"2025-04-28",day:"Monday",time:"Morning",status:"delivered",total:46},{id:"#MB-1035",box:"The Bull",tier:"Beast Max",date:"2025-04-21",day:"Monday",time:"Morning",status:"delivered",total:58},{id:"#MB-1028",box:"The Crown",tier:"Beast Max",date:"2025-04-14",day:"Monday",time:"Morning",status:"delivered",total:46}],
    upcoming:[{id:"#MB-1049",box:"The Crown",tier:"Beast Max",date:"2025-05-05",day:"Monday",time:"Morning",status:"scheduled"},{id:"#MB-1056",box:"The Crown",tier:"Beast Max",date:"2025-05-12",day:"Monday",time:"Morning",status:"scheduled"},{id:"#MB-1063",box:"The Crown",tier:"Beast Max",date:"2025-05-19",day:"Monday",time:"Morning",status:"scheduled"}],
    sub:{box:"The Crown",tier:"Beast Max",status:"active",weeklyPrice:46,day:"Monday",time:"Morning"},
  }
};
const T = {
  en:{
    nav:{home:"Home",boxes:"Boxes",alacarte:"À la Carte",dash:"Dashboard",cart:"Cart",login:"Sign in",logout:"Sign out"},
    hero:{badge:"Fresh Meat · Delivered Weekly · Luxembourg",h1:"Fresh meat.",h2:"Your doorstep.",sub:"Premium cuts, hand-selected, delivered every week. From farm to your fridge — as fresh as it gets.",cta:"Shop Boxes",ctaB:"À la Carte"},
    stats:[["Never frozen.","Always premium. Always fresh."],["62 recipes","Included. Cook something epic."],["6 days a week","Morning or afternoon. Your call."],["From €39/week","Premium halal cuts. Your door. Every week."]],
    boxes:{title:"Choose your box.",sub:"Pick your tier, pick your protein.",tierLabel:"Your tier",subscribe:"Subscribe weekly",weekly:"/wk",once:"One-time order",popular:"Most popular",contents:"What's inside",perKg:"/kg",deliveryNote:"Free delivery on Beast Max & Ultra · €8 on Lite & À la Carte under €70"},
    schedule:{title:"Schedule it.",day:"Delivery day",time:"Time slot",days:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],times:[{key:"morning",label:"Morning",note:"7:00 – 12:00"},{key:"afternoon",label:"Afternoon",note:"12:00 – 18:00"}]},
    ac:{title:"À la Carte",sub:"Individual cuts, no commitment.",cats:["All","Poultry","Beef","Veal","Lamb"],add:"Add"},
    cart:{title:"Your cart",empty:"Cart is empty",emptyNote:"Pick a box to get started.",sub:"Subtotal",del:"Delivery",free:"Free",total:"Total",checkout:"Checkout",remove:"Remove",subTag:"Weekly",oneTag:"One-time",loginRequired:"Sign in to checkout",freeNote:"🎉 Free delivery applied!"},
    auth:{signinTitle:"Welcome back.",signupTitle:"Create account.",email:"Email address",password:"Password",name:"Full name",signin:"Sign in",signup:"Create account",switchSignup:"No account? Sign up",switchSignin:"Have an account? Sign in",demo:"Try demo account",demoNote:"demo@meatbeast.lu / demo1234",error:"Invalid email or password.",errorExists:"Account already exists.",secure:"Your data is encrypted and secure."},
    co:{title:"Checkout",fname:"First name",lname:"Last name",email:"Email",phone:"Phone",addr:"Street address",city:"City",zip:"Postal code",pay:"Payment",card:"Card number",exp:"MM / YY",cvv:"CVV",place:"Place order",note:"Weekly subscription — pause or cancel anytime.",ok:"You're in. 🥩",okNote:"Order confirmed. Your first delivery is scheduled for next week.",secure:"256-bit SSL encryption"},
    dash:{title:"Dashboard",welcome:"Welcome back",subStatus:"Subscription",nextDel:"Next delivery",upcoming:"Upcoming",history:"Order history",status:{active:"Active",paused:"Paused",cancelled:"Cancelled",scheduled:"Scheduled",delivered:"Delivered"},pause:"Pause",resume:"Resume",cancel:"Cancel subscription",change:"Change box",pauseNote:"Skip up to 8 weeks.",cancelNote:"No fees.",confirmCancel:"Stop all deliveries?",yes:"Yes, cancel",keep:"Keep it",noSub:"No active subscription",noSubNote:"Subscribe to a box to manage it here.",browse:"Browse boxes"},
    home:{boxesTitle:"The boxes.",boxesSub:"Four proteins. Three sizes. Every week.",seeAll:"See all boxes →",fromTier:"from Beast Lite",recipeLabel:"Included with every box",recipeTitle1:"Not just meat.",recipeTitle2:"Inspiration too.",recipeSub:"Curated recipes across 10 world cuisines, included free with every box.",browseAll:"Browse all 60+ recipes →",recipesCount:"62 recipes total",ctaTitle:"Farm fresh.",ctaSub:"Every single week.",ctaBody:"Hand-picked cuts, cold-chain delivered. As fresh as a trip to the butcher — without the trip.",ctaBtn:"Start this week →",cookNow:"View recipe →",showingCount:"Showing",recipes:"recipes"},
    cuisines:["All Recipes","Classic","BBQ","Arabic","Indian","Asian"],
    footer:{note:"Fresh meat, weekly. Luxembourg.",halal:"Halal Certified",links:["FAQ","Delivery","Contact","Privacy"],faqItems:["How does the subscription work?","Can I skip a week?","What is your cancellation policy?","How is the meat packaged?","Is all meat halal certified?"],deliveryItems:["Free delivery on Beast Max & Ultra boxes","€8 delivery fee on Lite & À la Carte orders","Your first box: always free delivery","Delivery 6 days a week","Morning (7–12) or Afternoon (12–18)"],contactItems:["info@meatbeast.lu","Luxembourg City area","+352 691 000 000","Mon–Sat 8:00–18:00","Instagram · Facebook"],privacyItems:["We never sell your data","Payment secured by Stripe","GDPR compliant","Data stored in EU","Cookie preferences"]},
  },
  fr:{
    nav:{home:"Accueil",boxes:"Boxes",alacarte:"À la Carte",dash:"Tableau de bord",cart:"Panier",login:"Connexion",logout:"Déconnexion"},
    hero:{badge:"Viande Fraîche · Livraison Hebdo · Luxembourg",h1:"Viande fraîche.",h2:"À votre porte.",sub:"Des morceaux premium, livrés chaque semaine. De la ferme à votre réfrigérateur.",cta:"Voir les Boxes",ctaB:"À la Carte"},
    stats:[["Jamais congelé.","Toujours premium. Toujours frais."],["62 recettes","Incluses. Cuisinez quelque chose d'épique."],["6 jours/semaine","Matin ou après-midi. Vous décidez."],["Dès 39€/sem.","Coupes halal premium. Votre porte. Chaque semaine."]],
    boxes:{title:"Choisissez votre box.",sub:"Choisissez votre format et votre protéine.",tierLabel:"Votre format",subscribe:"Abonnement hebdo",weekly:"/sem",once:"Commande unique",popular:"Plus populaire",contents:"Contenu",perKg:"/kg",deliveryNote:"Livraison gratuite Beast Max & Ultra · 8€ sur Lite & À la Carte sous 70€"},
    schedule:{title:"Planifiez.",day:"Jour de livraison",time:"Créneau",days:["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],times:[{key:"morning",label:"Matin",note:"7h – 12h"},{key:"afternoon",label:"Après-midi",note:"12h – 18h"}]},
    ac:{title:"À la Carte",sub:"Morceaux individuels, sans engagement.",cats:["Tout","Volaille","Bœuf","Veau","Agneau"],add:"Ajouter"},
    cart:{title:"Votre panier",empty:"Panier vide",emptyNote:"Choisissez une box pour commencer.",sub:"Sous-total",del:"Livraison",free:"Gratuite",total:"Total",checkout:"Commander",remove:"Supprimer",subTag:"Hebdo",oneTag:"Unique",loginRequired:"Connectez-vous pour commander",freeNote:"🎉 Livraison gratuite appliquée !"},
    auth:{signinTitle:"Bon retour.",signupTitle:"Créer un compte.",email:"Adresse e-mail",password:"Mot de passe",name:"Nom complet",signin:"Connexion",signup:"Créer un compte",switchSignup:"Pas de compte ? S'inscrire",switchSignin:"Déjà inscrit ? Se connecter",demo:"Compte démo",demoNote:"demo@meatbeast.lu / demo1234",error:"Email ou mot de passe incorrect.",errorExists:"Ce compte existe déjà.",secure:"Vos données sont chiffrées."},
    co:{title:"Commander",fname:"Prénom",lname:"Nom",email:"E-mail",phone:"Téléphone",addr:"Adresse",city:"Ville",zip:"Code postal",pay:"Paiement",card:"Numéro de carte",exp:"MM / AA",cvv:"CVV",place:"Confirmer",note:"Abonnement hebdo — pause ou annulation à tout moment.",ok:"C'est parti. 🥩",okNote:"Commande confirmée. Première livraison la semaine prochaine.",secure:"Chiffrement SSL 256 bits"},
    dash:{title:"Tableau de bord",welcome:"Bon retour",subStatus:"Abonnement",nextDel:"Prochaine livraison",upcoming:"À venir",history:"Historique",status:{active:"Actif",paused:"En pause",cancelled:"Annulé",scheduled:"Planifiée",delivered:"Livrée"},pause:"Mettre en pause",resume:"Reprendre",cancel:"Annuler",change:"Changer de box",pauseNote:"Jusqu'à 8 semaines.",cancelNote:"Sans frais.",confirmCancel:"Arrêter toutes les livraisons ?",yes:"Oui, annuler",keep:"Garder",noSub:"Aucun abonnement",noSubNote:"Abonnez-vous à une box.",browse:"Voir les boxes"},
    home:{boxesTitle:"Les boxes.",boxesSub:"Quatre protéines. Trois tailles. Chaque semaine.",seeAll:"Voir toutes les boxes →",fromTier:"à partir de Beast Lite",recipeLabel:"Inclus dans chaque box",recipeTitle1:"Pas que de la viande.",recipeTitle2:"L'inspiration aussi.",recipeSub:"Des recettes soigneusement choisies dans 10 cuisines du monde, incluses gratuitement.",browseAll:"Parcourir les 60+ recettes →",recipesCount:"62 recettes incluses",ctaTitle:"Fraîcheur de ferme.",ctaSub:"Chaque semaine, sans exception.",ctaBody:"Des morceaux triés sur le volet, livrés en chaîne du froid. Aussi frais qu'une visite chez le boucher — sans le déplacement.",ctaBtn:"Commencer cette semaine →",cookNow:"Voir la recette →",showingCount:"Résultats",recipes:"recettes"},
    cuisines:["Toutes les recettes","Classique","BBQ","Arabe","Indien","Asiatique"],
    footer:{note:"Viande fraîche, chaque semaine. Luxembourg.",halal:"Halal Certifié",links:["FAQ","Livraison","Contact","Confidentialité"],faqItems:["Comment fonctionne l'abonnement ?","Puis-je sauter une semaine ?","Quelle est votre politique d'annulation ?","Comment la viande est-elle emballée ?","Toute la viande est-elle halal ?"],deliveryItems:["Livraison gratuite sur Beast Max & Ultra","8€ sur commandes Lite & À la Carte","Première box : livraison toujours gratuite","Livraison 6 jours par semaine","Matin (7h–12h) ou Après-midi (12h–18h)"],contactItems:["info@meatbeast.lu","Ville de Luxembourg","+352 691 000 000","Lun–Sam 8h–18h","Instagram · Facebook"],privacyItems:["Nous ne vendons jamais vos données","Paiement sécurisé par Stripe","Conforme au RGPD","Données stockées dans l'UE","Préférences cookies"]},
  },
  de:{
    nav:{home:"Start",boxes:"Boxen",alacarte:"À la Carte",dash:"Dashboard",cart:"Warenkorb",login:"Anmelden",logout:"Abmelden"},
    hero:{badge:"Frisches Fleisch · Wöchentlich · Luxemburg",h1:"Frisches Fleisch.",h2:"Direkt zu dir.",sub:"Premium-Cuts, handverlesen, wöchentlich geliefert. Vom Betrieb direkt in deinen Kühlschrank.",cta:"Boxen ansehen",ctaB:"À la Carte"},
    stats:[["Nie gefroren.","Immer premium. Immer frisch."],["62 Rezepte","Inklusive. Koch etwas Episches."],["6 Tage/Woche","Morgens oder nachmittags. Du entscheidest."],["Ab 39€/Woche","Premium Halal-Cuts. Deine Tür. Jede Woche."]],
    boxes:{title:"Wähle deine Box.",sub:"Wähle dein Format und dein Protein.",tierLabel:"Dein Format",subscribe:"Wöchentlich abonnieren",weekly:"/Wo",once:"Einmalig bestellen",popular:"Beliebteste",contents:"Inhalt",perKg:"/kg",deliveryNote:"Kostenlose Lieferung für Beast Max & Ultra · 8€ für Lite & À la Carte unter 70€"},
    schedule:{title:"Termin wählen.",day:"Liefertag",time:"Zeitfenster",days:["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],times:[{key:"morning",label:"Morgens",note:"7:00 – 12:00"},{key:"afternoon",label:"Nachmittags",note:"12:00 – 18:00"}]},
    ac:{title:"À la Carte",sub:"Einzelne Cuts, kein Abo.",cats:["Alle","Geflügel","Rind","Kalb","Lamm"],add:"Hinzufügen"},
    cart:{title:"Warenkorb",empty:"Noch leer",emptyNote:"Box auswählen und loslegen.",sub:"Zwischensumme",del:"Lieferung",free:"Kostenlos",total:"Gesamt",checkout:"Zur Kasse",remove:"Entfernen",subTag:"Wöchentlich",oneTag:"Einmalig",loginRequired:"Anmelden zum Bestellen",freeNote:"🎉 Kostenlose Lieferung!"},
    auth:{signinTitle:"Willkommen zurück.",signupTitle:"Konto erstellen.",email:"E-Mail",password:"Passwort",name:"Vollständiger Name",signin:"Anmelden",signup:"Konto erstellen",switchSignup:"Kein Konto? Registrieren",switchSignin:"Schon angemeldet? Einloggen",demo:"Demo-Konto",demoNote:"demo@meatbeast.lu / demo1234",error:"Falsche E-Mail oder Passwort.",errorExists:"Konto existiert bereits.",secure:"Ihre Daten sind sicher verschlüsselt."},
    co:{title:"Bestellung",fname:"Vorname",lname:"Nachname",email:"E-Mail",phone:"Telefon",addr:"Straße",city:"Stadt",zip:"PLZ",pay:"Zahlung",card:"Kartennummer",exp:"MM / JJ",cvv:"CVV",place:"Bestellen",note:"Wöchentliches Abo — jederzeit pausierbar.",ok:"Bestätigt. 🥩",okNote:"Erste Lieferung nächste Woche.",secure:"256-Bit-SSL-Verschlüsselung"},
    dash:{title:"Dashboard",welcome:"Willkommen zurück",subStatus:"Abonnement",nextDel:"Nächste Lieferung",upcoming:"Geplant",history:"Bestellhistorie",status:{active:"Aktiv",paused:"Pausiert",cancelled:"Gekündigt",scheduled:"Geplant",delivered:"Geliefert"},pause:"Pausieren",resume:"Fortsetzen",cancel:"Kündigen",change:"Box wechseln",pauseNote:"Bis 8 Wochen.",cancelNote:"Keine Gebühren.",confirmCancel:"Alle Lieferungen stoppen?",yes:"Ja, kündigen",keep:"Behalten",noSub:"Kein aktives Abo",noSubNote:"Box abonnieren.",browse:"Boxen ansehen"},
    home:{boxesTitle:"Die Boxen.",boxesSub:"Vier Proteine. Drei Größen. Jede Woche.",seeAll:"Alle Boxen ansehen →",fromTier:"ab Beast Lite",recipeLabel:"Jeder Box beigelegt",recipeTitle1:"Nicht nur Fleisch.",recipeTitle2:"Auch Inspiration.",recipeSub:"Ausgewählte Rezepte aus 10 Weltküchen, kostenlos jeder Box beigelegt.",browseAll:"Alle 60+ Rezepte entdecken →",recipesCount:"62 Rezepte dabei",ctaTitle:"Frisch vom Hof.",ctaSub:"Jede Woche. Ohne Ausnahme.",ctaBody:"Handverlesene Cuts, Kühlkettenlieferung. So frisch wie ein Besuch beim Metzger — ohne den Weg.",ctaBtn:"Diese Woche starten →",cookNow:"Rezept ansehen →",showingCount:"Ergebnisse",recipes:"Rezepte"},
    cuisines:["Alle Rezepte","Klassisch","BBQ","Arabisch","Indisch","Asiatisch"],
    footer:{note:"Frisches Fleisch, wöchentlich. Luxemburg.",halal:"Halal Zertifiziert",links:["FAQ","Lieferung","Kontakt","Datenschutz"],faqItems:["Wie funktioniert das Abonnement?","Kann ich eine Woche überspringen?","Wie ist Ihre Kündigungsrichtlinie?","Wie wird das Fleisch verpackt?","Ist alles Fleisch halal?"],deliveryItems:["Kostenlose Lieferung für Beast Max & Ultra","8€ für Lite & À la Carte Bestellungen","Erste Box: immer kostenlose Lieferung","Lieferung 6 Tage pro Woche","Morgens (7–12) oder Nachmittags (12–18)"],contactItems:["info@meatbeast.lu","Luxemburg-Stadt","+352 691 000 000","Mo–Sa 8:00–18:00","Instagram · Facebook"],privacyItems:["Wir verkaufen Ihre Daten nie","Zahlung gesichert durch Stripe","DSGVO-konform","Daten in der EU gespeichert","Cookie-Einstellungen"]},
  },
  lb:{
    nav:{home:"Heem",boxes:"Boxen",alacarte:"À la Carte",dash:"Mäi Kont",cart:"Korf",login:"Aloggen",logout:"Ausloggen"},
    hero:{badge:"Frësch Fleesch · Wëchentlech Geliwwert · Lëtzebuerg",h1:"Frësch Fleesch.",h2:"Un Är Dier.",sub:"Premium Stécker, mat der Hand ausgewielt, all Woch geliwwert. Vum Bauerenhaff bis an Äre Frigo — sou frësch wéi et geet.",cta:"Boxen entdecken",ctaB:"À la Carte"},
    stats:[["Ni gefruer.","Ëmmer premium. Ëmmer frësch."],["62 Recetten","Dobäi. Kacht eppes Epickt."],["6 Deeg d'Woch","Moies oder Nomëtteg. Dir entscheed."],["Ab €39/Woch","Premium Halal Fleesch. Är Dier. All Woch."]],
    boxes:{title:"D'Boxen.",sub:"Véier Proteinen. Dräi Gréissten. All Woch.",tierLabel:"Är Gréisst",subscribe:"Wëchentlech abonanéieren",weekly:"/Woch",once:"Eemol bestellen",popular:"Beléifste",contents:"Wat ass dran",perKg:"/kg",deliveryNote:"Gratis Liwwerung mat Max & Ultra · 8€ mat Lite & À la Carte"},
    schedule:{title:"Zäit wielen.",day:"Liwwerdag",time:"Zäitfenster",days:["Méindeg","Dënschdeg","Mëttwoch","Donneschdeg","Freideg","Samschdeg"],times:[{key:"morning",label:"Moies",note:"7:00 – 12:00"},{key:"afternoon",label:"Nomëtteg",note:"12:00 – 18:00"}]},
    ac:{title:"À la Carte",sub:"Eenzel Stécker, ouni Abonnement.",cats:["All","Gefligel","Rëndfleesch","Kallefleesch","Lamm"],add:"Derbäisetzen"},
    cart:{title:"Äre Korf",empty:"Korf eidel",emptyNote:"Sicht eng Box fir ufänken.",sub:"Zwëschentotal",del:"Liwwerung",free:"Gratis",total:"Total",checkout:"Bestellen",remove:"Läschen",subTag:"Wëchentlech",oneTag:"Eemol",loginRequired:"Aloggen fir ze bestellen",freeNote:"🎉 Gratis Liwwerung applizéiert!"},
    auth:{signinTitle:"Wëllkomm zréck.",signupTitle:"Kont erstellen.",email:"E-Mail Adress",password:"Passwuert",name:"Vollstännegen Numm",signin:"Aloggen",signup:"Kont erstellen",switchSignup:"Keen Kont? Umellen",switchSignin:"Hutt e Kont? Aloggen",demo:"Demo Kont",demoNote:"demo@meatbeast.lu / demo1234",error:"Falsch E-Mail oder Passwuert.",errorExists:"Kont existéiert schonn.",secure:"Är Donnéeën sinn verschlësselt a sécher."},
    co:{title:"Bestellen",fname:"Virnumm",lname:"Familljennumm",email:"E-Mail",phone:"Telefon",addr:"Strooss an Hausnummer",city:"Stad",zip:"Postleitzuel",pay:"Bezuelen",card:"Kaartennummer",exp:"MM / JJ",cvv:"CVV",place:"Bestellen",note:"Wëchentlecht Abo — jiddereng Zäit pauséieren oder annuléieren.",ok:"Bestätegt. 🥩",okNote:"Kommand bestätegt. Éischt Liwwerung nächst Woch.",secure:"256-Bit SSL Verschlësselung"},
    dash:{title:"Dashboard",welcome:"Wëllkomm zréck",subStatus:"Abonnement",nextDel:"Nächst Liwwerung",upcoming:"Déi nächst",history:"Bestell-Geschicht",status:{active:"Aktiv",paused:"Pauséiert",cancelled:"Annuléiert",scheduled:"Geplangt",delivered:"Geliwwert"},pause:"Pauséieren",resume:"Weidermaachen",cancel:"Annuléieren",change:"Box wiesselen",pauseNote:"Bis zu 8 Wochen.",cancelNote:"Keng Käschten.",confirmCancel:"All Liwwerungen stoppen?",yes:"Jo, annuléieren",keep:"Behalen",noSub:"Keen aktiven Abonnement",noSubNote:"Abonanéiert Iech fir eng Box.",browse:"Boxen kucken"},
    home:{boxesTitle:"D'Boxen.",boxesSub:"Véier Proteinen. Dräi Gréissten. All Woch.",seeAll:"All Boxen kucken →",fromTier:"ab Beast Lite",recipeLabel:"A jidder Box derbäi",recipeTitle1:"Net nëmmen Fleesch.",recipeTitle2:"Inspiratioun och.",recipeSub:"Kuresch Recetten aus 10 Wëltkichen, gratis a jidder Box.",browseAll:"All 60+ Recetten kucken →",recipesCount:"62 Recetten derbäi",ctaTitle:"Frësch vum Bauerenhaff.",ctaSub:"All Woch, ouni Ausnahm.",ctaBody:"Mat der Hand ausgewielte Stécker, Kälteketten-Liwwerung. Sou frësch wéi e Besuch beim Fleesche — ouni d'Rees.",ctaBtn:"Dës Woch ufänken →",cookNow:"Recett kucken →",showingCount:"Weist",recipes:"Recetten"},
    cuisines:["All Recetten","Klassesch","BBQ","Arabesch","Indesch","Asiatesch"],
    footer:{note:"Frësch Fleesch, all Woch. Lëtzebuerg.",halal:"Halal Zertifizéiert",links:["FAQ","Liwwerung","Kontakt","Dateschutz"],faqItems:["Wéi fonctionéiert dat Abonnement?","Kann ech eng Woch iwwerspringen?","Wat ass Är Annuléierungspolitik?","Wéi gëtt d'Fleesch verpackt?","Ass all d'Fleesch Halal?"],deliveryItems:["Gratis Liwwerung mat Beast Max & Ultra","8€ mat Lite & À la Carte Bestellungen","Éischt Box: ëmmer gratis Liwwerung","Liwwerung 6 Deeg d'Woch","Moies (7–12) oder Nomëtteg (12–18)"],contactItems:["info@meatbeast.lu","Lëtzebuerg Stad","+352 691 000 000","Méindeg–Samschdeg 8:00–18:00","Instagram · Facebook"],privacyItems:["Mir verkafen Är Donnéeën ni","Bezuelung gesëchert duerch Stripe","GDPR-konform","Donnéeën an der EU gespäichert","Cookie-Astellungen"]},
  },
  bs:{
    nav:{home:"Početna",boxes:"Kutije",alacarte:"À la Carte",dash:"Moj račun",cart:"Korpa",login:"Prijava",logout:"Odjava"},
    hero:{badge:"Svježe meso · Sedmična dostava · Luksemburg",h1:"Svježe meso.",h2:"Na vaša vrata.",sub:"Premium odresci, ručno odabrani, sedmično dostavljeni. Od farme do vašeg frižidera — sveže kakvo treba biti.",cta:"Pogledajte kutije",ctaB:"À la Carte"},
    stats:[["Nikad smrznuto.","Uvijek premium. Uvijek svježe."],["62 recepata","Uključeno. Skuhajte nešto epsko."],["6 dana sedmično","Jutro ili popodne. Vi birate."],["Od €39/sedm.","Premium Halal meso. Vaša vrata. Svake sedmice."]],
    boxes:{title:"Kutije.",sub:"Četiri proteina. Tri veličine. Svake sedmice.",tierLabel:"Vaša veličina",subscribe:"Pretplatite se sedmično",weekly:"/sedm.",once:"Jednokratna narudžba",popular:"Najpopularnije",contents:"Šta je unutra",perKg:"/kg",deliveryNote:"Besplatna dostava za Max & Ultra · 8€ za Lite & À la Carte"},
    schedule:{title:"Odaberite termin.",day:"Dan dostave",time:"Vremenski okvir",days:["Ponedjeljak","Utorak","Srijeda","Četvrtak","Petak","Subota"],times:[{key:"morning",label:"Ujutro",note:"7:00 – 12:00"},{key:"afternoon",label:"Popodne",note:"12:00 – 18:00"}]},
    ac:{title:"À la Carte",sub:"Pojedinačni komadi, bez pretplate.",cats:["Sve","Perad","Govedina","Teletina","Jagnjetina"],add:"Dodaj"},
    cart:{title:"Vaša korpa",empty:"Korpa je prazna",emptyNote:"Pronađite kutiju za početak.",sub:"Međuzbir",del:"Dostava",free:"Besplatno",total:"Ukupno",checkout:"Naruči",remove:"Ukloni",subTag:"Sedmično",oneTag:"Jednokratno",loginRequired:"Prijavite se za narudžbu",freeNote:"🎉 Besplatna dostava primijenjena!"},
    auth:{signinTitle:"Dobrodošli nazad.",signupTitle:"Kreirajte račun.",email:"E-mail adresa",password:"Lozinka",name:"Puno ime",signin:"Prijava",signup:"Kreiraj račun",switchSignup:"Nemate račun? Registrujte se",switchSignin:"Imate račun? Prijavite se",demo:"Demo račun",demoNote:"demo@meatbeast.lu / demo1234",error:"Pogrešan e-mail ili lozinka.",errorExists:"Račun već postoji.",secure:"Vaši podaci su šifrirani i sigurni."},
    co:{title:"Narudžba",fname:"Ime",lname:"Prezime",email:"E-mail",phone:"Telefon",addr:"Ulica i broj",city:"Grad",zip:"Poštanski broj",pay:"Plaćanje",card:"Broj kartice",exp:"MM / GG",cvv:"CVV",place:"Naruči",note:"Sedmična pretplata — pauzirajte ili otkažite u bilo kom trenutku.",ok:"Potvrđeno. 🥩",okNote:"Narudžba potvrđena. Prva dostava sljedeće sedmice.",secure:"256-bitna SSL enkripcija"},
    dash:{title:"Nadzorna ploča",welcome:"Dobrodošli nazad",subStatus:"Pretplata",nextDel:"Sljedeća dostava",upcoming:"Nadolazeće",history:"Povijest narudžbi",status:{active:"Aktivna",paused:"Pauzirana",cancelled:"Otkazana",scheduled:"Zakazana",delivered:"Dostavljena"},pause:"Pauziraj",resume:"Nastavi",cancel:"Otkaži",change:"Promijeni kutiju",pauseNote:"Do 8 sedmica.",cancelNote:"Bez naknade.",confirmCancel:"Zaustaviti sve dostave?",yes:"Da, otkaži",keep:"Zadrži",noSub:"Nema aktivne pretplate",noSubNote:"Pretplatite se na kutiju.",browse:"Pogledaj kutije"},
    home:{boxesTitle:"Kutije.",boxesSub:"Četiri proteina. Tri veličine. Svake sedmice.",seeAll:"Pogledaj sve kutije →",fromTier:"od Beast Lite",recipeLabel:"Uključeno u svaku kutiju",recipeTitle1:"Ne samo meso.",recipeTitle2:"I inspiracija.",recipeSub:"Odabrani recepti iz 10 svjetskih kuhinja, gratis uz svaku kutiju.",browseAll:"Pregledaj svih 60+ recepata →",recipesCount:"62 recepata uključeno",ctaTitle:"Svježe s farme.",ctaSub:"Svake sedmice, bez izuzetka.",ctaBody:"Ručno odabrani komadi, dostava hladnim lancem. Svježe kao odlazak kod mesara — bez odlaska.",ctaBtn:"Počnite ovu sedmicu →",cookNow:"Pogledaj recept →",showingCount:"Prikazuje",recipes:"recepata"},
    cuisines:["Svi recepti","Klasično","BBQ","Arapska","Indijska","Azijska"],
    footer:{note:"Svježe meso, sedmično. Luksemburg.",halal:"Halal certificirano",links:["FAQ","Dostava","Kontakt","Privatnost"],faqItems:["Kako funkcioniše pretplata?","Mogu li preskočiti sedmicu?","Kakva je politika otkazivanja?","Kako se meso pakuje?","Je li sve meso halal?"],deliveryItems:["Besplatna dostava za Beast Max & Ultra","8€ za Lite & À la Carte narudžbe","Prva kutija: uvijek besplatna dostava","Dostava 6 dana sedmično","Ujutro (7–12) ili Popodne (12–18)"],contactItems:["info@meatbeast.lu","Luksemburg Grad","+352 691 000 000","Ponedjeljak–Subota 8:00–18:00","Instagram · Facebook"],privacyItems:["Nikad ne prodajemo vaše podatke","Plaćanje sigurno putem Stripea","GDPR usklađeno","Podaci pohranjeni u EU","Postavke kolačića"]},
  },
  pt:{
    nav:{home:"Início",boxes:"Caixas",alacarte:"À la Carte",dash:"Painel",cart:"Carrinho",login:"Entrar",logout:"Sair"},
    hero:{badge:"Carne Fresca · Entrega Semanal · Luxemburgo",h1:"Carne fresca.",h2:"À sua porta.",sub:"Cortes premium, selecionados à mão, entregues semanalmente. Da quinta ao seu frigorífico — tão fresco quanto possível.",cta:"Ver Caixas",ctaB:"À la Carte"},
    stats:[["Nunca congelado.","Sempre premium. Sempre fresco."],["62 receitas","Incluídas. Cozinha algo épico."],["6 dias/semana","Manhã ou tarde. A tua escolha."],["A partir de 39€/sem.","Cortes halal premium. À sua porta. Cada semana."]],
    boxes:{title:"Escolha a sua caixa.",sub:"Escolha o seu tamanho e proteína.",tierLabel:"O seu tamanho",subscribe:"Subscrever semanalmente",weekly:"/sem",once:"Encomenda única",popular:"Mais popular",contents:"O que contém",perKg:"/kg",deliveryNote:"Entrega grátis em Beast Max & Ultra · 8€ em Lite & À la Carte abaixo de 70€"},
    schedule:{title:"Agendar entrega.",day:"Dia de entrega",time:"Turno",days:["Segunda","Terça","Quarta","Quinta","Sexta","Sábado"],times:[{key:"morning",label:"Manhã",note:"7h – 12h"},{key:"afternoon",label:"Tarde",note:"12h – 18h"}]},
    ac:{title:"À la Carte",sub:"Cortes individuais, sem compromisso.",cats:["Tudo","Aves","Vaca","Vitela","Borrego"],add:"Adicionar"},
    cart:{title:"O seu carrinho",empty:"Carrinho vazio",emptyNote:"Escolha uma caixa para começar.",sub:"Subtotal",del:"Entrega",free:"Grátis",total:"Total",checkout:"Finalizar",remove:"Remover",subTag:"Semanal",oneTag:"Única",loginRequired:"Entre para finalizar",freeNote:"🎉 Entrega gratuita aplicada!"},
    auth:{signinTitle:"Bem-vindo de volta.",signupTitle:"Criar conta.",email:"Endereço de e-mail",password:"Senha",name:"Nome completo",signin:"Entrar",signup:"Criar conta",switchSignup:"Sem conta? Registar",switchSignin:"Tem conta? Entrar",demo:"Conta demo",demoNote:"demo@meatbeast.lu / demo1234",error:"E-mail ou senha inválidos.",errorExists:"Conta já existe.",secure:"Os seus dados estão encriptados e seguros."},
    co:{title:"Finalizar",fname:"Primeiro nome",lname:"Apelido",email:"E-mail",phone:"Telefone",addr:"Morada",city:"Cidade",zip:"Código Postal",pay:"Pagamento",card:"Número do cartão",exp:"MM / AA",cvv:"CVV",place:"Confirmar encomenda",note:"Subscrição semanal — pause ou cancele a qualquer momento.",ok:"Confirmado. 🥩",okNote:"Encomenda confirmada. Primeira entrega na próxima semana.",secure:"Encriptação SSL 256-bit"},
    dash:{title:"Painel",welcome:"Bem-vindo de volta",subStatus:"Subscrição",nextDel:"Próxima entrega",upcoming:"Próximas",history:"Histórico",status:{active:"Activo",paused:"Pausado",cancelled:"Cancelado",scheduled:"Agendado",delivered:"Entregue"},pause:"Pausar",resume:"Retomar",cancel:"Cancelar subscrição",change:"Mudar caixa",pauseNote:"Até 8 semanas.",cancelNote:"Sem taxas.",confirmCancel:"Parar todas as entregas?",yes:"Sim, cancelar",keep:"Manter",noSub:"Sem subscrição activa",noSubNote:"Subscreva uma caixa para gerir aqui.",browse:"Ver caixas"},
    home:{boxesTitle:"As caixas.",boxesSub:"Quatro proteínas. Três tamanhos. Cada semana.",seeAll:"Ver todas as caixas →",fromTier:"a partir de Beast Lite",recipeLabel:"Incluído em cada caixa",recipeTitle1:"Não só carne.",recipeTitle2:"Inspiração também.",recipeSub:"Receitas de 10 cozinhas mundiais, incluídas gratuitamente em cada caixa.",browseAll:"Explorar as 60+ receitas →",recipesCount:"62 receitas",ctaTitle:"Fresco da quinta.",ctaSub:"Todas as semanas, sem falhar.",ctaBody:"Cortes selecionados à mão, entrega em cadeia de frio. Tão fresco como uma visita ao talho — sem a deslocação.",ctaBtn:"Começar esta semana →",cookNow:"Ver receita →",showingCount:"A mostrar",recipes:"receitas"},
    cuisines:["Todas as receitas","Clássico","BBQ","Árabe","Indiano","Asiático"],
    footer:{note:"Carne fresca, semanalmente. Luxemburgo.",halal:"Certificado Halal",links:["FAQ","Entrega","Contacto","Privacidade"],faqItems:["Como funciona a subscrição?","Posso saltar uma semana?","Qual é a política de cancelamento?","Como é embalada a carne?","Toda a carne é halal?"],deliveryItems:["Entrega grátis em Beast Max & Ultra","8€ em pedidos Lite & À la Carte","Primeira caixa: entrega sempre grátis","Entrega 6 dias por semana","Manhã (7–12h) ou Tarde (12–18h)"],contactItems:["info@meatbeast.lu","Cidade do Luxemburgo","+352 691 000 000","Seg–Sáb 8h–18h","Instagram · Facebook"],privacyItems:["Nunca vendemos os seus dados","Pagamento seguro via Stripe","Conformidade RGPD","Dados armazenados na UE","Preferências de cookies"]},
  },
  ar:{
    nav:{home:"الرئيسية",boxes:"الصناديق",alacarte:"آلا كارت",dash:"لوحتي",cart:"السلة",login:"تسجيل الدخول",logout:"خروج"},
    hero:{badge:"لحم طازج · توصيل أسبوعي · لوكسمبورغ",h1:"لحم طازج.",h2:"عند بابك.",sub:"قطع ممتازة مختارة بعناية، تُوصّل كل أسبوع. من المزرعة إلى ثلاجتك — بأعلى درجات النضارة.",cta:"تسوّق الصناديق",ctaB:"آلا كارت"},
    stats:[["لم يُجمَّد قط.","دائماً فاخر. دائماً طازج."],["62 وصفة","مضمّنة. اطبخ شيئاً رائعاً."],["6 أيام/أسبوع","صباحاً أو مساءً. أنت تختار."],["من 39€ أسبوعياً","قطع حلال فاخرة. بابك. كل أسبوع."]],
    boxes:{title:"اختر صندوقك.",sub:"اختر حجمك ونوع البروتين.",tierLabel:"حجمك",subscribe:"اشترك أسبوعياً",weekly:"/أسبوع",once:"طلب لمرة واحدة",popular:"الأكثر شيوعاً",contents:"محتويات الصندوق",perKg:"/كغ",deliveryNote:"توصيل مجاني مع Max وUltra · 8€ مع Lite وآلا كارت تحت 70€"},
    schedule:{title:"جدوِل التوصيل.",day:"يوم التوصيل",time:"الوقت المفضل",days:["الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],times:[{key:"morning",label:"صباحاً",note:"7:00 – 12:00"},{key:"afternoon",label:"مساءً",note:"12:00 – 18:00"}]},
    ac:{title:"آلا كارت",sub:"قطع مفردة، بدون اشتراك.",cats:["الكل","دواجن","لحم بقري","عجل","لحم ضأن"],add:"أضف"},
    cart:{title:"سلتك",empty:"السلة فارغة",emptyNote:"اختر صندوقاً للبدء.",sub:"المجموع الفرعي",del:"التوصيل",free:"مجاني",total:"الإجمالي",checkout:"إتمام الطلب",remove:"حذف",subTag:"أسبوعي",oneTag:"مرة واحدة",loginRequired:"سجّل الدخول لإتمام الطلب",freeNote:"🎉 تم تطبيق التوصيل المجاني!"},
    auth:{signinTitle:"مرحباً بعودتك.",signupTitle:"إنشاء حساب.",email:"البريد الإلكتروني",password:"كلمة المرور",name:"الاسم الكامل",signin:"تسجيل الدخول",signup:"إنشاء حساب",switchSignup:"ليس لديك حساب؟ سجّل",switchSignin:"لديك حساب؟ ادخل",demo:"حساب تجريبي",demoNote:"demo@meatbeast.lu / demo1234",error:"بريد إلكتروني أو كلمة مرور غير صحيحة.",errorExists:"الحساب موجود بالفعل.",secure:"بياناتك مشفّرة وآمنة."},
    co:{title:"إتمام الطلب",fname:"الاسم الأول",lname:"اسم العائلة",email:"البريد الإلكتروني",phone:"الهاتف",addr:"عنوان التوصيل",city:"المدينة",zip:"الرمز البريدي",pay:"الدفع",card:"رقم البطاقة",exp:"MM / YY",cvv:"CVV",place:"تأكيد الطلب",note:"اشتراك أسبوعي — يمكنك الإيقاف أو الإلغاء في أي وقت.",ok:"تم التأكيد. 🥩",okNote:"تم تأكيد الطلب. أول توصيل الأسبوع القادم.",secure:"تشفير SSL 256-bit"},
    dash:{title:"لوحة التحكم",welcome:"مرحباً بعودتك",subStatus:"الاشتراك",nextDel:"التوصيل القادم",upcoming:"المقبلة",history:"السجل",status:{active:"نشط",paused:"موقوف",cancelled:"ملغى",scheduled:"مجدوَل",delivered:"تم التوصيل"},pause:"إيقاف مؤقت",resume:"استئناف",cancel:"إلغاء الاشتراك",change:"تغيير الصندوق",pauseNote:"حتى 8 أسابيع.",cancelNote:"بدون رسوم.",confirmCancel:"وقف جميع التوصيلات؟",yes:"نعم، إلغاء",keep:"الاحتفاظ",noSub:"لا يوجد اشتراك نشط",noSubNote:"اشترك في صندوق لإدارته هنا.",browse:"تصفّح الصناديق"},
    home:{boxesTitle:"الصناديق.",boxesSub:"أربعة بروتينات. ثلاثة أحجام. كل أسبوع.",seeAll:"عرض جميع الصناديق ←",fromTier:"من Beast Lite",recipeLabel:"مضمّن مع كل صندوق",recipeTitle1:"ليس فقط لحماً.",recipeTitle2:"إلهاماً أيضاً.",recipeSub:"وصفات منتقاة من 10 مطابخ عالمية، مضمّنة مجاناً مع كل صندوق.",browseAll:"تصفّح الـ 60+ وصفة ←",recipesCount:"62 وصفة",ctaTitle:"طازج من المزرعة.",ctaSub:"كل أسبوع، بلا انقطاع.",ctaBody:"قطع مختارة بعناية، توصيل بسلسلة التبريد. طازج كزيارة الجزار — دون الرحلة.",ctaBtn:"ابدأ هذا الأسبوع ←",cookNow:"عرض الوصفة ←",showingCount:"يُظهر",recipes:"وصفة"},
    cuisines:["جميع الوصفات","كلاسيكي","شواء","عربي","هندي","آسيوي"],
    footer:{note:"لحم طازج أسبوعياً. لوكسمبورغ.",halal:"معتمد حلال",links:["الأسئلة الشائعة","التوصيل","التواصل","الخصوصية"],faqItems:["كيف يعمل الاشتراك؟","هل يمكنني تخطي أسبوع؟","ما سياسة الإلغاء؟","كيف يُعبَّأ اللحم؟","هل اللحم حلال بالكامل؟"],deliveryItems:["توصيل مجاني مع صناديق Max وUltra","8€ مع طلبات Lite وآلا كارت","صندوقك الأول: توصيل مجاني دائماً","التوصيل 6 أيام أسبوعياً","صباحاً (7–12) أو مساءً (12–18)"],contactItems:["info@meatbeast.lu","مدينة لوكسمبورغ","+352 691 000 000","الاثنين–السبت 8:00–18:00","إنستغرام · فيسبوك"],privacyItems:["لا نبيع بياناتك أبداً","الدفع مؤمَّن عبر Stripe","متوافق مع GDPR","البيانات مخزّنة في الاتحاد الأوروبي","تفضيلات ملفات تعريف الارتباط"]},
  },
};

function Logo({size=34}){return(<svg width={size} height={size} viewBox="0 0 44 44" fill="none"><rect width="44" height="44" rx="11" fill="#1C1917"/><path d="M9 28 C9 28 9 18 13 15 C16 13 18 16 19 19" stroke="#F9F7F4" strokeWidth="2.2" strokeLinecap="round" fill="none"/><path d="M35 28 C35 28 35 18 31 15 C28 13 26 16 25 19" stroke="#F9F7F4" strokeWidth="2.2" strokeLinecap="round" fill="none"/><ellipse cx="22" cy="26" rx="8" ry="6" fill="#2D2925"/><circle cx="18.5" cy="25" r="1.8" fill="#D97950"/><circle cx="25.5" cy="25" r="1.8" fill="#D97950"/><path d="M19.5 29.5 Q22 31 24.5 29.5" stroke="#F9F7F4" strokeWidth="1.4" strokeLinecap="round" fill="none"/><circle cx="20.5" cy="28.5" r=".8" fill="#F9F7F4" opacity=".7"/><circle cx="23.5" cy="28.5" r=".8" fill="#F9F7F4" opacity=".7"/></svg>);}
function calcDelivery(total){return total>=DELIVERY_FREE_THRESHOLD?0:DELIVERY_FEE;}
export default function App() {
  const [lang, setLang] = useState("en");
  const [view, setView] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [extraUsers, setExtraUsers] = useState({});
  const [done, setDone] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  const [pendingSub, setPendingSub] = useState(null);
  const [pendingALC, setPendingALC] = useState(null); // { items:[{id,name,price,qty}], boxName:string|null }
  const [boxDetail, setBoxDetail] = useState(null);
  const [activeRecipeId, setActiveRecipeId] = useState(null);
  const [footerPage, setFooterPage] = useState(null);
  const isRTL = lang === "ar";

  const t = T[lang];
  const qty = cart.reduce((s,i)=>s+i.qty,0);
  const subtotal = cart.reduce((s,i)=>s+i.price*i.qty,0);
  const deliveryFee = calcDelivery(subtotal);
  const allUsers = {...MOCK_USERS,...extraUsers};

  function go(v) { setView(v); setDone(false); window.scrollTo(0,0); }

  function addCart(item) {
    setCart(p=>{
      const incBy = item.qty || 1;
      const ex=p.find(c=>c.id===item.id);
      return ex ? p.map(c=>c.id===item.id?{...c,qty:c.qty+incBy}:c) : [...p,{...item,qty:incBy}];
    });
  }

  function login(email, pw) {
    const u=allUsers[email.toLowerCase()];
    if(!u||u.password!==pw) return false;
    setUser({email:email.toLowerCase(),...u}); return true;
  }

  function signup(email, pw, name) {
    const k=email.toLowerCase();
    if(allUsers[k]) return false;
    const nu={password:pw,name,orders:[],upcoming:[],sub:null,savedBoxes:[]};
    setExtraUsers(p=>({...p,[k]:nu}));
    setUser({email:k,...nu}); return true;
  }

  function logout() { setUser(null); go("home"); }

  function openBoxDetail(boxKey, tierKey) { setBoxDetail({boxKey,tierKey}); setActiveRecipeId(null); go("boxdetail"); }
  function openRecipe(id) { setActiveRecipeId(id); go("recipe"); }

  function onSelectBox(boxKey, tierKey, isMonthly) {
    setPendingSub({boxKey,tierKey,isMonthly});
    if(!user) go("auth"); else go("schedule");
  }

  // À la carte / Build-Your-Own-Box: routes through the SAME schedule step as
  // fixed boxes before anything lands in the cart, keeping delivery scheduling
  // consistent across both purchase types.
  function startALCOrder(items, boxName) {
    setPendingALC({items,boxName:boxName||null});
    if(!user) go("auth"); else go("schedule");
  }

  function confirmSchedule(day, time) {
    if(pendingSub){
      const {boxKey,tierKey,isMonthly}=pendingSub;
      const bx=BOXES.find(b=>b.key===boxKey);
      const pr=bx.price[tierKey];
      const tier=TIERS.find(t=>t.key===tierKey);
      addCart({id:`box-${boxKey}-${tierKey}`,name:bx.name,tierLabel:tier.label,size:tier.sub,price:pr,isMonthly,day,time});
      setPendingSub(null); go("cart");
      return;
    }
    if(pendingALC){
      const {items,boxName}=pendingALC;
      if(boxName){
        const total=items.reduce((s,i)=>s+i.price*i.qty,0);
        addCart({id:`byob-${Date.now()}`,name:`🧺 ${boxName}`,price:total,qty:1,isMonthly:false,day,time,isCustomBox:true,contents:items});
        // Save as a reorder template so the customer can re-add it in one tap next time
        if(user){
          setUser(p=>{
            const existing=(p.savedBoxes||[]).filter(b=>b.name.toLowerCase()!==boxName.toLowerCase());
            return {...p, savedBoxes:[{id:`sb-${Date.now()}`,name:boxName,items,total,savedAt:new Date().toISOString().slice(0,10)}, ...existing].slice(0,10)};
          });
        }
      } else {
        items.forEach(it=>addCart({id:`ac-${it.id}-${Date.now()}`,srcId:it.id,name:it.name,price:it.price,qty:it.qty,isMonthly:false,day,time}));
      }
      setPendingALC(null); go("cart");
      return;
    }
  }

  // Reorder a previously saved Build-Your-Own-Box template in one tap —
  // goes through the same schedule step as any other order, just skips
  // having to reselect every item.
  function reorderSavedBox(savedBox){
    startALCOrder(savedBox.items, savedBox.name);
  }

  function placeOrder() {
    const s=cart.find(i=>i.isMonthly);
    if(s&&user) setUser(p=>({...p,sub:{box:s.name,tier:s.tierLabel,status:"active",weeklyPrice:s.price,day:s.day,time:s.time}}));

    // Record every order — subscription, à la carte, or BYOB — into history and
    // upcoming deliveries. Previously only the subscription was tracked here,
    // so à la carte and Build-Your-Own-Box purchases never appeared in the
    // dashboard after checkout even though payment had gone through.
    let orderId = null;
    if(user && cart.length>0){
      orderId = `#MB-${Math.floor(1000+Math.random()*9000)}`;
      const total = cart.reduce((sum,i)=>sum+i.price*i.qty,0) + deliveryFee;
      const scheduled = cart.find(i=>i.day) || cart[0];
      let label, tierLabel;
      if(s){ label=s.name; tierLabel=s.tierLabel; }
      else if(cart.some(i=>i.isCustomBox)){ const cb=cart.find(i=>i.isCustomBox); label=cb.name; tierLabel="Custom box"; }
      else { label=`À la Carte`; tierLabel=`${cart.reduce((n,i)=>n+i.qty,0)} item${cart.reduce((n,i)=>n+i.qty,0)>1?"s":""}`; }
      const today=new Date().toISOString().slice(0,10);
      const newOrder={ id:orderId, box:label, tier:tierLabel, date:today, day:scheduled?.day||"—", status:"scheduled", total };
      setUser(p=>({
        ...p,
        orders:[newOrder, ...(p.orders||[])],
        upcoming:[{ id:orderId, box:label, tier:tierLabel, date:today, day:scheduled?.day||"—", time:scheduled?.time||"—", status:"scheduled" }, ...(p.upcoming||[])],
      }));
    }

    // Snapshot exactly what was ordered, before the cart is cleared, so the
    // confirmation screen can show a real summary instead of a generic message.
    setLastOrder({
      id: orderId,
      items: cart.map(i=>({name:i.name, qty:i.qty, price:i.price, tierLabel:i.tierLabel, isMonthly:i.isMonthly, isCustomBox:i.isCustomBox})),
      subtotal, deliveryFee, total: subtotal+deliveryFee,
      day: (cart.find(i=>i.day)||{}).day || null,
      time: (cart.find(i=>i.time)||{}).time || null,
    });

    setCart([]); setDone(true);
  }

  function updateSub(upd) { setUser(p=>({...p,sub:{...p.sub,...upd}})); }

  return (
    <AuthCtx.Provider value={{user,login,signup,logout}}>
      <div style={{fontFamily:"'Outfit',sans-serif",background:"#F9F7F4",color:"#1C1917",minHeight:"100vh"}} dir={isRTL?"rtl":"ltr"}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,300;1,9..144,500&display=swap');
          *{box-sizing:border-box;margin:0;padding:0}
          html,body{background:#F9F7F4}
          ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#F9F7F4}::-webkit-scrollbar-thumb{background:#D4CFC8;border-radius:99px}
          @keyframes up{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
          .up{animation:up .4s ease both}
          .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}.d5{animation-delay:.3s}
          .pb{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:#1C1917;color:#F9F7F4;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;transition:all .17s;letter-spacing:.01em;white-space:nowrap}
          .pb:hover{background:#2D2925;transform:translateY(-1px);box-shadow:0 6px 20px rgba(28,25,23,.16)}
          .ob{display:inline-flex;align-items:center;justify-content:center;gap:7px;background:#fff;color:#1C1917;border:1.5px solid #DDD9D3;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:500;font-size:14px;padding:11px 22px;border-radius:10px;transition:all .17s;white-space:nowrap}
          .ob:hover{border-color:#1C1917}
          .ab{display:inline-flex;align-items:center;justify-content:center;background:#D97950;color:#fff;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;padding:12px 24px;border-radius:10px;transition:all .17s}
          .ab:hover{background:#C4683D;transform:translateY(-1px)}
          .rb{display:inline-flex;align-items:center;background:transparent;color:#B94040;border:1.5px solid #EDD0D0;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;transition:all .17s}
          .rb:hover{background:#FEF0F0;border-color:#B94040}
          .inp{width:100%;padding:11px 14px;border:1.5px solid #E2DDD6;border-radius:10px;font-family:'Outfit',sans-serif;font-size:14px;color:#1C1917;background:#fff;outline:none;transition:all .15s}
          .inp:focus{border-color:#1C1917;box-shadow:0 0 0 3px rgba(28,25,23,.06)}
          .inp::placeholder{color:#B8B2AA}
          .card{background:#fff;border-radius:16px;border:1px solid #EBE7E0}
          .seg{background:transparent;border:1.5px solid #E2DDD6;color:#78716C;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;padding:8px 16px;border-radius:10px;transition:all .15s;white-space:nowrap}
          .seg.on{background:#1C1917;color:#F9F7F4;border-color:#1C1917}
          .cpill{background:transparent;border:1.5px solid #E2DDD6;color:#78716C;cursor:pointer;font-family:'Outfit',sans-serif;font-size:13px;font-weight:500;padding:7px 16px;border-radius:99px;transition:all .15s}
          .cpill.on{background:#1C1917;color:#F9F7F4;border-color:#1C1917}
          .nb{background:none;border:none;cursor:pointer;font-family:'Outfit',sans-serif;font-size:14px;color:#78716C;padding:4px 9px;border-radius:8px;transition:all .15s;font-weight:500}
          .nb:hover,.nb.on{color:#1C1917;background:#F0EDE8}
          .serif{font-family:'Fraunces',Georgia,serif}
          .day-btn{background:#fff;border:1.5px solid #E2DDD6;color:#1C1917;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;padding:10px 4px;border-radius:10px;transition:all .15s;text-align:center;flex:1;min-width:70px}
          .day-btn.on{background:#1C1917;color:#F9F7F4;border-color:#1C1917}
          .time-btn{background:#fff;border:1.5px solid #E2DDD6;color:#1C1917;cursor:pointer;font-family:'Outfit',sans-serif;font-size:14px;font-weight:600;padding:20px 16px;border-radius:12px;transition:all .15s;text-align:left;flex:1}
          .time-btn.on{background:#1C1917;color:#F9F7F4;border-color:#1C1917}
          .tier-btn{background:#fff;border:1.5px solid #E2DDD6;cursor:pointer;font-family:'Outfit',sans-serif;padding:14px 18px;border-radius:12px;transition:all .15s;text-align:left;flex:1}
          .tier-btn:hover{border-color:#1C1917}
          .tier-btn.on{background:#1C1917;color:#F9F7F4;border-color:#1C1917}
          .recipe-card{background:#fff;border:1px solid #EBE7E0;border-radius:14px;padding:18px;cursor:pointer;transition:all .2s}
          .recipe-card:hover{border-color:#D4CFC8;transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.07)}
          .box-hero{height:90px;display:flex;align-items:center;justify-content:center;font-size:36px;position:relative;overflow:hidden;border-radius:14px 14px 0 0}
          .mob-hide{display:flex}
          .mob-only{display:none}
          @media(max-width:900px){
            .g4r{grid-template-columns:repeat(2,1fr)!important}
            .g3r{grid-template-columns:repeat(2,1fr)!important}
          }
          @media(max-width:600px){
            .g4r{grid-template-columns:1fr 1fr!important}
            .g3r{grid-template-columns:1fr!important}
            .hero-h{font-size:40px!important;letter-spacing:-.03em!important}
            .fw{flex-direction:column!important}
            .mob-hide{display:none!important}
            .mob-only{display:flex!important}
            .nb{font-size:13px;padding:3px 6px}
            .pb{padding:11px 18px;font-size:13px}
            .ob{padding:9px 14px;font-size:13px}
            .card{border-radius:12px}
            .tier-btn{padding:10px 12px}
            button[aria-label="Menu"]{display:flex!important}
          }
          @media(max-width:400px){
            .g4r{grid-template-columns:1fr!important}
            .hero-h{font-size:34px!important}
          }
          [dir="rtl"] .nb,[dir="rtl"] .pb,[dir="rtl"] .ob{direction:rtl}
          [dir="rtl"] input,[dir="rtl"] .inp{text-align:right;direction:rtl}
          [dir="rtl"] .serif{font-family:'Noto Serif Arabic','Fraunces',Georgia,serif}
        `}</style>

        <Nav t={t} lang={lang} setLang={setLang} view={view} go={go} qty={qty} user={user} logout={logout}/>

        {view==="home"      && <HomeV t={t} go={go} openRecipe={openRecipe} lang={lang}/>}
        {view==="boxes"     && <BoxesV t={t} go={go} onSelect={onSelectBox} openDetail={openBoxDetail} lang={lang}/>}
        {view==="allrecipes"&& <AllRecipesV go={go} openRecipe={openRecipe} lang={lang}/>}
        {view==="boxdetail" && <BoxDetailV t={t} detail={boxDetail} go={go} onSelect={onSelectBox} openRecipe={openRecipe} lang={lang}/> }
        {view==="recipe"    && <RecipeV key={activeRecipeId+lang} recipeId={activeRecipeId} go={go} boxDetail={boxDetail} lang={lang}/>}
        {view==="schedule"  && <ScheduleV t={t} pending={pendingSub} pendingALC={pendingALC} onConfirm={confirmSchedule} go={go}/>}
        {view==="alacarte"  && <AlaCV t={t} lang={lang} go={go} startALCOrder={startALCOrder} user={user} reorderSavedBox={reorderSavedBox}/>}
        {view==="cart"      && <CartV t={t} cart={cart} subtotal={subtotal} deliveryFee={deliveryFee} setCart={setCart} go={go} user={user} lang={lang} openRecipe={openRecipe}/>}
        {view==="checkout"  && <CoV t={t} cart={cart} subtotal={subtotal} deliveryFee={deliveryFee} place={placeOrder} done={done} go={go} user={user} lastOrder={lastOrder}/>}
        {view==="auth"      && <AuthV t={t} go={go} pendingSub={pendingSub} pendingALC={pendingALC}/>}
        {view==="dash"      && <DashV t={t} user={user} go={go} updateSub={updateSub} reorderSavedBox={reorderSavedBox}/>}
        {footerPage         && <FooterPageV page={footerPage} lang={lang} onClose={()=>setFooterPage(null)}/>}

        <footer style={{borderTop:"1px solid #EBE7E0",padding:"36px 5%",marginTop:80,background:"#fff"}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16,marginBottom:20}}>
              {/* Brand */}
              <div style={{display:"flex",alignItems:"center",gap:9}}>
                <Logo size={22}/>
                <div>
                  <div style={{fontWeight:800,fontSize:13,color:"#1C1917",letterSpacing:"-.01em"}}>MEAT BEAST</div>
                  <div style={{fontSize:11,color:"#A8A29E"}}>{t.footer.note}</div>
                </div>
              </div>
              {/* Halal badge */}
              <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,color:"#78716C",background:"#F5F2EE",border:"1px solid #E2DDD6",padding:"5px 12px",borderRadius:99}}>
                <span>☪</span>{t.footer.halal}
              </div>
              {/* Footer links — simple pills */}
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {t.footer.links.map((l,i)=>(
                  <button key={l} onClick={()=>setFooterPage(["faq","delivery","contact","privacy"][i])} style={{background:"transparent",border:"1.5px solid #E2DDD6",cursor:"pointer",padding:"6px 16px",borderRadius:99,fontSize:12,fontWeight:600,color:"#78716C",fontFamily:"'Outfit',sans-serif",transition:"all .15s"}} onMouseEnter={e=>{e.target.style.borderColor="#1C1917";e.target.style.color="#1C1917"}} onMouseLeave={e=>{e.target.style.borderColor="#E2DDD6";e.target.style.color="#78716C"}}>{l}</button>
                ))}
              </div>
            </div>
            <div style={{borderTop:"1px solid #F5F2EE",paddingTop:16,fontSize:11,color:"#C0B9B2",textAlign:"center"}}>
              © 2025 Meat Beast Luxembourg · Luxembourg City · info@meatbeast.lu
            </div>
          </div>
        </footer>
      </div>
    </AuthCtx.Provider>
  );
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */
function Nav({t,lang,setLang,view,go,qty,user,logout}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = lang === "ar";
  return(
    <header style={{background:"rgba(249,247,244,.96)",backdropFilter:"blur(20px)",borderBottom:"1px solid #EBE7E0",position:"sticky",top:0,zIndex:100,padding:"0 5%"}}>
      <div style={{maxWidth:1100,margin:"0 auto",height:62,display:"flex",alignItems:"center",justifyContent:"space-between",gap:10}}>
        {/* Logo */}
        <button onClick={()=>go("home")} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <Logo size={32}/>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:900,color:"#1C1917",letterSpacing:"-.02em",textTransform:"uppercase"}}>MEAT</span>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:300,color:"#D97950",letterSpacing:"-.02em",textTransform:"uppercase",marginLeft:-2}}>BEAST</span>
        </button>

        {/* Desktop nav links */}
        <nav className="mob-hide" style={{gap:2,alignItems:"center"}}>
          {["home","boxes","alacarte"].map(v=><button key={v} className={`nb${view===v?" on":""}`} onClick={()=>go(v)}>{t.nav[v]}</button>)}
          {user&&<button className={`nb${view==="dash"?" on":""}`} onClick={()=>go("dash")}>{t.nav.dash}</button>}
        </nav>

        {/* Right cluster */}
        <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
          {/* Halal badge */}
          <div className="mob-hide" style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:99,background:"#F5F2EE",border:"1px solid #E2DDD6",fontSize:11,fontWeight:700,color:"#78716C",whiteSpace:"nowrap"}}>
            <span style={{fontSize:13}}>☪</span> Halal Certified
          </div>

          {/* Language switcher */}
          <div style={{display:"flex",gap:1,background:"#EBE7E0",padding:"3px",borderRadius:8,flexShrink:0}}>
            {["en","fr","de","lb","pt","ar","bs"].map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{background:lang===l?"#fff":"transparent",border:"none",cursor:"pointer",padding:"3px 7px",borderRadius:6,fontSize:10,fontWeight:lang===l?700:400,color:lang===l?"#1C1917":"#78716C",transition:"all .13s",minWidth:26}}>{l.toUpperCase()}</button>
            ))}
          </div>

          {/* User or sign in */}
          {user?(
            <div className="mob-hide" style={{display:"flex",alignItems:"center",gap:6}}>
              <button className="nb" onClick={()=>go("dash")} style={{display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:26,height:26,borderRadius:"50%",background:"#1C1917",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:"#F9F7F4"}}>{user.name?.[0]?.toUpperCase()||"U"}</div>
                <span style={{fontSize:13}}>{user.name?.split(" ")[0]}</span>
              </button>
              <button className="nb" onClick={logout} style={{fontSize:12,color:"#A8A29E"}}>↩</button>
            </div>
          ):(
            <button className="ob mob-hide" onClick={()=>go("auth")} style={{padding:"7px 14px",fontSize:13}}>{t.nav.login}</button>
          )}

          {/* Cart */}
          <button className="ob" onClick={()=>go("cart")} style={{padding:"7px 12px",fontSize:13,position:"relative",gap:5}}>
            🛒<span className="mob-hide" style={{display:"flex"}}>{t.nav.cart}</span>
            {qty>0&&<span style={{position:"absolute",top:-5,right:-5,background:"#D97950",color:"#fff",borderRadius:"50%",width:17,height:17,fontSize:10,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center"}}>{qty}</span>}
          </button>

          {/* Mobile hamburger */}
          <button className="nb" onClick={()=>setMobileOpen(o=>!o)} style={{display:"none",padding:"6px 8px",fontSize:18}} aria-label="Menu">☰</button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen&&(
        <div style={{padding:"12px 5% 16px",borderTop:"1px solid #EBE7E0",display:"flex",flexDirection:"column",gap:4,background:"rgba(249,247,244,.98)"}}>
          {["home","boxes","alacarte"].map(v=><button key={v} className={`nb${view===v?" on":""}`} style={{textAlign:isRTL?"right":"left",padding:"10px 12px"}} onClick={()=>{go(v);setMobileOpen(false);}}>{t.nav[v]}</button>)}
          {user&&<button className={`nb${view==="dash"?" on":""}`} style={{textAlign:isRTL?"right":"left",padding:"10px 12px"}} onClick={()=>{go("dash");setMobileOpen(false);}}>{t.nav.dash}</button>}
          {!user&&<button className="pb" style={{marginTop:4,width:"100%"}} onClick={()=>{go("auth");setMobileOpen(false);}}>{t.nav.login}</button>}
          {user&&<button className="nb" onClick={()=>{logout();setMobileOpen(false);}} style={{color:"#A8A29E",textAlign:isRTL?"right":"left",padding:"10px 12px"}}>{t.nav.logout}</button>}
          <div style={{marginTop:8,display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,color:"#78716C"}}>
            <span>☪</span> Halal Certified
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── HOME ───────────────────────────────────────────────────────────────── */
/* ─── BRAND IMAGES (real photography, Unsplash license) ─────────────────── */
function MeatHeroImage(){
  return(
    <div style={{position:"relative",width:"100%",height:"100%",borderRadius:20,overflow:"hidden"}}>
      {/* Real photo: raw meat assortment with knife on rustic wooden board — Sergey Kotenev / Unsplash */}
      <img
        src="https://images.unsplash.com/photo-1690983325563-fe4412c4c347?w=900&q=88&fit=crop&auto=format"
        alt="Premium raw meat assortment on rustic wooden cutting board with knife"
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}
        loading="eager"
      />
      {/* Bottom gradient overlay */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(28,17,8,.75) 0%, rgba(28,17,8,.15) 50%, transparent 100%)"}}/>
      {/* Meat Beast badge — bottom left */}
      <div style={{position:"absolute",bottom:18,left:18,display:"flex",alignItems:"center",gap:8}}>
        <div style={{background:"rgba(28,17,8,.85)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.1)",borderRadius:10,padding:"8px 14px",display:"flex",alignItems:"center",gap:8}}>
          <Logo size={22}/>
          <div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:11,fontWeight:900,color:"#F9F7F4",letterSpacing:"-.01em",textTransform:"uppercase",lineHeight:1}}>MEAT BEAST</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:"#D97950",fontWeight:700,letterSpacing:".08em",marginTop:2}}>PREMIUM CUTS</div>
          </div>
        </div>
      </div>
      {/* Top badge */}
      <div style={{position:"absolute",top:16,right:16,background:"#D97950",borderRadius:8,padding:"5px 12px"}}>
        <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,fontWeight:800,color:"#fff",letterSpacing:".1em",textTransform:"uppercase"}}>Delivered Weekly</div>
      </div>
    </div>
  );
}

function MeatBoxImage(){
  return(
    <div style={{position:"relative",width:"100%",height:"100%",borderRadius:16,overflow:"hidden",background:"#F5EFE6"}}>
      {/* Clean open kraft box — Kelli McClintock / Unsplash */}
      <img
        src="https://images.unsplash.com/photo-1573376670329-0261ea9fde97?w=600&q=90&fit=crop&auto=format"
        alt="Premium halal meat delivery box"
        style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block",filter:"brightness(0.88)"}}
        loading="eager"
      />
      {/* Centred brand overlay */}
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
        <div style={{background:"rgba(217,121,80,0.95)",backdropFilter:"blur(4px)",borderRadius:12,padding:"14px 28px",textAlign:"center",boxShadow:"0 8px 24px rgba(0,0,0,.25)"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:900,color:"#fff",letterSpacing:"-.01em",lineHeight:1}}>MEAT BEAST</div>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:9,color:"rgba(255,255,255,.8)",letterSpacing:".18em",textTransform:"uppercase",marginTop:4}}>Premium Halal · Luxembourg</div>
        </div>
      </div>
    </div>
  );
}

function HomeV({t,go,openRecipe,lang}) {
  return(
    <div>
      {/* Hero with image */}
      <section style={{padding:"64px 5% 48px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}} className="fw">
          <div>
            <div className="up" style={{marginBottom:22}}>
              <span style={{display:"inline-flex",alignItems:"center",gap:7,padding:"5px 14px",borderRadius:99,background:"#F5F2EE",border:"1px solid #E2DDD6",fontSize:12,fontWeight:600,color:"#78716C"}}>📦 {t.hero.badge}</span>
            </div>
            <h1 className="serif up d1 hero-h" style={{fontSize:80,fontWeight:700,lineHeight:.96,letterSpacing:"-.04em",marginBottom:20}}>
              {t.hero.h1}<br/><span style={{fontStyle:"italic",fontWeight:300,color:"#D97950"}}>{t.hero.h2}</span>
            </h1>
            <p className="up d2" style={{fontSize:16,color:"#78716C",maxWidth:420,lineHeight:1.65,marginBottom:32}}>{t.hero.sub}</p>
            <div className="up d3 fw" style={{display:"flex",gap:10,alignItems:"center"}}>
              <button className="pb" onClick={()=>go("boxes")} style={{padding:"14px 32px",fontSize:15}}>{t.hero.cta} →</button>
              <button onClick={()=>go("alacarte")} style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:"#A8A29E",fontFamily:"'Outfit',sans-serif",textDecoration:"underline",textUnderlineOffset:3,padding:"8px 4px"}}>{t.hero.ctaB}</button>
            </div>
          </div>
          <div className="up d2 mob-hide" style={{borderRadius:20,overflow:"hidden",boxShadow:"0 24px 64px rgba(0,0,0,.14)",height:380,display:"flex"}}>
            <MeatHeroImage/>
          </div>
        </div>
      </section>

      {/* Stats — sassy marketing strip */}
      <section style={{padding:"0 5% 48px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}} className="g4r">
          {t.stats.map(([headline,sub],i)=>(
            <div key={i} className={`card up d${i+1}`} style={{padding:"24px 20px",overflow:"hidden",position:"relative"}}>
              <div style={{position:"absolute",top:-10,right:-10,fontSize:64,opacity:.04,lineHeight:1}}>
                {["❄️","📖","📅","🚚"][i]}
              </div>
              <div style={{fontSize:11,fontWeight:800,color:"#D97950",letterSpacing:".1em",textTransform:"uppercase",marginBottom:10}}>
                {["01","02","03","04"][i]}
              </div>
              <div className="serif" style={{fontSize:19,fontWeight:700,lineHeight:1.15,marginBottom:6,letterSpacing:"-.01em"}}>{headline}</div>
              <div style={{fontSize:12,color:"#A8A29E",lineHeight:1.55}}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Boxes preview */}
      <section style={{padding:"0 5% 60px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.1fr 0.9fr",gap:20,alignItems:"stretch",marginBottom:28}} className="fw">
          <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <div className="serif" style={{fontSize:38,fontWeight:700,letterSpacing:"-.03em",lineHeight:1.05}}>{t.home.boxesTitle}</div>
            <div style={{fontSize:15,color:"#78716C",marginTop:6,marginBottom:20,lineHeight:1.6}}>{t.home.boxesSub}</div>
            <button className="pb" style={{alignSelf:"flex-start"}} onClick={()=>go("boxes")}>{t.home.seeAll}</button>
          </div>
          {/* Meat variety photo — wide concrete board */}
          <div className="mob-hide" style={{borderRadius:16,overflow:"hidden",boxShadow:"0 16px 40px rgba(0,0,0,.12)",height:220,position:"relative"}}>
            <img src="https://images.unsplash.com/photo-1690983323238-0b91789e1b5a?w=700&q=88&fit=crop&auto=format&crop=center" alt="Beef sirloin, lamb chops and chicken cuts spread on premium stone board" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",display:"block"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(28,17,8,.65) 0%,transparent 55%)"}}/>
            <div style={{position:"absolute",bottom:12,left:14,display:"flex",gap:8,flexWrap:"wrap"}}>
              {["🥩 Beef","🍖 Lamb","🍗 Poultry"].map(label=>(
                <span key={label} style={{background:"rgba(255,255,255,.15)",backdropFilter:"blur(6px)",border:"1px solid rgba(255,255,255,.25)",borderRadius:99,padding:"4px 11px",fontSize:11,fontWeight:600,color:"#fff"}}>{label}</span>
              ))}
            </div>
          </div>
          {/* Butcher box photo */}
          <div className="mob-hide" style={{borderRadius:16,overflow:"hidden",boxShadow:"0 16px 40px rgba(0,0,0,.12)",height:220,position:"relative"}}>
            <MeatBoxImage/>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}} className="g4r">
          {BOXES.map((bx,i)=>{
            const bxt=getBox(lang,bx.key);
            return(
            <div key={bx.key} className={`card up d${i+1}`} onClick={()=>go("boxes")} style={{cursor:"pointer",transition:"all .22s",overflow:"hidden",display:"flex",flexDirection:"column"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,.1)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
              {/* Visual header */}
              <div style={{height:96,background:`linear-gradient(135deg, ${bx.color}22, ${bx.color}44)`,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",position:"relative",overflow:"hidden"}}>
                <div style={{fontSize:48}}>{bx.icon}</div>
                <div style={{fontSize:72,opacity:.08,position:"absolute",right:-10,bottom:-10,lineHeight:1}}>{bx.icon}</div>
                <div style={{background:"#fff",borderRadius:8,padding:"4px 10px",fontSize:10,fontWeight:800,color:bx.color,letterSpacing:".06em",textTransform:"uppercase"}}>{bxt.tagline}</div>
              </div>
              {/* Content */}
              <div style={{padding:"18px 18px 20px",flex:1,display:"flex",flexDirection:"column"}}>
                <div className="serif" style={{fontSize:20,fontWeight:700,marginBottom:6,letterSpacing:"-.01em"}}>{bxt.name}</div>
                <div style={{fontSize:13,color:"#78716C",lineHeight:1.6,flex:1,marginBottom:14}}>{bxt.desc}</div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:22,fontWeight:900,color:"#1C1917"}}>€{bx.price.lite}<span style={{fontSize:12,fontWeight:400,color:"#A8A29E"}}>/wk</span></div>
                    <div style={{fontSize:11,color:"#A8A29E"}}>{t.home.fromTier}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:"#3D7A4E",fontWeight:600}}>Free delivery</div>
                    <div style={{fontSize:10,color:"#A8A29E"}}>Max & Ultra</div>
                  </div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </section>
      <section style={{padding:"0 5% 64px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#D97950",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>{t.home.recipeLabel}</div>
            <div className="serif" style={{fontSize:36,fontWeight:700,letterSpacing:"-.03em",lineHeight:1.05}}>{t.home.recipeTitle1}<br/>{t.home.recipeTitle2}</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
            <div style={{fontSize:14,color:"#78716C",maxWidth:260,lineHeight:1.6,textAlign:"right"}}>{t.home.recipeSub}</div>
            <button className="pb" onClick={()=>go("allrecipes")}>{t.home.browseAll}</button>
          </div>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {CUISINES.filter(c=>c.key!=="all").map((c,i)=>(<span key={c.key} style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:99,background:"#F5F2EE",border:"1px solid #E2DDD6",fontSize:12,fontWeight:600,color:"#78716C"}}>{c.emoji} {t.cuisines[i+1]||c.label}</span>))}
          <span style={{display:"inline-flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:99,background:"#1C1917",fontSize:12,fontWeight:700,color:"#F9F7F4"}}>📖 {t.home.recipesCount}</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}} className="g3r">
          {[ALL_RECIPES.flock[6],ALL_RECIPES.bull[0],ALL_RECIPES.riot[4],ALL_RECIPES.flock[4],ALL_RECIPES.bull[8],ALL_RECIPES.crown[2]].map((r,i)=>{
            const cuis=CUISINES.find(c=>c.key===r.cuisine);
            const rm=getRecipeMeta(lang,r.id);
            return(
              <div key={r.id} className={`recipe-card up d${Math.min(i+1,5)}`} onClick={()=>openRecipe(r.id)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <span style={{fontSize:36}}>{r.emoji}</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#78716C",background:"#F5F2EE",padding:"3px 10px",borderRadius:99}}>{cuis?.emoji} {getCuisineName(lang,cuis?.key)}</span>
                </div>
                <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>{rm.name||r.name}</div>
                <div style={{fontSize:13,color:"#78716C",lineHeight:1.55,marginBottom:12}}>{rm.desc||r.desc}</div>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:12,color:"#A8A29E"}}>⏱ {r.time}</span>
                  <span style={{fontSize:12,color:"#A8A29E"}}>👤 {r.servings}</span>
                  <span style={{marginLeft:"auto",fontSize:11,fontWeight:700,color:DIFF_COLOR[r.difficulty],background:DIFF_BG[r.difficulty],padding:"3px 10px",borderRadius:99}}>{r.difficulty}</span>
                </div>
                <div style={{marginTop:10,fontSize:12,color:"#D97950",fontWeight:700}}>{t.home.cookNow}</div>
              </div>
            );
          })}
        </div>
      </section>
      {/* CTA dark band */}
      <section style={{padding:"0 5% 80px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{background:"#1C1917",borderRadius:20,padding:"52px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:28}}>
          <div>
            <div className="serif" style={{fontSize:32,fontWeight:700,color:"#F9F7F4",lineHeight:1.1,letterSpacing:"-.02em"}}>{t.home.ctaTitle}<br/><span style={{fontStyle:"italic",fontWeight:300,color:"#D97950"}}>{t.home.ctaSub}</span></div>
            <p style={{fontSize:14,color:"rgba(249,247,244,.5)",marginTop:10,maxWidth:340,lineHeight:1.65}}>{t.home.ctaBody}</p>
          </div>
          <button className="ab" onClick={()=>go("boxes")} style={{fontSize:15,padding:"14px 32px"}}>{t.home.ctaBtn}</button>
        </div>
      </section>
    </div>
  );
}

/* ─── BOXES ──────────────────────────────────────────────────────────────── */
function BoxesV({t,go,onSelect,openDetail,lang}) {
  const [tier, setTier] = useState("max");
  const tb = t.boxes;
  const activeTier = TIERS.find(tr=>tr.key===tier);

  return(
    <div style={{padding:"56px 5% 96px",maxWidth:1100,margin:"0 auto"}}>
      <div className="up" style={{marginBottom:36}}>
        <h1 className="serif" style={{fontSize:52,fontWeight:700,letterSpacing:"-.04em",marginBottom:8}}>{tb.title}</h1>
        <p style={{fontSize:15,color:"#78716C"}}>{tb.sub}</p>
      </div>

      {/* Tier picker */}
      <div className="up d1" style={{marginBottom:40}}>
        <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:12}}>{tb.tierLabel}</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {TIERS.map(tr=>(
            <button key={tr.key} className={`tier-btn${tier===tr.key?" on":""}`} onClick={()=>setTier(tr.key)} style={{color:tier===tr.key?"#F9F7F4":"#1C1917"}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                <span style={{fontSize:18}}>{tr.icon}</span>
                <span style={{fontWeight:800,fontSize:15}}>{tr.label}</span>
                {tr.popular&&<span style={{fontSize:10,fontWeight:700,background:"#D97950",color:"#fff",padding:"2px 8px",borderRadius:99}}>Popular</span>}
              </div>
              <div style={{fontSize:12,opacity:.65,marginLeft:26}}>{tr.range} · {tr.note}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Box cards */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14}} className="g4r">
        {BOXES.map((bx,i)=>{
          const pr=bx.price[tier];
          const bxt=getBox(lang,bx.key);
          const contents=bxt.contents[tier];
          return(
            <div key={bx.key} className={`card up d${i+1}`} style={{display:"flex",flexDirection:"column",overflow:"hidden",transition:"all .2s",border:bx.key==="crown"?"2px solid #1C1917":"1px solid #EBE7E0"}}
              onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 12px 40px rgba(0,0,0,.09)";e.currentTarget.style.transform="translateY(-3px)"}}
              onMouseLeave={e=>{e.currentTarget.style.boxShadow="";e.currentTarget.style.transform=""}}>
              {bx.key==="crown"&&<div style={{background:"#1C1917",color:"#F9F7F4",fontSize:10,fontWeight:800,letterSpacing:".1em",textAlign:"center",padding:"6px",textTransform:"uppercase"}}>{tb.popular}</div>}
              <div style={{height:3,background:`linear-gradient(90deg,${bx.color},transparent)`}}/>
              <div style={{padding:"20px 20px 24px",flex:1,display:"flex",flexDirection:"column"}}>
                <div style={{width:46,height:46,borderRadius:11,background:bx.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:14}}>{bx.icon}</div>
                <div className="serif" style={{fontSize:20,fontWeight:700,marginBottom:1}}>{bxt.name}</div>
                <div style={{fontSize:10,color:bx.color,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",marginBottom:10}}>{bxt.tagline}</div>
                <p style={{fontSize:13,color:"#78716C",lineHeight:1.6,marginBottom:14,flex:1}}>{bxt.desc}</p>

                {/* Translated contents */}
                <div style={{borderTop:"1px solid #F0EDE8",paddingTop:10,marginBottom:14}}>
                  {contents.map((it,j)=>(
                    <div key={j} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#4A4540",padding:"2px 0"}}>
                      <div style={{width:4,height:4,borderRadius:"50%",background:bx.color,flexShrink:0}}/>{it}
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:1}}>
                    <span style={{fontSize:34,fontWeight:900}}>€{pr}</span>
                    <span style={{fontSize:13,color:"#A8A29E"}}>{tb.weekly}</span>
                  </div>
                  <div style={{fontSize:11,color:"#B8B2AA",marginBottom:12}}>€{(pr/parseFloat(activeTier.range.replace("~","").split("–")[0])).toFixed(2)}{tb.perKg} est.</div>
                  <button className="pb" style={{width:"100%",marginBottom:7,fontSize:13}} onClick={()=>onSelect(bx.key,tier,true)}>{tb.subscribe}</button>
                  <div style={{display:"flex",gap:7}}>
                    <button className="ob" style={{flex:1,fontSize:12}} onClick={()=>onSelect(bx.key,tier,false)}>{tb.once}</button>
                    <button className="ob" style={{fontSize:12,padding:"10px 14px"}} onClick={()=>openDetail(bx.key,tier)} title="View details">🔍</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery pricing strip */}
      <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap",justifyContent:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:10,background:"#EFF6EC",border:"1px solid #C8E6C9"}}>
          <span style={{fontSize:16}}>🚚</span>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:"#3D7A4E"}}>Free delivery</div>
            <div style={{fontSize:11,color:"#5A8A6A"}}>Beast Max & Ultra</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:10,background:"#F5F2EE",border:"1px solid #E2DDD6"}}>
          <span style={{fontSize:16}}>📦</span>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:"#78716C"}}>€8 delivery</div>
            <div style={{fontSize:11,color:"#A8A29E"}}>Beast Lite & À la Carte</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:10,background:"#FEF5EE",border:"1px solid #F7DCCA"}}>
          <span style={{fontSize:16}}>🎁</span>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:"#D97950"}}>First box free delivery</div>
            <div style={{fontSize:11,color:"#C07040"}}>Always — no minimum</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BOX DETAIL + RECIPE WIDGET ─────────────────────────────────────────── */

/* ─── NEW BOX DETAIL with recipe grid ───────────────────────────────────── */
function BoxDetailV({t,detail,go,onSelect,openRecipe,lang}){
  const [tier,setTier]=useState(detail?.tierKey||"max");
  const [activeCuisine,setActiveCuisine]=useState("all");
  const [searchQ,setSearchQ]=useState("");
  if(!detail){go("boxes");return null;}
  const bx=BOXES.find(b=>b.key===detail.boxKey);
  if(!bx){go("boxes");return null;}
  const bxt=getBox(lang,bx.key);
  const recipes=ALL_RECIPES[bx.key]||[];
  const filtered=recipes.filter(r=>{
    const mc=activeCuisine==="all"||r.cuisine===activeCuisine;
    const rm=getRecipeMeta(lang,r.id);
    const ms=!searchQ||((rm.name||r.name).toLowerCase().includes(searchQ.toLowerCase())||r.desc.toLowerCase().includes(searchQ.toLowerCase()));
    return mc&&ms;
  });
  return(
    <div style={{padding:"48px 5% 96px",maxWidth:1100,margin:"0 auto"}}>
      <button className="nb up" onClick={()=>go("boxes")} style={{marginBottom:24,fontSize:13,color:"#A8A29E",display:"flex",alignItems:"center",gap:5}}>← Back to boxes</button>
      <div className="up d1" style={{display:"flex",gap:20,alignItems:"flex-start",flexWrap:"wrap",marginBottom:36}}>
        <div style={{width:72,height:72,borderRadius:16,background:bx.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,flexShrink:0}}>{bx.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:11,fontWeight:700,color:bx.color,letterSpacing:".09em",textTransform:"uppercase",marginBottom:4}}>{bxt.tagline}</div>
          <h1 className="serif" style={{fontSize:46,fontWeight:700,letterSpacing:"-.03em",marginBottom:6}}>{bxt.name}</h1>
          <p style={{fontSize:15,color:"#78716C",lineHeight:1.65,maxWidth:540,marginBottom:16}}>{bxt.desc}</p>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            {TIERS.map(tr=><button key={tr.key} className={`seg${tier===tr.key?" on":""}`} onClick={()=>setTier(tr.key)} style={{fontSize:12}}>{tr.icon} {tr.label} <span style={{opacity:.55}}>· {tr.range}</span></button>)}
          </div>
        </div>
        <div className="card" style={{padding:"20px 24px",minWidth:210}}>
          <div style={{fontSize:36,fontWeight:900,marginBottom:2}}>€{bx.price[tier]}<span style={{fontSize:14,fontWeight:400,color:"#A8A29E"}}>/wk</span></div>
          <div style={{fontSize:12,color:"#A8A29E",marginBottom:14}}>{TIERS.find(tr=>tr.key===tier)?.note}</div>
          <button className="pb" style={{width:"100%",marginBottom:8,fontSize:13}} onClick={()=>onSelect(bx.key,tier,true)}>{t.boxes.subscribe}</button>
          <button className="ob" style={{width:"100%",fontSize:12}} onClick={()=>onSelect(bx.key,tier,false)}>{t.boxes.once}</button>
        </div>
      </div>
      {/* Translated contents */}
      <div className="card up d2" style={{padding:"18px 22px",marginBottom:32}}>
        <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase",marginBottom:10}}>{t.boxes.contents} · {TIERS.find(tr=>tr.key===tier)?.label}</div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          {bxt.contents[tier].map((it,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:7,fontSize:14}}><div style={{width:6,height:6,borderRadius:"50%",background:bx.color,flexShrink:0}}/>{it}</div>)}
        </div>
      </div>
      <div className="up d3">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16,flexWrap:"wrap",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"#D97950",letterSpacing:".1em",textTransform:"uppercase",marginBottom:6}}>📖 Included with this box</div>
            <div className="serif" style={{fontSize:30,fontWeight:700,letterSpacing:"-.02em"}}>{recipes.length} Recipes · 5 Cuisines</div>
          </div>
          <input className="inp" placeholder="Search recipes…" value={searchQ} onChange={e=>setSearchQ(e.target.value)} style={{width:200}}/>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
          {CUISINES.map(c=>(
            <button key={c.key} className={`cpill${activeCuisine===c.key?" on":""}`} onClick={()=>setActiveCuisine(c.key)}>
              {c.emoji} {getCuisineName(lang,c.key)} <span style={{opacity:.6,fontSize:11,marginLeft:3}}>{c.key==="all"?recipes.length:recipes.filter(r=>r.cuisine===c.key).length}</span>
            </button>
          ))}
        </div>
        {filtered.length===0?(
          <div className="card" style={{padding:"48px",textAlign:"center"}}><div style={{fontSize:32,marginBottom:12,opacity:.3}}>🔍</div><div style={{fontSize:16,color:"#78716C"}}>No recipes match your search.</div></div>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}} className="g3r">
            {filtered.map((r,i)=>{
              const cuis=CUISINES.find(c=>c.key===r.cuisine);
              const rm=getRecipeMeta(lang,r.id);
              return(
                <div key={r.id} className="recipe-card up" style={{animationDelay:`${i*.04}s`}} onClick={()=>openRecipe(r.id)}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <span style={{fontSize:32}}>{r.emoji}</span>
                    <span style={{fontSize:10,fontWeight:700,color:DIFF_COLOR[r.difficulty],background:DIFF_BG[r.difficulty],padding:"3px 9px",borderRadius:99}}>{r.difficulty}</span>
                  </div>
                  <div style={{fontWeight:700,fontSize:15,marginBottom:3}}>{rm.name||r.name}</div>
                  <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".04em",marginBottom:8}}>{cuis?.emoji} {getCuisineName(lang,cuis?.key).toUpperCase()}</div>
                  <div style={{fontSize:13,color:"#78716C",lineHeight:1.55,marginBottom:14}}>{rm.desc||r.desc}</div>
                  <div style={{display:"flex",gap:12,alignItems:"center",borderTop:"1px solid #F5F2EE",paddingTop:10}}>
                    <span style={{fontSize:12,color:"#A8A29E"}}>⏱ {r.time}</span>
                    <span style={{fontSize:12,color:"#A8A29E"}}>👤 {r.servings}</span>
                    <span style={{marginLeft:"auto",fontSize:12,color:"#D97950",fontWeight:700}}>Cook now →</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── FULL RECIPE VIEW ───────────────────────────────────────────────────── */
function RecipeV({recipeId,go,boxDetail,lang}){
  const [checkedIngs,setCheckedIngs]=useState({});
  const [currentStep,setCurrentStep]=useState(0);
  const [doneSteps,setDoneSteps]=useState({});
  const recipe=Object.values(ALL_RECIPES).flat().find(r=>r.id===recipeId);
  if(!recipe){go("boxes");return null;}
  const rm=getRecipeMeta(lang,recipe.id);
  const {ingredients,steps,hasFullTranslation}=getRecipeSteps(lang,recipe);
  const macros=RECIPE_MACROS[recipe.id];
  const cuis=CUISINES.find(c=>c.key===recipe.cuisine);
  const totalSteps=steps.length;
  const progress=Math.round((Object.keys(doneSteps).length/totalSteps)*100);
  const allDone=Object.keys(doneSteps).length===totalSteps;
  function toggleIng(i){setCheckedIngs(p=>({...p,[i]:!p[i]}));}
  function markDone(i){setDoneSteps(p=>({...p,[i]:true}));if(i<totalSteps-1)setCurrentStep(i+1);}
  const checkedCount=Object.values(checkedIngs).filter(Boolean).length;

  const MACRO_LABELS={en:{cal:"Calories",protein:"Protein",carbs:"Carbs",fat:"Fat",per:"Per serving"},fr:{cal:"Calories",protein:"Protéines",carbs:"Glucides",fat:"Lipides",per:"Par portion"},de:{cal:"Kalorien",protein:"Protein",carbs:"Kohlenhydrate",fat:"Fett",per:"Pro Portion"},pt:{cal:"Calorias",protein:"Proteína",carbs:"Hidratos",fat:"Gordura",per:"Por dose"},ar:{cal:"سعرات حرارية",protein:"بروتين",carbs:"كربوهيدرات",fat:"دهون",per:"لكل حصة"},lb:{cal:"Kalorien",protein:"Protein",carbs:"Kuelwaasserstoffer",fat:"Fett",per:"Pro Portioun"},bs:{cal:"Kalorije",protein:"Protein",carbs:"Ugljikohidrati",fat:"Masti",per:"Po porciji"}};
  const ml=MACRO_LABELS[lang]||MACRO_LABELS.en;

  return(
    <div style={{padding:"48px 5% 96px",maxWidth:900,margin:"0 auto"}}>
      <button className="nb up" onClick={()=>boxDetail?go("boxdetail"):go("home")} style={{marginBottom:24,fontSize:13,color:"#A8A29E",display:"flex",alignItems:"center",gap:5}}>← Back</button>
      <div className="up d1" style={{marginBottom:24}}>
        <div style={{display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div style={{fontSize:56}}>{recipe.emoji}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,marginBottom:8,flexWrap:"wrap"}}>
              <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:99,background:"#F5F2EE",color:"#78716C"}}>{cuis?.emoji} {getCuisineName(lang,cuis?.key)}</span>
              <span style={{fontSize:11,fontWeight:700,padding:"4px 12px",borderRadius:99,background:DIFF_BG[recipe.difficulty],color:DIFF_COLOR[recipe.difficulty]}}>{recipe.difficulty}</span>
              {lang!=="en"&&!hasFullTranslation&&lang!=="fr"&&lang!=="de"&&lang!=="lb"&&lang!=="bs"&&(
                <span style={{fontSize:10,fontWeight:600,padding:"4px 10px",borderRadius:99,background:"#EEF2FE",color:"#4A6BB5"}}>🇬🇧 Steps in English</span>
              )}
            </div>
            <h1 className="serif" style={{fontSize:40,fontWeight:700,letterSpacing:"-.03em",marginBottom:8}}>{rm.name||recipe.name}</h1>
            <p style={{fontSize:15,color:"#78716C",lineHeight:1.65,maxWidth:540,marginBottom:16}}>{rm.desc||recipe.desc}</p>
            <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
              {[["⏱",recipe.time],["👤",recipe.servings],["📋",totalSteps]].map(([icon,v])=>(
                <div key={icon} style={{textAlign:"center"}}>
                  <div style={{fontSize:16}}>{icon}</div>
                  <div style={{fontSize:14,fontWeight:700,marginTop:2}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Macros */}
      {macros&&(
        <div className="up d2" style={{display:"flex",gap:10,marginBottom:24,flexWrap:"wrap"}}>
          <div style={{flex:1,background:"#F9F7F4",border:"1px solid #EBE7E0",borderRadius:12,padding:"14px 16px",minWidth:120}}>
            <div style={{fontSize:10,fontWeight:700,color:"#A8A29E",letterSpacing:".07em",textTransform:"uppercase",marginBottom:4}}>{ml.per}</div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              {[["🔥",macros.cal,ml.cal,"#D97950"],["💪",macros.protein+"g",ml.protein,"#3D7A4E"],["🌾",macros.carbs+"g",ml.carbs,"#B87333"],["💧",macros.fat+"g",ml.fat,"#4A6BB5"]].map(([icon,val,label,color])=>(
                <div key={label} style={{textAlign:"center",minWidth:60}}>
                  <div style={{fontSize:18,marginBottom:2}}>{icon}</div>
                  <div style={{fontSize:16,fontWeight:900,color}}>{val}</div>
                  <div style={{fontSize:10,color:"#A8A29E",fontWeight:600,letterSpacing:".04em"}}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {progress>0&&(
        <div className="up d2" style={{marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:12,fontWeight:700,color:allDone?"#3D7A4E":"#78716C"}}>{allDone?"All done! 🎉":`${progress}% complete`}</span>
            {allDone&&<button className="nb" style={{fontSize:12,color:"#3D7A4E"}} onClick={()=>{setDoneSteps({});setCurrentStep(0);}}>Cook again ↺</button>}
          </div>
          <div style={{height:6,background:"#EBE7E0",borderRadius:99,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${progress}%`,background:allDone?"#3D7A4E":"#1C1917",borderRadius:99,transition:"width .4s ease"}}/>
          </div>
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:20,alignItems:"start"}} className="g3r">
        {/* Ingredients */}
        <div className="card up d2" style={{padding:"22px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase"}}>
              {{en:"Ingredients",fr:"Ingrédients",de:"Zutaten",pt:"Ingredientes",ar:"المكوّنات"}[lang]||"Ingredients"}
            </div>
            <span style={{fontSize:11,fontWeight:600,color:checkedCount===ingredients.length?"#3D7A4E":"#A8A29E"}}>{checkedCount}/{ingredients.length}</span>
          </div>
          {ingredients.map((ing,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:i<ingredients.length-1?"1px solid #F5F2EE":"none",cursor:"pointer"}} onClick={()=>toggleIng(i)}>
              <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${checkedIngs[i]?"#3D7A4E":"#E2DDD6"}`,background:checkedIngs[i]?"#3D7A4E":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .15s"}}>
                {checkedIngs[i]&&<span style={{color:"#fff",fontSize:12,fontWeight:700}}>✓</span>}
              </div>
              <span style={{fontSize:14,textDecoration:checkedIngs[i]?"line-through":"none",color:checkedIngs[i]?"#A8A29E":"#1C1917",transition:"all .15s"}}>{ing}</span>
            </div>
          ))}
          <button className="ob" style={{width:"100%",marginTop:14,fontSize:12}} onClick={()=>setCheckedIngs(Object.fromEntries(ingredients.map((_,i)=>[i,true])))}>
            {{en:"Check all ✓",fr:"Tout cocher ✓",de:"Alle abhaken ✓",pt:"Marcar tudo ✓",ar:"تحديد الكل ✓"}[lang]||"Check all ✓"}
          </button>
        </div>

        {/* Steps */}
        <div className="up d3">
          <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>
            {{en:"Method — step by step",fr:"Méthode — étape par étape",de:"Methode — Schritt für Schritt",pt:"Método — passo a passo",ar:"الطريقة — خطوة بخطوة"}[lang]||"Method"}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {steps.map((step,i)=>{
              const isDone=doneSteps[i];const isActive=currentStep===i&&!isDone;
              return(
                <div key={i} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,cursor:"pointer",transition:"all .15s",border:`1.5px solid ${isActive?"#1C1917":isDone?"#C8E6C9":"transparent"}`,background:isActive?"#F9F7F4":isDone?"#F0F7EE":"transparent"}} onClick={()=>setCurrentStep(i)}>
                  <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,transition:"all .2s",background:isDone?"#3D7A4E":isActive?"#1C1917":"#F0EDE8",color:isDone||isActive?"#fff":"#A8A29E"}}>{isDone?"✓":i+1}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:14,marginBottom:isActive&&step.desc?5:0,color:isDone?"#78716C":"#1C1917"}}>{step.title}</div>
                    {(isActive||isDone)&&step.desc&&<div style={{fontSize:13,color:isDone?"#A8A29E":"#4A4540",lineHeight:1.65}}>{step.desc}</div>}
                  </div>
                  {isActive&&<button className="pb" style={{flexShrink:0,padding:"8px 14px",fontSize:12,alignSelf:"center"}} onClick={e=>{e.stopPropagation();markDone(i);}}>
                    {i===totalSteps-1?"Done! 🎉":"Next →"}
                  </button>}
                </div>
              );
            })}
          </div>
          {(rm.tip||recipe.tip)&&(
            <div style={{background:"#FEF5EE",border:"1px solid #F7DCCA",borderRadius:12,padding:"16px 18px",display:"flex",gap:12,alignItems:"flex-start"}}>
              <span style={{fontSize:20,flexShrink:0}}>💡</span>
              <div>
                <div style={{fontSize:11,fontWeight:700,color:"#D97950",letterSpacing:".08em",textTransform:"uppercase",marginBottom:4}}>
                  {{en:"Pro tip",fr:"Conseil de pro",de:"Profi-Tipp",pt:"Dica profissional",ar:"نصيحة احترافية"}[lang]||"Pro tip"}
                </div>
                <div style={{fontSize:13,color:"#78716C",lineHeight:1.6}}>{rm.tip||recipe.tip}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function ScheduleV({t,pending,pendingALC,onConfirm,go}) {
  const sch=t.schedule;
  const [day,setDay]=useState(sch.days[0]);
  const [time,setTime]=useState("morning");
  if(!pending && !pendingALC){ go("boxes"); return null; }
  const bx=pending && BOXES.find(b=>b.key===pending.boxKey);
  const tier=pending && TIERS.find(tr=>tr.key===pending.tierKey);
  const alcCount=pendingALC && pendingALC.items.reduce((s,i)=>s+i.qty,0);
  return(
    <div style={{padding:"60px 5% 96px",maxWidth:560,margin:"0 auto"}}>
      <div className="up" style={{marginBottom:36}}>
        <h1 className="serif" style={{fontSize:44,fontWeight:700,letterSpacing:"-.03em",marginBottom:8}}>{sch.title}</h1>
        {pending?(
          <p style={{fontSize:15,color:"#78716C"}}>For <strong>{bx?.name}</strong> · {tier?.label}</p>
        ):(
          <p style={{fontSize:15,color:"#78716C"}}>{pendingALC.boxName?(<>Your box: <strong>"{pendingALC.boxName}"</strong></>):(<>À la carte · <strong>{alcCount} item{alcCount>1?"s":""}</strong></>)}</p>
        )}
      </div>
      <div className="card up d1" style={{padding:"24px",marginBottom:14}}>
        <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>{sch.day}</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
          {sch.days.map(d=>(
            <button key={d} className={`day-btn${day===d?" on":""}`} onClick={()=>setDay(d)}>
              <div style={{fontWeight:700}}>{d.slice(0,3)}</div>
              <div style={{fontSize:10,opacity:.55,marginTop:1}}>{d.slice(3)}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="card up d2" style={{padding:"24px",marginBottom:24}}>
        <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase",marginBottom:14}}>{sch.time}</div>
        <div style={{display:"flex",gap:10}}>
          {sch.times.map(tm=>(
            <button key={tm.key} className={`time-btn${time===tm.key?" on":""}`} onClick={()=>setTime(tm.key)}>
              <div style={{fontSize:24,marginBottom:8}}>{tm.key==="morning"?"🌅":"🌇"}</div>
              <div style={{fontWeight:700,fontSize:15}}>{tm.label}</div>
              <div style={{fontSize:12,opacity:.6,marginTop:2}}>{tm.note}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="up d3" style={{background:"#F0EDE8",borderRadius:10,padding:"14px 18px",marginBottom:18,display:"flex",gap:10,alignItems:"center"}}>
        <span style={{fontSize:20}}>📅</span>
        <div>
          <div style={{fontSize:14,fontWeight:700}}>{day} · {sch.times.find(tm=>tm.key===time)?.label}</div>
          <div style={{fontSize:12,color:"#78716C"}}>{sch.times.find(tm=>tm.key===time)?.note} · Weekly</div>
        </div>
      </div>
      <button className="pb up d4" style={{width:"100%",padding:15,fontSize:15}} onClick={()=>onConfirm(day,time)}>Confirm & add to cart →</button>
    </div>
  );
}

/* ─── À LA CARTE ─────────────────────────────────────────────────────────── */
function AlaCV({t,go,lang,startALCOrder,user,reorderSavedBox}) {
  const fb=(key)=> (t.ac && t.ac[key]) || (AC_UI[lang]&&AC_UI[lang][key]) || AC_UI.en[key];
  const [mode,setMode]=useState("individual"); // "individual" | "byob"
  const [cat,setCat]=useState(0);
  const cats=t.ac.cats; // [All, Poultry, Beef, Veal, Lamb]
  const catKeys=["all","poultry","beef","veal","lamb"];
  const items=cat===0?ALC_ITEMS:ALC_ITEMS.filter(i=>i.cat===catKeys[cat]);
  const [sel,setSel]=useState({}); // { itemId: qty }
  const [boxName,setBoxName]=useState("");

  function inc(id){ setSel(p=>({...p,[id]:(p[id]||0)+1})); }
  function dec(id){ setSel(p=>{ const n={...p}; if(!n[id])return n; n[id]-=1; if(n[id]<=0)delete n[id]; return n; }); }
  function clearSel(){ setSel({}); setBoxName(""); }

  const selectedList=Object.entries(sel).map(([id,qty])=>{
    const it=ALC_ITEMS.find(x=>x.id===Number(id));
    return { id:it.id, name:alcName(it,lang), price:it.p, qty };
  });
  const selCount=selectedList.reduce((s,i)=>s+i.qty,0);
  const selSubtotal=selectedList.reduce((s,i)=>s+i.price*i.qty,0);

  function goSchedule(){
    if(selectedList.length===0) return;
    const name=mode==="byob" ? (boxName.trim()||null) : null;
    startALCOrder(selectedList, name);
    clearSel();
  }

  return(
    <div style={{padding:"52px 5% 96px",maxWidth:1000,margin:"0 auto"}}>
      <div className="up" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:4}}>Add-ons</div>
          <h1 className="serif" style={{fontSize:40,fontWeight:700,letterSpacing:"-.03em",marginBottom:4}}>{t.ac.title}</h1>
          <p style={{fontSize:14,color:"#78716C"}}>{t.ac.sub}</p>
        </div>
        <button className="pb" onClick={()=>go("boxes")} style={{fontSize:13}}>← Back to boxes</button>
      </div>

      {/* Mode switch: Individual cuts vs Build Your Own Box */}
      <div className="up d1" style={{display:"flex",gap:8,marginBottom:18}}>
        <button className={`seg${mode==="individual"?" on":""}`} onClick={()=>setMode("individual")}>{fb("individualTab")}</button>
        <button className={`seg${mode==="byob"?" on":""}`} onClick={()=>setMode("byob")}>{fb("byobTab")}</button>
      </div>

      {mode==="byob" && (
        <div className="card up d1" style={{padding:"14px 18px",marginBottom:18,display:"flex",alignItems:"center",gap:10,background:"#FDF6EE"}}>
          <span style={{fontSize:20}}>🧺</span>
          <input className="inp" style={{flex:1,background:"#fff"}} placeholder={fb("namePlaceholder")} value={boxName} onChange={e=>setBoxName(e.target.value)} maxLength={40}/>
        </div>
      )}

      {/* Saved boxes — reorder a previously named box in one tap */}
      {mode==="byob" && user?.savedBoxes?.length>0 && (
        <div className="up d1" style={{marginBottom:22}}>
          <div style={{fontSize:12,fontWeight:700,color:"#A8A29E",letterSpacing:".07em",textTransform:"uppercase",marginBottom:10}}>Your saved boxes</div>
          <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
            {user.savedBoxes.map(sb=>(
              <div key={sb.id} className="card" style={{flexShrink:0,minWidth:190,padding:"12px 14px"}}>
                <div style={{fontSize:13,fontWeight:700,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>🧺 {sb.name}</div>
                <div style={{fontSize:11,color:"#A8A29E",marginBottom:8}}>{sb.items.reduce((n,i)=>n+i.qty,0)} items · €{sb.total.toFixed(2)}</div>
                <button className="pb" style={{width:"100%",padding:"6px 10px",fontSize:12}} onClick={()=>reorderSavedBox(sb)}>🔁 Reorder</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="up d1" style={{display:"flex",gap:8,marginBottom:24,flexWrap:"wrap"}}>
        {cats.map((c,i)=><button key={i} className={`cpill${cat===i?" on":""}`} onClick={()=>setCat(i)}>{c}</button>)}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:100}} className="g3r">
        {items.map((item,i)=>{
          const qty=sel[item.id]||0;
          return(
          <div key={item.id} className="card up" style={{padding:"16px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,transition:"border .15s",animationDelay:`${i*.03}s`,borderColor:qty>0?"#D97950":"#EBE7E0"}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:14,fontWeight:700,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{alcName(item,lang)}</div>
              <div style={{fontSize:12,color:"#A8A29E",marginTop:1}}>{item.w}</div>
              <div style={{fontSize:17,fontWeight:900,marginTop:5}}>€{item.p.toFixed(2)}</div>
            </div>
            {qty===0?(
              <button style={{flexShrink:0,padding:"8px 14px",borderRadius:9,border:"1.5px solid #E2DDD6",background:"transparent",color:"#1C1917",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,transition:"all .18s",minWidth:78,textAlign:"center"}} onClick={()=>inc(item.id)}>
                {t.ac.add}
              </button>
            ):(
              <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                <button onClick={()=>dec(item.id)} style={{width:28,height:28,borderRadius:8,border:"1.5px solid #E2DDD6",background:"#fff",cursor:"pointer",fontWeight:700,fontSize:15}}>−</button>
                <span style={{minWidth:18,textAlign:"center",fontWeight:700,fontSize:14}}>{qty}</span>
                <button onClick={()=>inc(item.id)} style={{width:28,height:28,borderRadius:8,border:"1.5px solid #D97950",background:"#D97950",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:15}}>+</button>
              </div>
            )}
          </div>
        );})}
      </div>

      {/* Sticky selection bar */}
      {selCount>0 && (
        <div style={{position:"fixed",left:0,right:0,bottom:0,background:"#1C1917",padding:"14px 5%",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,zIndex:40,flexWrap:"wrap"}}>
          <div style={{color:"#F9F7F4"}}>
            <div style={{fontSize:13,fontWeight:700}}>{selCount} {fb("selected")}{mode==="byob"&&boxName.trim()?` · "${boxName.trim()}"`:""}</div>
            <div style={{fontSize:12,color:"#A8A29E"}}>{fb("subtotalLbl")}: €{selSubtotal.toFixed(2)}</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="ob" style={{background:"transparent",borderColor:"#4A4540",color:"#A8A29E"}} onClick={clearSel}>{fb("clear")}</button>
            <button className="pb" onClick={goSchedule}>{fb("scheduleBtn")}</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── CART ───────────────────────────────────────────────────────────────── */
function CartV({t,cart,subtotal,deliveryFee,setCart,go,user,lang,openRecipe}) {
  const rm=id=>setCart(p=>p.filter(c=>c.id!==id));
  const grandTotal=subtotal+deliveryFee;
  const isFree=deliveryFee===0;

  // Gather ALC_ITEMS ids present in the cart (individual à la carte lines via
  // srcId, plus everything inside any named Build-Your-Own-Box), AND keywords
  // for any full box in the cart (boxes aren't linked to ALC_ITEMS ids, so we
  // derive keywords from the box's own protein category instead) — together
  // these feed one combined recipe suggestion strip covering everything in
  // the basket, not just à la carte/BYOB.
  const BOX_KEYWORDS = { flock:["chicken","turkey"], riot:["beef","lamb"], bull:["beef"], crown:["chicken","beef","veal","lamb"] };
  const cartAlcIds=[];
  const boxKeywords=[];
  cart.forEach(c=>{
    if(c.srcId) cartAlcIds.push(c.srcId);
    if(c.contents) c.contents.forEach(x=>cartAlcIds.push(x.id));
    if(c.isMonthly!==undefined && c.id?.startsWith("box-")){
      const boxKey=c.id.split("-")[1];
      if(BOX_KEYWORDS[boxKey]) boxKeywords.push(...BOX_KEYWORDS[boxKey]);
    }
  });
  const suggestedRecipes = matchRecipesForCart(cartAlcIds, boxKeywords);
  return(
    <div style={{padding:"60px 5% 96px",maxWidth:660,margin:"0 auto"}}>
      <h1 className="serif up" style={{fontSize:44,fontWeight:700,letterSpacing:"-.03em",marginBottom:32}}>{t.cart.title}</h1>
      {cart.length===0?(
        <div className="card up" style={{padding:"56px",textAlign:"center"}}>
          <div style={{fontSize:40,opacity:.2,marginBottom:14}}>🛒</div>
          <div className="serif" style={{fontSize:24,fontWeight:700,marginBottom:8,color:"#78716C"}}>{t.cart.empty}</div>
          <p style={{fontSize:14,color:"#A8A29E",marginBottom:24}}>{t.cart.emptyNote}</p>
          <button className="pb" onClick={()=>go("boxes")}>Browse boxes</button>
        </div>
      ):(
        <>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {cart.map(item=>(
              <div key={item.id} className="card" style={{padding:"14px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <span style={{fontSize:15,fontWeight:700}}>{item.name}</span>
                    {item.tierLabel&&<span style={{fontSize:11,color:"#A8A29E"}}>· {item.tierLabel}</span>}
                  </div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                    {item.isMonthly!==undefined&&<span style={{padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,background:item.isMonthly?"#EFF6EC":"#F5F3F0",color:item.isMonthly?"#3D7A4E":"#78716C"}}>{item.isMonthly?`♻ ${t.cart.subTag}`:t.cart.oneTag}</span>}
                    {item.day&&<span style={{padding:"2px 9px",borderRadius:99,fontSize:11,fontWeight:600,background:"#EEF2FE",color:"#4A6BB5"}}>{item.day} · {item.time}</span>}
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:17,fontWeight:900}}>€{(item.price*item.qty).toFixed(2)}</span>
                  <button onClick={()=>rm(item.id)} style={{background:"none",border:"none",color:"#C8C0B8",cursor:"pointer",fontSize:12,padding:"3px 7px",borderRadius:6,transition:"all .13s",fontFamily:"'Outfit',sans-serif"}}
                    onMouseEnter={e=>{e.target.style.color="#B94040";e.target.style.background="#FEF0F0"}} onMouseLeave={e=>{e.target.style.color="#C8C0B8";e.target.style.background="transparent"}}>{t.cart.remove}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery notice */}
          {isFree?(
            <div style={{background:"#EFF6EC",border:"1px solid #C8E6C9",borderRadius:10,padding:"10px 16px",marginBottom:14,fontSize:13,fontWeight:600,color:"#3D7A4E"}}>{t.cart.freeNote}</div>
          ):(
            <div style={{background:"#F5F2EE",border:"1px solid #E2DDD6",borderRadius:10,padding:"10px 16px",marginBottom:14,fontSize:13,color:"#78716C"}}>
              Upgrade to Beast Max for free delivery — or add €{(DELIVERY_FREE_THRESHOLD-subtotal).toFixed(2)} more 📦
            </div>
          )}

          {/* Ingredient-aware recipe suggestions */}
          {suggestedRecipes.length>0 && (
            <div className="up" style={{marginBottom:18}}>
              <div style={{fontSize:12,fontWeight:700,color:"#A8A29E",letterSpacing:".07em",textTransform:"uppercase",marginBottom:10}}>🍳 You can make this</div>
              <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
                {suggestedRecipes.map(r=>{
                  const rm2=getRecipeMeta(lang,r.id);
                  return(
                    <div key={r.id} onClick={()=>openRecipe(r.id)} className="card" style={{flexShrink:0,width:168,padding:"12px 14px",cursor:"pointer",transition:"border .15s"}}>
                      <div style={{fontSize:24,marginBottom:6}}>{r.emoji}</div>
                      <div style={{fontSize:13,fontWeight:700,lineHeight:1.35,marginBottom:4,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{rm2.name||r.name}</div>
                      <div style={{fontSize:11,color:"#A8A29E"}}>{r.time} · {r.difficulty}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="card" style={{padding:"20px 24px"}}>
            {[[t.cart.sub,`€${subtotal.toFixed(2)}`],[t.cart.del,isFree?t.cart.free:`€${deliveryFee.toFixed(2)}`]].map(([l,v],i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #F0EDE8"}}>
                <span style={{fontSize:14,color:"#78716C"}}>{l}</span>
                <span style={{fontSize:14,fontWeight:600,color:v===t.cart.free?"#3D7A4E":"#1C1917"}}>{v}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0 0"}}>
              <span style={{fontSize:15,fontWeight:700}}>{t.cart.total}</span>
              <span style={{fontSize:26,fontWeight:900}}>€{grandTotal.toFixed(2)}</span>
            </div>
            {!user?(
              <div style={{marginTop:14}}>
                <div style={{fontSize:12,color:"#A8A29E",textAlign:"center",marginBottom:10}}>🔒 {t.cart.loginRequired}</div>
                <button className="pb" style={{width:"100%",padding:13}} onClick={()=>go("auth")}>Sign in to checkout →</button>
              </div>
            ):(
              <button className="pb" style={{width:"100%",marginTop:14,padding:13,fontSize:14}} onClick={()=>go("checkout")}>{t.cart.checkout} →</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── AUTH ───────────────────────────────────────────────────────────────── */
function AuthV({t,go,pendingSub,pendingALC}) {
  const {login,signup}=useAuth();
  const ta=t.auth;
  const [mode,setMode]=useState("signin");
  const [email,setEmail]=useState(""); const [pw,setPw]=useState(""); const [name,setName]=useState("");
  const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  function fillDemo(){ setEmail("demo@meatbeast.lu"); setPw("demo1234"); setErr(""); }
  function submit(){
    setErr(""); setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      if(mode==="signin"){ if(!login(email,pw)){setErr(ta.error);return;} }
      else{ if(!signup(email,pw,name)){setErr(ta.errorExists);return;} }
      if(pendingSub||pendingALC) go("schedule"); else go("dash");
    },600);
  }
  return(
    <div style={{padding:"60px 5% 96px",maxWidth:400,margin:"0 auto"}}>
      <div className="up" style={{marginBottom:28}}>
        <h1 className="serif" style={{fontSize:36,fontWeight:700,letterSpacing:"-.03em"}}>{mode==="signin"?ta.signinTitle:ta.signupTitle}</h1>
      </div>
      <div className="card up d1" style={{padding:"28px"}}>
        <div style={{display:"flex",alignItems:"center",gap:7,background:"#EFF6EC",border:"1px solid #C8E6C9",borderRadius:8,padding:"9px 12px",marginBottom:22}}>
          <span>🔒</span><span style={{fontSize:12,color:"#3D7A4E",fontWeight:600}}>{ta.secure}</span>
        </div>
        {mode==="signup"&&<input className="inp" placeholder={ta.name} value={name} onChange={e=>setName(e.target.value)} style={{marginBottom:10,display:"block"}}/>}
        <input className="inp" placeholder={ta.email} value={email} onChange={e=>{setEmail(e.target.value);setErr("");}} style={{marginBottom:10,display:"block"}} type="email"/>
        <input className="inp" placeholder={ta.password} value={pw} onChange={e=>{setPw(e.target.value);setErr("");}} style={{marginBottom:err?"8px":"18px",display:"block"}} type="password"/>
        {err&&<div style={{color:"#B94040",fontSize:13,marginBottom:14,padding:"8px 12px",background:"#FEF0F0",borderRadius:8}}>{err}</div>}
        <button className="pb" style={{width:"100%",padding:13,opacity:loading?.7:1}} onClick={submit}>{loading?"…":(mode==="signin"?ta.signin:ta.signup)}</button>
        <button onClick={()=>{setMode(m=>m==="signin"?"signup":"signin");setErr("");}} style={{display:"block",width:"100%",background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#78716C",marginTop:14,fontFamily:"'Outfit',sans-serif",textDecoration:"underline",textUnderlineOffset:3}}>{mode==="signin"?ta.switchSignup:ta.switchSignin}</button>
      </div>
      {mode==="signin"&&(
        <button className="up d2" onClick={fillDemo} style={{display:"flex",alignItems:"center",gap:8,background:"none",border:"1.5px dashed #E2DDD6",cursor:"pointer",padding:"12px 16px",borderRadius:10,width:"100%",fontFamily:"'Outfit',sans-serif",marginTop:12}}>
          <span style={{fontSize:18}}>🎭</span>
          <div style={{textAlign:"left"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#1C1917"}}>{ta.demo}</div>
            <div style={{fontSize:11,color:"#A8A29E"}}>{ta.demoNote}</div>
          </div>
        </button>
      )}
    </div>
  );
}

/* ─── CHECKOUT ───────────────────────────────────────────────────────────── */
function CoV({t,cart,subtotal,deliveryFee,place,done,go,user,lastOrder}) {
  const tc=t.co; const hasSub=cart.some(i=>i.isMonthly); const grand=subtotal+deliveryFee;
  if(!user){ go("auth"); return null; }
  if(cart.length===0 && !done){ go("cart"); return null; }
  if(done) return(
    <div style={{padding:"100px 5%",textAlign:"center",maxWidth:480,margin:"0 auto"}}>
      <div style={{width:64,height:64,borderRadius:"50%",background:"#EFF6EC",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,margin:"0 auto 24px"}}>✓</div>
      <h1 className="serif up" style={{fontSize:40,fontWeight:700,letterSpacing:"-.03em",marginBottom:10}}>{tc.ok}</h1>
      <p className="up d1" style={{fontSize:15,color:"#78716C",marginBottom:28,lineHeight:1.65}}>{tc.okNote}</p>

      {lastOrder && (
        <div className="up d2 card" style={{padding:"18px 20px",marginBottom:28,textAlign:"left"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,paddingBottom:12,borderBottom:"1px solid #EBE7E0"}}>
            <div style={{fontSize:12,fontWeight:700,color:"#A8A29E",letterSpacing:".06em",textTransform:"uppercase"}}>{lastOrder.id||"Your order"}</div>
            {lastOrder.day && <div style={{fontSize:12,fontWeight:700,background:"#F5F2EE",padding:"3px 10px",borderRadius:99}}>📅 {lastOrder.day}{lastOrder.time?` · ${lastOrder.time}`:""}</div>}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {lastOrder.items.map((it,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:14}}>
                <span style={{color:"#1C1917"}}>{it.qty>1?`${it.qty}× `:""}{it.name}{it.tierLabel?` · ${it.tierLabel}`:""}{it.isMonthly?" (weekly)":""}</span>
                <span style={{fontWeight:700,flexShrink:0,marginLeft:10}}>€{(it.price*it.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{borderTop:"1px solid #EBE7E0",paddingTop:12,display:"flex",flexDirection:"column",gap:5}}>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#78716C"}}><span>Subtotal</span><span>€{lastOrder.subtotal.toFixed(2)}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:"#78716C"}}><span>Delivery</span><span>{lastOrder.deliveryFee===0?"Free":`€${lastOrder.deliveryFee.toFixed(2)}`}</span></div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:16,fontWeight:900,marginTop:4}}><span>Total</span><span>€{lastOrder.total.toFixed(2)}</span></div>
          </div>
        </div>
      )}

      <div className="up d3" style={{display:"flex",gap:10,justifyContent:"center"}}>
        <button className="pb" onClick={()=>go("dash")}>View dashboard</button>
        <button className="ob" onClick={()=>go("home")}>Back home</button>
      </div>
    </div>
  );
  return(
    <div style={{padding:"60px 5% 96px",maxWidth:540,margin:"0 auto"}}>
      <h1 className="serif up" style={{fontSize:42,fontWeight:700,letterSpacing:"-.03em",marginBottom:28}}>{tc.title}</h1>
      <div className="up d1 card" style={{padding:"11px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:10}}>
        <span>🔒</span><div style={{flex:1}}><div style={{fontSize:13,fontWeight:700}}>Secure checkout</div><div style={{fontSize:11,color:"#A8A29E"}}>{tc.secure}</div></div>
        {["Visa","MC","Amex"].map(c=><span key={c} style={{fontSize:10,fontWeight:700,color:"#78716C",background:"#EBE7E0",padding:"3px 7px",borderRadius:5}}>{c}</span>)}
      </div>
      <div className="up d2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        <input className="inp" placeholder={tc.fname} defaultValue={user.name?.split(" ")[0]}/>
        <input className="inp" placeholder={tc.lname} defaultValue={user.name?.split(" ")[1]||""}/>
      </div>
      <input className="inp" placeholder={tc.email} defaultValue={user.email} style={{marginBottom:10,display:"block"}}/>
      <input className="inp" placeholder={tc.phone} style={{marginBottom:10,display:"block"}}/>
      <input className="inp" placeholder={tc.addr} style={{marginBottom:10,display:"block"}}/>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:10,marginBottom:24}}>
        <input className="inp" placeholder={tc.city} defaultValue="Luxembourg"/>
        <input className="inp" placeholder={tc.zip}/>
      </div>
      <div style={{borderTop:"1px solid #EBE7E0",paddingTop:22,marginBottom:22}}>
        <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase",marginBottom:12}}>{tc.pay}</div>
        <div style={{position:"relative",marginBottom:10}}>
          <input className="inp" placeholder={tc.card} style={{paddingRight:50}}/>
          <span style={{position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",fontSize:18}}>💳</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          <input className="inp" placeholder={tc.exp}/><input className="inp" placeholder={tc.cvv}/>
        </div>
      </div>
      <div style={{background:"#F5F2EE",border:"1px solid #EBE7E0",borderRadius:10,padding:"14px 18px",marginBottom:18}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:14,color:"#78716C"}}>{t.cart.total}</div>
            {deliveryFee===0&&<div style={{fontSize:11,color:"#3D7A4E",fontWeight:600}}>🎉 Free delivery</div>}
            {deliveryFee>0&&<div style={{fontSize:11,color:"#78716C"}}>Incl. €{deliveryFee} delivery</div>}
          </div>
          <span style={{fontSize:24,fontWeight:900}}>€{grand.toFixed(2)}</span>
        </div>
        {hasSub&&<p style={{fontSize:11,color:"#A8A29E",marginTop:7}}>{tc.note}</p>}
      </div>
      <button className="pb" style={{width:"100%",padding:15,fontSize:15}} onClick={place}>{tc.place} 🔒</button>
    </div>
  );
}

/* ─── DASHBOARD ──────────────────────────────────────────────────────────── */
function DashV({t,user,go,updateSub,reorderSavedBox}) {
  const [cc,setCc]=useState(false);
  const m=t.dash;
  if(!user){ go("auth"); return null; }
  const sub=user.sub;
  const sc={active:{bg:"#EFF6EC",col:"#3D7A4E",dot:"#3D7A4E"},paused:{bg:"#FEF5EE",col:"#D97950",dot:"#D97950"},cancelled:{bg:"#FEF0F0",col:"#B94040",dot:"#B94040"}};
  const ss=sub?sc[sub.status]||sc.active:null;
  function badge(s){ const c={scheduled:{bg:"#EEF2FE",col:"#4A6BB5"},delivered:{bg:"#EFF6EC",col:"#3D7A4E"},active:{bg:"#EFF6EC",col:"#3D7A4E"},paused:{bg:"#FEF5EE",col:"#D97950"},cancelled:{bg:"#FEF0F0",col:"#B94040"}}[s]||{bg:"#F5F3F0",col:"#78716C"}; return <span style={{padding:"2px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:c.bg,color:c.col}}>{m.status[s]||s}</span>; }
  return(
    <div style={{padding:"52px 5% 96px",maxWidth:880,margin:"0 auto"}}>
      <div className="up" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:14,marginBottom:32}}>
        <div>
          <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:6}}>{m.title}</div>
          <h1 className="serif" style={{fontSize:38,fontWeight:700,letterSpacing:"-.03em"}}>{m.welcome}, {user.name?.split(" ")[0]} 👋</h1>
        </div>
        <button className="ob" onClick={()=>go("boxes")} style={{fontSize:13}}>{m.change} →</button>
      </div>

      {(!sub && !user.orders?.length && !user.upcoming?.length && !user.savedBoxes?.length)?(
        <div className="card up d1" style={{padding:"56px",textAlign:"center"}}>
          <div style={{fontSize:44,opacity:.2,marginBottom:14}}>📦</div>
          <div className="serif" style={{fontSize:26,fontWeight:700,marginBottom:8,color:"#78716C"}}>{m.noSub}</div>
          <p style={{fontSize:14,color:"#A8A29E",marginBottom:28}}>{m.noSubNote}</p>
          <button className="pb" onClick={()=>go("boxes")}>{m.browse}</button>
        </div>
      ):(
        <>
          {sub ? (
            <>
              {/* Top cards */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}} className="g4r">
                <div className="card up d1" style={{padding:"22px 24px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:10}}>{m.subStatus}</div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <div style={{width:8,height:8,borderRadius:"50%",background:ss.dot,boxShadow:`0 0 0 3px ${ss.bg}`}}/>
                    {badge(sub.status)}
                  </div>
                  <div className="serif" style={{fontSize:22,fontWeight:700,marginBottom:2}}>{sub.box}</div>
                  <div style={{fontSize:13,color:"#D97950",fontWeight:700,marginBottom:10}}>{sub.tier} · {sub.day} · {sub.time}</div>
                  <div style={{fontSize:30,fontWeight:900}}>€{sub.weeklyPrice}<span style={{fontSize:13,fontWeight:400,color:"#A8A29E"}}>/wk</span></div>
                </div>
                <div className="card up d2" style={{padding:"22px 24px"}}>
                  <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:10}}>{m.nextDel}</div>
                  <div style={{fontSize:40,marginBottom:8}}>📦</div>
                  <div className="serif" style={{fontSize:20,fontWeight:700,marginBottom:3}}>{user.upcoming?.[0]?.date||"TBD"}</div>
                  <div style={{fontSize:13,color:"#78716C",marginBottom:10}}>{sub.day} · {sub.time==="Morning"?"7:00 – 12:00":"12:00 – 18:00"}</div>
                  {sub.status==="active"&&<div style={{display:"inline-flex",alignItems:"center",gap:5,padding:"4px 12px",background:"#EFF6EC",borderRadius:99,fontSize:12,color:"#3D7A4E",fontWeight:700}}>✓ On track</div>}
                </div>
              </div>

              {/* Controls */}
              {sub.status!=="cancelled"&&(
                <div className="card up d3" style={{padding:"18px 22px",marginBottom:12}}>
                  <div style={{display:"flex",gap:9,flexWrap:"wrap",alignItems:"center"}}>
                    {sub.status==="active"&&<button className="ob" style={{fontSize:13}} onClick={()=>updateSub({status:"paused"})}>{m.pause}</button>}
                    {sub.status==="paused"&&<button className="pb" style={{fontSize:13}} onClick={()=>updateSub({status:"active"})}>{m.resume}</button>}
                    <button className="ob" style={{fontSize:13}} onClick={()=>go("boxes")}>{m.change}</button>
                    {!cc?(
                      <button className="rb" style={{marginLeft:"auto"}} onClick={()=>setCc(true)}>{m.cancel}</button>
                    ):(
                      <div style={{display:"flex",gap:8,alignItems:"center",marginLeft:"auto",flexWrap:"wrap"}}>
                        <span style={{fontSize:13,color:"#78716C"}}>{m.confirmCancel}</span>
                        <button className="rb" onClick={()=>{updateSub({status:"cancelled"});setCc(false);}}>{m.yes}</button>
                        <button className="ob" style={{fontSize:13}} onClick={()=>setCc(false)}>{m.keep}</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          ):(
            <div className="card up d1" style={{padding:"22px 24px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div style={{fontSize:14,color:"#78716C"}}>{m.noSubNote}</div>
              <button className="ob" style={{fontSize:13}} onClick={()=>go("boxes")}>{m.browse}</button>
            </div>
          )}

          {/* Saved boxes — reorder a Build-Your-Own-Box in one tap */}
          {user.savedBoxes?.length>0 && (
            <div className="up d4" style={{marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:10}}>🧺 Your saved boxes</div>
              <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
                {user.savedBoxes.map(sbx=>(
                  <div key={sbx.id} className="card" style={{flexShrink:0,minWidth:200,padding:"14px 16px"}}>
                    <div style={{fontSize:14,fontWeight:700,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{sbx.name}</div>
                    <div style={{fontSize:12,color:"#A8A29E",marginBottom:10}}>{sbx.items.reduce((n,i)=>n+i.qty,0)} items · €{sbx.total.toFixed(2)}</div>
                    <button className="pb" style={{width:"100%",padding:"7px 10px",fontSize:12}} onClick={()=>reorderSavedBox(sbx)}>🔁 Reorder</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          {user.upcoming?.length>0&&(
            <div className="up d4" style={{marginBottom:12}}>
              <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:10}}>{m.upcoming}</div>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {user.upcoming.map((o,i)=>(
                  <div key={o.id} className="card" style={{padding:"13px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                      <div style={{width:34,height:34,borderRadius:8,background:"#F5F2EE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>📦</div>
                      <div><div style={{fontSize:14,fontWeight:700}}>{o.box}{o.tier?` · ${o.tier}`:""}</div><div style={{fontSize:12,color:"#A8A29E"}}>{o.date} · {o.day}{o.time?` · ${o.time}`:""}</div></div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>{badge(o.status)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {user.orders?.length>0&&(
            <div className="up d5">
              <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".09em",textTransform:"uppercase",marginBottom:10}}>{m.history}</div>
              <div className="card" style={{overflow:"hidden"}}>
                {user.orders.map((o,i)=>(
                  <div key={o.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 18px",borderBottom:i<user.orders.length-1?"1px solid #F5F2EE":"none",gap:12}}>
                    <div style={{display:"flex",alignItems:"center",gap:10,flex:1}}>
                      <div style={{fontSize:18}}>✓</div>
                      <div><div style={{fontSize:14,fontWeight:700}}>{o.box}{o.tier?` · ${o.tier}`:""}</div><div style={{fontSize:12,color:"#A8A29E"}}>{o.id} · {o.date} · {o.day}</div></div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10}}>{badge(o.status)}<span style={{fontSize:14,fontWeight:900}}>€{o.total.toFixed(2)}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ─── FOOTER PAGE MODAL ──────────────────────────────────────────────────── */
function FooterPageV({page,lang,onClose}){
  const t=T[lang];
  const CONTENT = {
    faq:{
      title: t.footer.links[0],
      icon: "❓",
      sections:[
        { q:t.footer.faqItems[0], a: lang==="ar" ? "يعمل الاشتراك بشكل أسبوعي. تختار صندوقك وحجمك وجدول التوصيل، ونوصّل لك كل أسبوع تلقائياً. يمكنك الإيقاف أو الإلغاء في أي وقت." : lang==="pt" ? "A subscrição funciona semanalmente. Escolhe a sua caixa, tamanho e horário de entrega, e entregamos automaticamente todas as semanas. Pode pausar ou cancelar a qualquer momento." : lang==="fr" ? "L'abonnement fonctionne de manière hebdomadaire. Vous choisissez votre box, votre taille et votre horaire de livraison, et nous livrons automatiquement chaque semaine. Vous pouvez mettre en pause ou annuler à tout moment." : lang==="bs" ? "Pretplata funkcioniše sedmično. Odaberite kutiju, veličinu i termin dostave, a mi automatski dostavljamo svake sedmice. Možete pauzirati ili otkazati u bilo kom trenutku." : lang==="lb" ? "Daat Abonnement leeft wëchentlech. Dir wielt Är Box, Gréisst a Liwwerzäit, a mir liwweren automatesch all Woch. Dir kënnt jiddereng Zäit pauséieren oder annuléieren." : lang==="de" ? "Das Abonnement läuft wöchentlich. Sie wählen Ihre Box, Größe und Lieferzeit, und wir liefern automatisch jede Woche. Sie können jederzeit pausieren oder kündigen." : "The subscription works on a weekly basis. You choose your box, size and delivery schedule, and we automatically deliver every week. You can pause or cancel anytime." },
        { q:t.footer.faqItems[1], a: lang==="ar" ? "نعم! يمكنك تخطي أي أسبوع من لوحة التحكم الخاصة بك حتى 24 ساعة قبل موعد التوصيل المجدوَل." : lang==="pt" ? "Sim! Pode saltar qualquer semana no seu painel até 24 horas antes da entrega agendada." : lang==="fr" ? "Oui ! Vous pouvez sauter n'importe quelle semaine depuis votre tableau de bord jusqu'à 24h avant la livraison prévue." : lang==="bs" ? "Da! Možete preskočiti bilo koju sedmicu u vašoj nadzornoj ploči do 24 sata prije planirane dostave." : lang==="lb" ? "Jo! Dir kënnt jidder Woch an Ärem Dashboard bis zu 24 Stonnen virun Ärer geplangte Liwwerung iwwerspringen." : lang==="de" ? "Ja! Sie können jede Woche in Ihrem Dashboard bis zu 24 Stunden vor der geplanten Lieferung überspringen." : "Yes! You can skip any week from your dashboard up to 24 hours before your scheduled delivery." },
        { q:t.footer.faqItems[2], a: lang==="ar" ? "يمكنك الإلغاء في أي وقت بدون رسوم. ببساطة اذهب إلى لوحة التحكم وانقر إلغاء. لن يتم خصم أي مبالغ بعد الإلغاء." : lang==="pt" ? "Pode cancelar a qualquer momento sem taxas. Basta ir ao seu painel e clicar em cancelar. Não serão cobrados valores após o cancelamento." : lang==="fr" ? "Vous pouvez annuler à tout moment sans frais. Rendez-vous simplement sur votre tableau de bord et cliquez sur Annuler. Aucun montant ne sera débité après l'annulation." : lang==="bs" ? "Možete otkazati u bilo kom trenutku bez naknade. Jednostavno idite na svoju nadzornu ploču i kliknite Otkaži." : lang==="lb" ? "Dir kënnt jiddereng Zäit ouni Käschten annuléieren. Gitt einfach op Äre Dashboard a klickt op Annuléieren." : lang==="de" ? "Sie können jederzeit ohne Gebühren kündigen. Gehen Sie einfach zu Ihrem Dashboard und klicken Sie auf Kündigen." : "You can cancel at any time with no fees. Simply go to your dashboard and click Cancel. No charges after cancellation." },
        { q:t.footer.faqItems[3], a: lang==="ar" ? "تُعبَّأ جميع الطلبيات في صناديق مبرّدة ومعزولة حرارياً لضمان وصول اللحم بأعلى درجات النضارة. نستخدم ثلج جاف عند الحاجة." : lang==="pt" ? "Todos os pedidos são embalados em caixas refrigeradas e isoladas termicamente para garantir que a carne chegue fresca. Usamos gelo seco quando necessário." : lang==="fr" ? "Toutes les commandes sont emballées dans des boîtes réfrigérées et isolées thermiquement pour garantir l'arrivée de la viande fraîche. Nous utilisons de la glace carbonique si nécessaire." : lang==="bs" ? "Sve narudžbe se pakuju u rashlađene, termički izolirane kutije kako bi meso stiglo svježe. Koristimo suhi led po potrebi." : lang==="lb" ? "All Bestellungen gi a gekilte, thermesch isoléierten Boxen verpackt fir sécherzestellen datt d'Fleesch frësch ukënnt. Mir benotzen Trockeneis wann néideg." : lang==="de" ? "Alle Bestellungen werden in gekühlten, thermisch isolierten Boxen verpackt, um frische Lieferung zu gewährleisten. Wir verwenden bei Bedarf Trockeneis." : "All orders are packed in refrigerated, thermally insulated boxes to ensure the meat arrives fresh. We use dry ice when necessary." },
        { q:t.footer.faqItems[4], a: lang==="ar" ? "نعم، بالتأكيد. جميع منتجاتنا معتمدة حلال وتأتي من مزارع ومسالخ خاضعة للرقابة والتفتيش المنتظم. نلتزم بأعلى معايير الجودة والنضارة في كل طلبية." : lang==="pt" ? "Sim, com certeza. Todos os nossos produtos são certificados halal e provenientes de fazendas e matadouros supervisionados e inspeccionados regularmente. Mantemos os mais altos padrões de qualidade e frescura em cada pedido." : lang==="fr" ? "Oui, absolument. Tous nos produits sont certifiés halal et proviennent d'exploitations et d'abattoirs supervisés et régulièrement inspectés. Nous maintenons les plus hauts standards de qualité et de fraîcheur à chaque commande." : lang==="bs" ? "Da, apsolutno. Svi naši proizvodi su halal certificirani i potiču iz nadziranih, redovno inspekciranih farmi i klaonica. Držimo se najviših standarda kvalitete i svježine u svakoj narudžbi." : lang==="lb" ? "Jo, absolut. All eis Produkter sinn Halal-zertifizéiert a kommen aus iwwerpréiften, regelméisseg inspektéierten Bauerenhaffer a Schluechthaiser. Mir halen bei all Bestellung d'héchst Qualitéits- a Frëschesstandarden an." : lang==="de" ? "Ja, absolut. Alle unsere Produkte sind halal-zertifiziert und stammen aus überwachten und regelmäßig inspizierten Betrieben. Wir halten bei jeder Bestellung die höchsten Qualitäts- und Frischestandards ein." : "Yes, absolutely. All our products are halal-certified and sourced from supervised, regularly inspected farms and slaughterhouses. We maintain the highest standards of quality and freshness in every order." }]
    },
    delivery:{
      title: t.footer.links[1],
      icon: "🚚",
      items: t.footer.deliveryItems,
      extra: [
        { label: lang==="ar"?"منطقة التوصيل":lang==="pt"?"Área de entrega":lang==="fr"?"Zone de livraison":lang==="de"?"Liefergebiet":"Delivery Area", val: "Luxembourg City · Esch · Differdange · Dudelange · Ettelbruck · Diekirch" },
        { label: lang==="ar"?"حالة الطلب":lang==="pt"?"Rastreamento":lang==="fr"?"Suivi de commande":lang==="de"?"Sendungsverfolgung":"Order Tracking", val: lang==="ar"?"تتبّع طلبك في الوقت الفعلي عبر لوحة التحكم":lang==="pt"?"Rastreie o seu pedido em tempo real no painel":lang==="fr"?"Suivez votre commande en temps réel depuis votre tableau de bord":lang==="de"?"Verfolgen Sie Ihre Bestellung in Echtzeit im Dashboard":"Track your order in real time via your dashboard" },
        { label: lang==="ar"?"الحرارة":lang==="pt"?"Temperatura":lang==="fr"?"Température":lang==="de"?"Temperatur":"Temperature", val: lang==="ar"?"يُوصَّل عند 0–4°C":lang==="pt"?"Entregue a 0–4°C":lang==="fr"?"Livré entre 0–4°C":lang==="de"?"Geliefert bei 0–4°C":"Delivered at 0–4°C cold chain" }]
    },
    contact:{
      title: t.footer.links[2],
      icon: "📬",
      items: t.footer.contactItems,
    },
    privacy:{
      title: t.footer.links[3],
      icon: "🔒",
      items: t.footer.privacyItems,
      extra: [
        { label: "GDPR", val: lang==="ar"?"نلتزم بالتنظيم الأوروبي العام لحماية البيانات":lang==="pt"?"Cumprimos o Regulamento Geral sobre a Proteção de Dados da UE":lang==="fr"?"Nous respectons le Règlement Général sur la Protection des Données de l'UE":lang==="de"?"Wir halten die EU-Datenschutz-Grundverordnung ein":"We comply with EU General Data Protection Regulation" },
        { label: lang==="ar"?"الدفع":lang==="pt"?"Pagamento":lang==="fr"?"Paiement":lang==="de"?"Zahlung":"Payment", val: lang==="ar"?"معالج الدفع Stripe — لا نخزّن تفاصيل البطاقة":lang==="pt"?"Processado via Stripe — não armazenamos detalhes do cartão":lang==="fr"?"Traité via Stripe — nous ne stockons pas les détails de la carte":lang==="de"?"Verarbeitet via Stripe — wir speichern keine Kartendaten":"Processed via Stripe — we never store card details" }]
    },
  };
  const content = CONTENT[page];
  if(!content) return null;

  return(
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(28,25,23,.5)",backdropFilter:"blur(4px)"}}/>
      <div style={{position:"relative",background:"#fff",borderRadius:"20px 20px 0 0",width:"100%",maxWidth:720,maxHeight:"85vh",overflow:"auto",padding:"32px 36px 48px",zIndex:201}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:28}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{width:48,height:48,borderRadius:12,background:"#F5F2EE",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{content.icon}</div>
            <h2 style={{fontFamily:"'Fraunces',Georgia,serif",fontSize:28,fontWeight:700,letterSpacing:"-.02em"}}>{content.title}</h2>
          </div>
          <button onClick={onClose} style={{background:"#F5F2EE",border:"none",cursor:"pointer",width:36,height:36,borderRadius:"50%",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#78716C",flexShrink:0}}>×</button>
        </div>

        {/* FAQ accordion */}
        {content.sections && content.sections.map((s,i)=>(
          <div key={i} style={{borderTop:"1px solid #EBE7E0",paddingTop:16,paddingBottom:16}}>
            <div style={{fontWeight:700,fontSize:15,marginBottom:8,color:"#1C1917"}}>{s.q}</div>
            <div style={{fontSize:14,color:"#78716C",lineHeight:1.7}}>{s.a}</div>
          </div>
        ))}

        {/* Simple items list */}
        {content.items && !content.sections && (
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {content.items.map((item,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",background:"#F9F7F4",borderRadius:10}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#D97950",flexShrink:0}}/>
                <span style={{fontSize:15,color:"#1C1917"}}>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Extra info */}
        {content.extra && (
          <div style={{marginTop:24,display:"flex",flexDirection:"column",gap:12}}>
            {content.extra.map((e,i)=>(
              <div key={i} style={{padding:"14px 16px",background:"#F5F2EE",borderRadius:10}}>
                <div style={{fontSize:11,fontWeight:700,color:"#A8A29E",letterSpacing:".08em",textTransform:"uppercase",marginBottom:6}}>{e.label}</div>
                <div style={{fontSize:14,color:"#1C1917",lineHeight:1.6}}>{e.val}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{marginTop:28,padding:"20px 20px",background:"#1C1917",borderRadius:12,display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(217,121,80,.2)",border:"1px solid rgba(217,121,80,.4)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>☪</div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:"#F9F7F4",marginBottom:3,lineHeight:1.3}}>
              {lang==="ar"?"حلال معتمد. ليس مجرد ادعاء — بل التزام.":lang==="pt"?"Halal certificado. Não uma promessa — um compromisso.":lang==="fr"?"Halal certifié. Pas une promesse — un engagement.":lang==="de"?"Halal-zertifiziert. Kein Versprechen — ein Bekenntnis.":"Halal certified. Not a label — a commitment."}
            </div>
            <div style={{fontSize:12,color:"rgba(249,247,244,.45)",lineHeight:1.5}}>
              {lang==="ar"?"كل قطعة. كل طلبية. كل أسبوع.":lang==="pt"?"Cada corte. Cada pedido. Cada semana.":lang==="fr"?"Chaque coupe. Chaque commande. Chaque semaine.":lang==="lb"?"All Stéck. All Bestellung. All Woch.":lang==="bs"?"Svaki komad. Svaka narudžba. Svake sedmice.":lang==="de"?"Jeder Cut. Jede Bestellung. Jede Woche.":"Every cut. Every order. Every week."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EXTRA RECIPES (appended) ───────────────────────────────────────────── */
// Extend ALL_RECIPES with additional entries
ALL_RECIPES.flock.push(
  { id:"f11", cuisine:"bbq", name:"Lemon Herb Grilled Chicken", emoji:"🍋", time:"30 min", servings:4, difficulty:"Easy", tag:"chicken filets", desc:"Bright, zesty and smoky. A crowd-pleasing BBQ classic for any occasion.", ingredients:["4 chicken filets","Juice of 2 lemons","3 tbsp olive oil","1 tbsp fresh oregano","1 tbsp fresh thyme","3 garlic cloves, minced","Salt and pepper"], steps:[{title:"Marinade",desc:"Mix lemon juice, olive oil, garlic and herbs. Season with salt and pepper."},{title:"Marinate",desc:"Coat chicken and marinate at least 30 min, up to 4 hours."},{title:"Grill",desc:"Grill on medium-high heat 6–7 min per side."},{title:"Rest",desc:"Rest 5 min off the grill."},{title:"Serve",desc:"Serve with grilled lemon halves and a green salad."}], tip:"Squeeze the grilled lemon over the chicken just before eating for maximum brightness." },
  { id:"f12", cuisine:"arabic", name:"Moroccan Chicken Tagine", emoji:"🫕", time:"1h", servings:4, difficulty:"Medium", tag:"whole chicken", desc:"Slow-cooked with preserved lemon, olives and aromatic spices. North African comfort food.", ingredients:["1 whole chicken, jointed","1 preserved lemon, quartered","100g green olives","1 onion, sliced","3 garlic cloves","1 tsp ginger","1 tsp cumin","1 tsp coriander","½ tsp cinnamon","½ tsp saffron in warm water","Fresh coriander"], steps:[{title:"Marinate",desc:"Mix spices with garlic and oil. Coat chicken and marinate 2 hours."},{title:"Sear",desc:"Brown chicken pieces in a heavy pan or tagine. Remove and set aside."},{title:"Onion base",desc:"Sauté onion in same pan 8 min. Add ginger and garlic 2 min."},{title:"Braise",desc:"Return chicken. Add saffron water, preserved lemon and olives. Cover and cook 40 min on low."},{title:"Serve",desc:"Garnish with fresh coriander. Serve with couscous or flatbread."}], tip:"Preserved lemon is the soul of this dish — find it in Middle Eastern shops." }
);
ALL_RECIPES.riot.push(
  { id:"r11", cuisine:"classic", name:"Lamb Shepherd's Pie", emoji:"🥧", time:"1h 15min", servings:6, difficulty:"Medium", tag:"lamb shoulder", desc:"The ultimate British comfort food. Slow-cooked lamb under golden mashed potato.", ingredients:["600g lamb mince or diced shoulder","2 carrots, diced","1 onion, diced","2 tbsp tomato paste","200ml lamb stock","1 tbsp Worcestershire sauce","1 kg potatoes, mashed","50g butter","Rosemary and thyme"], steps:[{title:"Brown lamb",desc:"Brown lamb mince in oil on high heat. Season generously."},{title:"Veg",desc:"Add onion and carrot. Cook 8 min. Add tomato paste and herbs."},{title:"Simmer",desc:"Add stock and Worcestershire. Simmer 25 min until thick."},{title:"Mash",desc:"Boil and mash potatoes with butter and cream. Season well."},{title:"Bake",desc:"Spoon filling into dish. Top with mash. Bake at 200°C for 25 min until golden."}], tip:"Fork the mashed potato top before baking — it crisps up more." },
  { id:"r12", cuisine:"asian", name:"Japanese Lamb Sukiyaki", emoji:"🍲", time:"30 min", servings:4, difficulty:"Easy", tag:"lamb chops", desc:"A warming Japanese hot pot with thinly sliced lamb in a sweet soy broth.", ingredients:["400g lamb, paper thin","300ml soy sauce","200ml mirin","4 tbsp sugar","200ml water","Tofu, mushrooms, noodles, spring onions","Soft-boiled eggs"], steps:[{title:"Broth",desc:"Mix soy, mirin, sugar and water. Bring to gentle simmer in a hot pot."},{title:"Cook",desc:"Add lamb slices a few at a time — they cook in under 2 minutes."},{title:"Add veg",desc:"Add tofu, mushrooms and noodles to the pot."},{title:"Dip",desc:"Traditionally dip cooked pieces in raw beaten egg before eating."},{title:"Replenish",desc:"Add more broth as needed. The flavour deepens as you cook."}], tip:"The raw egg dip is traditional and absolutely delicious — don't skip it." }
);
ALL_RECIPES.bull.push(
  { id:"b11", cuisine:"classic", name:"Beef Wellington", emoji:"🥩", time:"1h 30min", servings:4, difficulty:"Advanced", tag:"beef tenderloin", desc:"The ultimate showstopper. Tenderloin wrapped in mushroom duxelles and golden puff pastry.", ingredients:["400g beef tenderloin","200g mixed mushrooms, finely chopped","4 slices prosciutto (or beef bresaola)","1 roll puff pastry","1 tbsp Dijon mustard","1 egg yolk","Salt and pepper","Thyme"], steps:[{title:"Sear",desc:"Sear tenderloin in very hot pan all over — 1 min per side. Rest and brush with Dijon."},{title:"Duxelles",desc:"Cook mushrooms with thyme on high heat until completely dry — about 15 min."},{title:"Wrap",desc:"Lay prosciutto/bresaola overlapping on cling film. Spread mushrooms. Roll beef inside tightly. Refrigerate 20 min."},{title:"Pastry",desc:"Unroll pastry. Place beef roll at edge. Roll tightly. Seal ends. Egg-wash all over."},{title:"Bake",desc:"Bake at 220°C for 25–28 min for medium-rare. Rest 10 min before slicing."}], tip:"Refrigerating after wrapping is crucial — it holds the shape and keeps the pastry crisp." },
  { id:"b12", cuisine:"arabic", name:"Lebanese Beef Kibbeh", emoji:"🫓", time:"45 min", servings:6, difficulty:"Medium", tag:"minced beef", desc:"Lebanon's national dish — spiced minced beef in a bulgur wheat casing.", ingredients:["500g very fine minced beef","200g bulgur wheat, soaked","1 onion","1 tsp allspice","½ tsp cinnamon","½ tsp cumin","Salt","Pine nuts and raisins for filling"], steps:[{title:"Outer mix",desc:"Blend beef, soaked bulgur, onion and spices in food processor until smooth."},{title:"Filling",desc:"Fry remaining beef mince with pine nuts, raisins and spices for filling."},{title:"Shape",desc:"Wet hands. Take outer mix, hollow out, fill with beef mixture, seal into torpedo shape."},{title:"Fry",desc:"Fry in hot oil 3–4 min per side until deep golden."},{title:"Serve",desc:"Serve with plain yogurt and fresh mint."}], tip:"Keeping the outer mix very cold makes shaping much easier." }
);
ALL_RECIPES.crown.push(
  { id:"a9", cuisine:"classic", name:"Portuguese-Style BBQ Platter", emoji:"🇵🇹", time:"50 min", servings:6, difficulty:"Medium", tag:"chicken + lamb", desc:"Piri-piri chicken, grilled beef and lamb chops — a celebration on a board.", ingredients:["Whole chicken, spatchcocked","Lamb chops","Beef sirloin","Piri-piri sauce: chillies, lemon, garlic, olive oil","Fresh coriander","Grilled bread"], steps:[{title:"Piri-piri sauce",desc:"Blend red chillies, garlic, lemon juice, olive oil and salt. Taste — it should be punchy."},{title:"Marinate chicken",desc:"Coat spatchcocked chicken in piri-piri. Marinate 2 hours minimum."},{title:"Grill chicken",desc:"Grill on indirect heat 35 min, finishing 5 min on direct heat. Char is essential."},{title:"Grill beef and lamb",desc:"Season simply. Grill sirloin 3 min per side, lamb chops 3 min per side."},{title:"Board",desc:"Slice everything and arrange on a large board. Drizzle extra piri-piri. Scatter fresh coriander."}], tip:"Good piri-piri should make you sweat a little — don't hold back on the chillies." },
  { id:"a10", cuisine:"arabic", name:"Levantine Mezze Feast", emoji:"🫙", time:"1h", servings:8, difficulty:"Easy", tag:"everything", desc:"A spread of small dishes centered around different meats — the social meal.", ingredients:["Chicken filets for shawarma","Lamb mince for kofta","Beef for fatteh","Hummus, tabbouleh, fattoush (bought or homemade)","Flatbread","Garlic sauce, tahini, pickles"], steps:[{title:"Prep chicken",desc:"Marinate chicken in shawarma spices. Grill and slice."},{title:"Kofta",desc:"Mix lamb mince with onion, parsley, cumin, cinnamon. Shape onto skewers. Grill."},{title:"Fatteh",desc:"Fry cubed beef mince, season. Layer toasted bread, beef, yogurt and chickpeas."},{title:"Arrange",desc:"Set everything out on small dishes across the table."},{title:"Eat",desc:"Mezze is communal — everyone picks and shares. Serve with flatbread."}], tip:"Mezze is designed to be slow and social. Set it all out, sit down, and take your time." }
);

/* ─── REGIONAL RECIPES — Portuguese, Bosnian, Luxembourgish, Indian, Pakistani ─ */
ALL_RECIPES.flock.push(
  { id:"f13", cuisine:"portuguese", name:"Frango Piri-Piri (Portuguese Grilled Chicken)", emoji:"🇵🇹", time:"45 min", servings:4, difficulty:"Easy", tag:"whole chicken", desc:"The dish that made Portuguese chicken famous worldwide. Fiery, garlicky, unforgettable.", ingredients:["1 whole chicken, spatchcocked","6 red piri-piri or bird's eye chillies","6 garlic cloves","Juice of 2 lemons","4 tbsp olive oil","1 tbsp paprika","1 tsp oregano","Salt"], steps:[{title:"Sauce",desc:"Blend chillies, garlic, lemon, oil, paprika, oregano and salt into a smooth marinade."},{title:"Marinate",desc:"Coat chicken fully, inside and out. Marinate minimum 4 hours, overnight is best."},{title:"Grill",desc:"Grill skin-side down on medium heat 20 min, then flip and cook 20 min more."},{title:"Baste",desc:"Brush with extra sauce every 10 minutes for a sticky, charred finish."},{title:"Serve",desc:"Rest 5 min. Serve with fries and a simple green salad."}], tip:"Piri-piri sauce improves after a day in the fridge — make double and keep some back for basting." },
  { id:"f14", cuisine:"indian", name:"Chicken Korma", emoji:"🥥", time:"40 min", servings:4, difficulty:"Medium", tag:"chicken filets", desc:"Rich, creamy and gently spiced — the mild curry that wins over everyone at the table.", ingredients:["500g chicken filets, cubed","200ml coconut milk or cream","2 onions, sliced","3 garlic cloves","2cm ginger","2 tsp garam masala","1 tsp turmeric","Handful cashews, ground","Ghee"], steps:[{title:"Onion base",desc:"Fry onions in ghee 10 min until soft and golden. Blend with garlic and ginger into a paste."},{title:"Spice",desc:"Return paste to pan. Add turmeric and garam masala. Cook 2 min until fragrant."},{title:"Chicken",desc:"Add chicken. Cook 8 min, stirring, until sealed on all sides."},{title:"Simmer",desc:"Add coconut milk and ground cashews. Simmer 15 min until chicken is tender and sauce thickens."},{title:"Finish",desc:"Taste and adjust salt. Serve with rice or naan."}], tip:"Ground cashews are the traditional thickener that gives korma its silky texture." },
  { id:"f15", cuisine:"pakistani", name:"Chicken Karahi", emoji:"🍅", time:"35 min", servings:4, difficulty:"Medium", tag:"chicken filets", desc:"Pakistan's beloved wok-cooked chicken curry — tomato-rich, ginger-forward, restaurant-style at home.", ingredients:["800g chicken pieces on the bone","4 tomatoes, chopped","4 green chillies, slit","2 tbsp ginger, julienned","4 garlic cloves","1 tsp cumin seeds","1 tsp red chilli powder","1 tsp coriander powder","Fresh coriander","Oil or ghee"], steps:[{title:"Sear chicken",desc:"Fry chicken pieces in hot oil in a karahi or wok until sealed, about 8 min."},{title:"Aromatics",desc:"Add garlic and half the ginger. Cook 2 min. Add all dry spices."},{title:"Tomatoes",desc:"Add chopped tomatoes. Cook uncovered on high heat, mashing occasionally, 12–15 min until oil separates."},{title:"Reduce",desc:"The sauce should cling to the chicken, not be soupy — keep cooking on high heat if too wet."},{title:"Finish",desc:"Top with remaining ginger, green chillies and coriander. Serve with naan."}], tip:"True karahi has almost no added water — the tomatoes and chicken create all the sauce." },
  { id:"f16", cuisine:"bosnian", name:"Bosanski Pilav (Bosnian Chicken Pilaf)", emoji:"🍚", time:"50 min", servings:4, difficulty:"Easy", tag:"chicken filets", desc:"A comforting Balkan rice dish, chicken and rice slow-simmered together in one pot.", ingredients:["500g chicken pieces","300g long-grain rice","1 onion, diced","1 carrot, grated","2 tbsp tomato paste","500ml chicken stock","1 tsp paprika","Bay leaf","Oil"], steps:[{title:"Brown chicken",desc:"Brown chicken pieces in oil in a heavy pot. Remove and set aside."},{title:"Vegetables",desc:"Fry onion and carrot in the same pot 8 min until soft. Add tomato paste and paprika."},{title:"Combine",desc:"Return chicken to pot. Add rice, stock and bay leaf. Stir once."},{title:"Simmer",desc:"Cover and simmer on low heat 25 min without stirring — this keeps the rice fluffy."},{title:"Rest",desc:"Rest off heat, covered, 5 min before serving."}], tip:"Resist stirring while the rice cooks — it's the secret to a pilaf that isn't mushy." }
);
ALL_RECIPES.riot.push(
  { id:"r13", cuisine:"bosnian", name:"Ćevapi with Somun", emoji:"🥙", time:"40 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"The Balkans' most iconic street food — grilled minced meat sausages in soft flatbread.", ingredients:["500g minced beef","200g minced lamb","1 onion, grated and squeezed dry","1 tsp baking soda","Salt and black pepper","Somun or pitta bread","Raw onion, kajmak or sour cream to serve"], steps:[{title:"Mix",desc:"Combine beef, lamb, onion, baking soda, salt and pepper. Knead vigorously 5 min until it binds together."},{title:"Rest",desc:"Refrigerate the mixture at least 2 hours — this firms up the texture."},{title:"Shape",desc:"Roll into small finger-length sausages, about 8cm long, with wet hands."},{title:"Grill",desc:"Grill on high heat, turning often, 8–10 min until well charred outside."},{title:"Serve",desc:"Stuff warm somun with ćevapi, raw diced onion and a generous spoon of kajmak or sour cream."}], tip:"The baking soda is the Balkan secret — it keeps ćevapi light and tender, never dense." },
  { id:"r14", cuisine:"pakistani", name:"Lamb Seekh Kebab", emoji:"🍢", time:"35 min", servings:4, difficulty:"Medium", tag:"lamb chops", desc:"Spiced minced lamb moulded onto skewers and grilled over charcoal — a Pakistani BBQ essential.", ingredients:["600g minced lamb","1 onion, finely grated","3 garlic cloves","2cm ginger, grated","2 green chillies, minced","1 tsp garam masala","1 tsp cumin powder","Fresh coriander and mint, chopped","1 egg (binder)"], steps:[{title:"Mix",desc:"Combine all ingredients thoroughly by hand. The mixture should feel slightly sticky."},{title:"Rest",desc:"Refrigerate 1 hour — this makes shaping onto skewers much easier."},{title:"Shape",desc:"Wet hands, mould mixture around flat metal skewers into long sausages, pressing firmly."},{title:"Grill",desc:"Grill over medium-high heat, turning regularly, 10–12 min until charred and cooked through."},{title:"Serve",desc:"Serve with mint chutney, sliced onion and naan."}], tip:"Flat skewers (not round) stop the kebab from spinning and falling apart on the grill." },
  { id:"r15", cuisine:"pakistani", name:"Lamb Karahi", emoji:"🌶️", time:"1h", servings:4, difficulty:"Medium", tag:"lamb shoulder", desc:"Bone-in lamb cooked fast and hot in a tomato-ginger base — deeply savoury, restaurant favourite.", ingredients:["800g lamb shoulder, bone-in, cubed","4 tomatoes, chopped","2 tbsp ginger, julienned","5 garlic cloves","4 green chillies","1 tsp red chilli powder","1 tsp coriander powder","½ tsp turmeric","Ghee or oil","Fresh coriander"], steps:[{title:"Sear lamb",desc:"Brown lamb pieces in hot ghee in a karahi or heavy pot, about 10 min."},{title:"Aromatics",desc:"Add garlic and half the ginger. Add all dry spices. Cook 2 min."},{title:"Tomatoes and simmer",desc:"Add tomatoes. Cover and simmer on medium-low 35–40 min until lamb is tender, stirring occasionally."},{title:"Reduce",desc:"Uncover, raise heat and cook off excess liquid until the sauce clings to the meat."},{title:"Finish",desc:"Top with remaining ginger, green chillies and coriander. Serve with roti."}], tip:"Bone-in lamb gives karahi its depth of flavour — don't substitute boneless if you can help it." },
  { id:"r16", cuisine:"portuguese", name:"Espetada (Portuguese Beef Skewers)", emoji:"🔥", time:"30 min", servings:4, difficulty:"Easy", tag:"beef sirloin", desc:"Madeira's famous garlic-studded beef skewers, traditionally grilled over an open fire.", ingredients:["600g beef sirloin, cubed large","8 garlic cloves, halved","2 bay leaves, torn","3 tbsp olive oil","Coarse sea salt","Black pepper"], steps:[{title:"Marinate",desc:"Toss beef cubes with garlic, bay leaves, olive oil, salt and pepper. Marinate 2 hours minimum."},{title:"Skewer",desc:"Thread beef and garlic pieces alternately onto skewers — traditionally bay laurel branches."},{title:"Grill",desc:"Grill on high heat 8–10 min total, turning every 2 min for even charring."},{title:"Rest",desc:"Rest 3 min off the heat."},{title:"Serve",desc:"Serve with Portuguese cornbread (bolo do caco) or fries, and a glass of red wine."}], tip:"The garlic pieces char and soften into something sweet — don't skip them, eat them." }
);
ALL_RECIPES.bull.push(
  { id:"b13", cuisine:"luxembourg", name:"Luxembourgish Beef Goulash", emoji:"🥘", time:"2h", servings:6, difficulty:"Medium", tag:"slow-cook beef", desc:"A hearty Luxembourgish take on the Central European classic — rich, paprika-deep and made for cold evenings.", ingredients:["800g stewing beef, cubed","3 onions, sliced","2 tbsp sweet paprika","1 tbsp tomato paste","500ml beef stock","2 bay leaves","1 tbsp flour","Butter or oil","Boiled potatoes to serve"], steps:[{title:"Onions",desc:"Cook sliced onions in butter on low heat 15 min until deeply softened and golden."},{title:"Brown beef",desc:"Add beef in batches, browning well on all sides."},{title:"Spice",desc:"Stir in paprika and tomato paste. Cook 2 min. Dust with flour and stir."},{title:"Braise",desc:"Add stock and bay leaves. Cover and simmer very gently 1.5 hours until beef is fork-tender."},{title:"Serve",desc:"Serve over boiled potatoes with a dollop of sour cream."}], tip:"Low and slow is non-negotiable here — rushing the braise gives tough, dry beef." },
  { id:"b14", cuisine:"pakistani", name:"Beef Nihari", emoji:"🍲", time:"3h", servings:6, difficulty:"Advanced", tag:"beef shin", desc:"The legendary slow-cooked Pakistani stew, traditionally simmered overnight for breakfast. Deep, dark and unforgettable.", ingredients:["1kg beef shin with bone","4 tbsp nihari masala (or homemade blend: coriander, fennel, ginger powder, chilli)","3 tbsp flour, toasted until brown","4 tbsp ghee","1 onion, sliced","Ginger and garlic paste","Fresh ginger, coriander, green chilli, lemon to garnish"], steps:[{title:"Sear",desc:"Brown beef shin in ghee with onion until deeply coloured, about 15 min."},{title:"Spice",desc:"Add ginger-garlic paste and nihari masala. Cook 3 min until fragrant."},{title:"Slow cook",desc:"Add water to cover generously. Cover and simmer on very low heat 2.5–3 hours until beef falls apart."},{title:"Thicken",desc:"Whisk toasted flour with a little water into a slurry. Stir into the stew to thicken."},{title:"Serve",desc:"Simmer 10 more minutes. Garnish with ginger, coriander, chilli and lemon. Serve with naan."}], tip:"Toasting the flour until deep brown before adding is what gives nihari its characteristic dark colour and nutty depth." },
  { id:"b15", cuisine:"pakistani", name:"Chapli Kebab", emoji:"🫓", time:"30 min", servings:4, difficulty:"Easy", tag:"minced beef", desc:"Peshawar's famous flat, crispy-edged minced beef patties, packed with pomegranate seeds and coriander.", ingredients:["600g minced beef","1 onion, finely chopped","2 tomatoes, deseeded and finely chopped","2 green chillies, minced","1 tbsp dried pomegranate seeds (anardana), crushed","1 tsp coriander seeds, crushed","1 egg","2 tbsp cornflour","Fresh coriander"], steps:[{title:"Mix",desc:"Combine all ingredients by hand until well distributed — don't overwork the mince."},{title:"Rest",desc:"Refrigerate 20 min so the patties hold together better when frying."},{title:"Shape",desc:"Form into wide, flat patties about 1cm thick — chapli means \"flat\" in Pashto."},{title:"Fry",desc:"Fry in a generously oiled pan on medium heat 5–6 min per side until deeply golden and crisp-edged."},{title:"Serve",desc:"Serve hot with naan, raw onion rings and a wedge of lemon."}], tip:"The tomato and onion should be very finely chopped, almost mushy — this keeps the patties tender inside." },
  { id:"b16", cuisine:"portuguese", name:"Bife à Café (Portuguese Coffee-Butter Steak)", emoji:"☕", time:"20 min", servings:2, difficulty:"Easy", tag:"beef sirloin", desc:"Lisbon café classic — a thin steak in a glossy butter, garlic and coffee sauce. Sounds strange, tastes incredible.", ingredients:["2 thin beef sirloin steaks","3 garlic cloves, sliced","3 tbsp butter","100ml strong black coffee (espresso works)","1 tbsp Dijon mustard","Splash of white wine or beer","Salt and pepper","Fries to serve"], steps:[{title:"Season",desc:"Season steaks generously with salt and pepper."},{title:"Sear",desc:"Sear steaks hard and fast in a hot pan, 2 min per side for thin cuts. Remove and rest."},{title:"Sauce",desc:"In the same pan, fry garlic in butter 1 min. Add coffee, mustard and wine. Simmer 3 min to reduce slightly."},{title:"Combine",desc:"Return steaks to the pan briefly to coat in sauce."},{title:"Serve",desc:"Plate with plenty of sauce poured over and a mountain of fries."}], tip:"Don't skip the coffee thinking it'll taste bitter — it mellows into a deep, savoury backbone for the sauce." }
);
ALL_RECIPES.crown.push(
  { id:"a11", cuisine:"bosnian", name:"Bosanski Lonac (Bosnian Mixed Meat Pot)", emoji:"🍯", time:"2h 30min", servings:6, difficulty:"Medium", tag:"everything", desc:"Bosnia's national one-pot dish — layers of beef, lamb and vegetables slow-cooked together in a clay pot.", ingredients:["300g beef, cubed","300g lamb shoulder, cubed","2 potatoes, chunked","2 carrots, chunked","1 cabbage, quartered","2 onions, sliced","2 bay leaves","Whole peppercorns","Fresh parsley"], steps:[{title:"Layer",desc:"In a heavy pot, layer meat and vegetables alternately — meat, onion, potato, carrot, cabbage, repeat."},{title:"Season",desc:"Add bay leaves, peppercorns and salt between layers. Do not stir once layered."},{title:"Cover with water",desc:"Add water just to cover the top layer."},{title:"Slow cook",desc:"Cover tightly and simmer on very low heat 2–2.5 hours without stirring."},{title:"Serve",desc:"Serve straight from the pot, scattered with fresh parsley and crusty bread on the side."}], tip:"The magic of lonac is patience — resist the urge to stir. The layers cook into each other on their own." },
  { id:"a12", cuisine:"luxembourg", name:"Luxembourg Mixed Grill Assiette", emoji:"🍽️", time:"40 min", servings:4, difficulty:"Easy", tag:"chicken + beef + lamb", desc:"A generous Luxembourgish-style grilled platter — simple seasoning, quality meat, classic bistro comfort.", ingredients:["4 chicken thighs","4 lamb chops","400g beef sirloin","3 tbsp mustard","2 tbsp herbes de Provence","Olive oil","Salt and pepper","Grilled tomatoes and green beans to serve"], steps:[{title:"Season",desc:"Rub all meats with olive oil, mustard, herbes de Provence, salt and pepper."},{title:"Rest",desc:"Let meats come to room temperature, about 20 min, while you heat the grill."},{title:"Grill chicken first",desc:"Chicken thighs take longest — grill 6–7 min per side until fully cooked."},{title:"Grill lamb and beef",desc:"Grill lamb chops and beef sirloin 3–4 min per side for medium."},{title:"Plate",desc:"Arrange all meats on a large platter with grilled tomatoes and green beans."}], tip:"Staggering the grill times means everything finishes and rests together — plan the chicken first." },
  { id:"a13", cuisine:"pakistani", name:"Pakistani Mixed Grill Platter", emoji:"🍢", time:"1h", servings:6, difficulty:"Medium", tag:"chicken + beef + lamb", desc:"Seekh kebab, chicken tikka and lamb chops together on one smoky, spiced platter — a Pakistani BBQ favourite.", ingredients:["400g minced beef (for seekh)","500g chicken thighs, cubed","4 lamb chops","Yogurt, ginger-garlic paste, garam masala, chilli powder, cumin for marinades","Lemon, onion rings, mint chutney to serve"], steps:[{title:"Marinate chicken",desc:"Coat chicken cubes in yogurt, ginger-garlic, garam masala and chilli. Marinate 2 hours."},{title:"Season lamb",desc:"Rub lamb chops with garlic, cumin, chilli powder and a little oil."},{title:"Shape seekh",desc:"Mix minced beef with ginger, garlic, chilli and coriander. Mould onto skewers."},{title:"Grill everything",desc:"Grill chicken skewers, lamb chops and seekh kebabs, turning regularly, 10–15 min total until charred and cooked through."},{title:"Serve",desc:"Arrange on a large platter with lemon wedges, onion rings and mint chutney."}], tip:"Stagger the grill so everything reaches the table hot together — chicken and seekh cook at similar speeds, start lamb chops slightly earlier." },
  { id:"a14", cuisine:"indian", name:"Indian Tandoori Mixed Grill", emoji:"🔥", time:"1h", servings:6, difficulty:"Medium", tag:"chicken + lamb", desc:"Classic tandoori chicken and lamb chops, char-grilled with a smoky yogurt marinade — restaurant tandoor flavour at home.", ingredients:["4 chicken drumsticks","4 lamb chops","300g thick yogurt","2 tbsp tandoori masala","1 tbsp ginger-garlic paste","1 tsp red chilli powder","Juice of 1 lemon","Mustard oil or vegetable oil"], steps:[{title:"First marinade",desc:"Rub chicken and lamb with lemon juice, salt and a little chilli powder. Set 20 min."},{title:"Second marinade",desc:"Mix yogurt, tandoori masala, ginger-garlic paste and oil. Coat meats thoroughly. Marinate at least 4 hours, ideally overnight."},{title:"Preheat",desc:"Get your grill or oven very hot — tandoori needs high heat to char properly."},{title:"Grill",desc:"Grill chicken 20–25 min and lamb chops 8–10 min, turning occasionally, basting with leftover marinade."},{title:"Serve",desc:"Char slightly more directly over flame at the end if possible. Serve with mint chutney and sliced onion."}], tip:"The double marinade — acid first, then yogurt-spice — is the real tandoori technique and makes a noticeable difference." }
);

/* ─── ALL RECIPES VIEW ───────────────────────────────────────────────────── */
function AllRecipesV({go, openRecipe, lang}) {
  const [cuisine, setCuisine] = useState("all");
  const [boxFilter, setBoxFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [diff, setDiff] = useState("all");

  const BOX_FILTERS = [
    { key:"all",   label:"All boxes",      icon:"📖" },
    { key:"flock", label:"The Flock",      icon:"🍗" },
    { key:"riot",  label:"Red Riot",       icon:"🥩" },
    { key:"bull",  label:"The Bull",       icon:"🎯" },
    { key:"crown", label:"The Crown",     icon:"👑" }];

  // Flatten all recipes with box info
  const allRaw = Object.entries(ALL_RECIPES).flatMap(([boxKey, recipes]) =>
    recipes.map(r => ({...r, boxKey}))
  );

  const filtered = allRaw.filter(r => {
    const rm = getRecipeMeta(lang, r.id);
    const name = (rm.name || r.name).toLowerCase();
    const matchCuisine = cuisine === "all" || r.cuisine === cuisine;
    const matchBox = boxFilter === "all" || r.boxKey === boxFilter;
    const matchSearch = !search || name.includes(search.toLowerCase());
    const matchDiff = diff === "all" || r.difficulty === diff;
    return matchCuisine && matchBox && matchSearch && matchDiff;
  });

  const bxColors = {flock:"#B87333",riot:"#9B3A3A",bull:"#C0392B",crown:"#1C1917"};
  const bxLabels = {flock:"The Flock",riot:"Red Riot",bull:"The Bull",crown:"The Crown"};

  return (
    <div style={{padding:"52px 5% 96px", maxWidth:1100, margin:"0 auto"}}>
      {/* Header */}
      <button className="nb" onClick={()=>go("home")} style={{fontSize:13,color:"#A8A29E",marginBottom:24,display:"flex",alignItems:"center",gap:5}}>← Back</button>
      <div className="up" style={{marginBottom:36}}>
        <div style={{fontSize:11,fontWeight:700,color:"#D97950",letterSpacing:".1em",textTransform:"uppercase",marginBottom:8}}>Included free with every box</div>
        <h1 className="serif" style={{fontSize:48,fontWeight:700,letterSpacing:"-.03em",marginBottom:8}}>All 46 Recipes</h1>
        <p style={{fontSize:15,color:"#78716C"}}>Classic · BBQ · Arabic · Indian · Asian. Browse, filter, cook.</p>
      </div>

      {/* Filters row */}
      <div className="card up d1" style={{padding:"18px 20px",marginBottom:24}}>
        <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"}}>
          {/* Search */}
          <input className="inp" placeholder="Search recipes…" value={search} onChange={e=>setSearch(e.target.value)} style={{width:200,flex:"0 0 auto"}}/>

          {/* Box filter */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {BOX_FILTERS.map(f=>(
              <button key={f.key} onClick={()=>setBoxFilter(f.key)} style={{background:boxFilter===f.key?"#1C1917":"transparent",color:boxFilter===f.key?"#F9F7F4":"#78716C",border:`1.5px solid ${boxFilter===f.key?"#1C1917":"#E2DDD6"}`,cursor:"pointer",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,fontFamily:"'Outfit',sans-serif",transition:"all .15s",whiteSpace:"nowrap"}}>
                {f.icon} {f.label}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div style={{display:"flex",gap:6,marginLeft:"auto"}}>
            {["all","Easy","Medium","Advanced"].map(d=>(
              <button key={d} onClick={()=>setDiff(d)} style={{background:diff===d?(d==="all"?"#1C1917":DIFF_BG[d]||"#1C1917"):"transparent",color:diff===d?(d==="all"?"#F9F7F4":DIFF_COLOR[d]||"#F9F7F4"):"#78716C",border:`1.5px solid ${diff===d?(d==="all"?"#1C1917":DIFF_COLOR[d]||"#1C1917"):"#E2DDD6"}`,cursor:"pointer",padding:"6px 12px",borderRadius:8,fontSize:12,fontWeight:600,fontFamily:"'Outfit',sans-serif",transition:"all .15s"}}>
                {d==="all"?"All levels":d}
              </button>
            ))}
          </div>
        </div>

        {/* Cuisine pills */}
        <div style={{display:"flex",gap:7,marginTop:14,flexWrap:"wrap"}}>
          {CUISINES.map(c=>(
            <button key={c.key} className={`cpill${cuisine===c.key?" on":""}`} onClick={()=>setCuisine(c.key)}>
              {c.emoji} {c.label}
              <span style={{opacity:.55,marginLeft:5,fontSize:11}}>
                {c.key==="all"?allRaw.length:allRaw.filter(r=>r.cuisine===c.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="up d2" style={{fontSize:13,color:"#A8A29E",marginBottom:18,fontWeight:500}}>
        Showing {filtered.length} recipe{filtered.length!==1?"s":""}
        {boxFilter!=="all"&&` from ${bxLabels[boxFilter]}`}
        {cuisine!=="all"&&` · ${CUISINES.find(c=>c.key===cuisine)?.label}`}
        {diff!=="all"&&` · ${diff}`}
      </div>

      {/* Recipe grid */}
      {filtered.length===0 ? (
        <div className="card" style={{padding:"64px",textAlign:"center"}}>
          <div style={{fontSize:40,opacity:.2,marginBottom:16}}>🔍</div>
          <div style={{fontSize:18,color:"#78716C",fontWeight:600}}>No recipes found</div>
          <div style={{fontSize:14,color:"#A8A29E",marginTop:8}}>Try adjusting your filters</div>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}} className="g3r">
          {filtered.map((r,i)=>{
            const rm = getRecipeMeta(lang, r.id);
            const cuis = CUISINES.find(c=>c.key===r.cuisine);
            const boxColor = bxColors[r.boxKey]||"#1C1917";
            return (
              <div key={`${r.boxKey}-${r.id}`} className="recipe-card up" style={{animationDelay:`${Math.min(i,.25)*0.04}s`}} onClick={()=>openRecipe(r.id)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <span style={{fontSize:28}}>{r.emoji}</span>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                    <span style={{fontSize:9,fontWeight:800,color:boxColor,background:`${boxColor}18`,padding:"2px 8px",borderRadius:99,letterSpacing:".06em",textTransform:"uppercase"}}>{bxLabels[r.boxKey]}</span>
                    <span style={{fontSize:9,fontWeight:700,color:DIFF_COLOR[r.difficulty],background:DIFF_BG[r.difficulty],padding:"2px 8px",borderRadius:99}}>{r.difficulty}</span>
                  </div>
                </div>
                <div style={{fontWeight:700,fontSize:14,marginBottom:2,lineHeight:1.3}}>{rm.name||r.name}</div>
                <div style={{fontSize:11,fontWeight:600,color:"#A8A29E",marginBottom:7}}>{cuis?.emoji} {getCuisineName(lang,cuis?.key)}</div>
                <div style={{fontSize:12,color:"#78716C",lineHeight:1.5,marginBottom:12}}>{rm.desc||r.desc}</div>
                <div style={{display:"flex",gap:10,alignItems:"center",borderTop:"1px solid #F5F2EE",paddingTop:8}}>
                  <span style={{fontSize:11,color:"#A8A29E"}}>⏱ {r.time}</span>
                  <span style={{fontSize:11,color:"#A8A29E"}}>👤 {r.servings}</span>
                  <span style={{marginLeft:"auto",fontSize:11,color:"#D97950",fontWeight:700}}>Cook →</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
