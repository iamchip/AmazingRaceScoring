import { useState } from "react";
const SEASONS = {
  1: { name: "Season 1", year: 2001, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Rob & Brennan" }, { id: 2, nickname: "Frank & Margarita" },
    { id: 3, nickname: "Joe & Bill (Team Guido)" }, { id: 4, nickname: "Kevin & Drew" },
    { id: 5, nickname: "Nancy & Emily" }, { id: 6, nickname: "Lenny & Karyn" },
    { id: 7, nickname: "Paul & Amie" }, { id: 8, nickname: "Kim & Leslie" },
    { id: 9, nickname: "Dave & Margaretta" }, { id: 10, nickname: "Pat & Brenda" },
    { id: 11, nickname: "Matt & Ana" },
  ]},
  2: { name: "Season 2", year: 2002, finaleCity: "San Francisco", teams: [
    { id: 1, nickname: "Chris & Alex" }, { id: 2, nickname: "Tara & Wil" },
    { id: 3, nickname: "Blake & Paige" }, { id: 4, nickname: "Oswald & Danny" },
    { id: 5, nickname: "Gary & Dave" }, { id: 6, nickname: "Mary & Peach" },
    { id: 7, nickname: "Cyndi & Russell" }, { id: 8, nickname: "Shola & Doyin" },
    { id: 9, nickname: "Peggy & Claire" }, { id: 10, nickname: "Hope & Norm" },
    { id: 11, nickname: "Deidre & Hillary" },
  ]},
  3: { name: "Season 3", year: 2002, finaleCity: "Seattle", teams: [
    { id: 1, nickname: "Flo & Zach" }, { id: 2, nickname: "Teri & Ian" },
    { id: 3, nickname: "Ken & Gerard" }, { id: 4, nickname: "Derek & Drew" },
    { id: 5, nickname: "John Vito & Jill" }, { id: 6, nickname: "Andre & Damon" },
    { id: 7, nickname: "Aaron & Arianne" }, { id: 8, nickname: "Michael & Kathy" },
    { id: 9, nickname: "Heather & Eve" }, { id: 10, nickname: "Dennis & Andrew" },
    { id: 11, nickname: "Tramel & Talicia" }, { id: 12, nickname: "Gina & Sylvia" },
  ]},
  4: { name: "Season 4", year: 2003, finaleCity: "Hamilton, Bermuda", teams: [
    { id: 1, nickname: "Reichen & Chip" }, { id: 2, nickname: "Jon & Kelly" },
    { id: 3, nickname: "David & Jeff" }, { id: 4, nickname: "Jon & Al" },
    { id: 5, nickname: "Millie & Chuck" }, { id: 6, nickname: "Tian & Jaree" },
    { id: 7, nickname: "Monica & Sheree" }, { id: 8, nickname: "Steve & Dave" },
    { id: 9, nickname: "Steve & Josh" }, { id: 10, nickname: "Russell & Cindy" },
    { id: 11, nickname: "Amanda & Chris" }, { id: 12, nickname: "Debra & Steve" },
  ]},
  5: { name: "Season 5", year: 2004, finaleCity: "Dallas", teams: [
    { id: 1, nickname: "Chip & Kim" }, { id: 2, nickname: "Colin & Christie" },
    { id: 3, nickname: "Brandon & Nicole" }, { id: 4, nickname: "Charla & Mirna" },
    { id: 5, nickname: "Kami & Karli" }, { id: 6, nickname: "Linda & Karen" },
    { id: 7, nickname: "Marshall & Lance" }, { id: 8, nickname: "Bob & Joyce" },
    { id: 9, nickname: "Jim & Marsha" }, { id: 10, nickname: "Alison & Donny" },
    { id: 11, nickname: "Dennis & Erika" },
  ]},
  6: { name: "Season 6", year: 2004, finaleCity: "Chicago", teams: [
    { id: 1, nickname: "Freddy & Kendra" }, { id: 2, nickname: "Kris & Jon" },
    { id: 3, nickname: "Adam & Rebecca" }, { id: 4, nickname: "Hayden & Aaron" },
    { id: 5, nickname: "Lori & Bolo" }, { id: 6, nickname: "Jonathan & Victoria" },
    { id: 7, nickname: "Gus & Hera" }, { id: 8, nickname: "Don & Mary Jean" },
    { id: 9, nickname: "Lena & Kristy" }, { id: 10, nickname: "Meredith & Maria" },
    { id: 11, nickname: "Avi & Joe" },
  ]},
  7: { name: "Season 7", year: 2005, finaleCity: "San Juan, Puerto Rico", teams: [
    { id: 1, nickname: "Uchenna & Joyce" }, { id: 2, nickname: "Rob & Amber" },
    { id: 3, nickname: "Ron & Kelly" }, { id: 4, nickname: "Meredith & Gretchen" },
    { id: 5, nickname: "Brian & Greg" }, { id: 6, nickname: "Lynn & Alex" },
    { id: 7, nickname: "Ray & Deana" }, { id: 8, nickname: "Susan & Patrick" },
    { id: 9, nickname: "Debbie & Bianca" }, { id: 10, nickname: "Megan & Heidi" },
    { id: 11, nickname: "Ryan & Chuck" },
  ]},
  8: { name: "Season 8 (Family Edition)", year: 2005, finaleCity: "Montreal", teams: [
    { id: 1, nickname: "Linz Family" }, { id: 2, nickname: "Bransen Family" },
    { id: 3, nickname: "Weaver Family" }, { id: 4, nickname: "Gaghan Family" },
    { id: 5, nickname: "Paolo Family" }, { id: 6, nickname: "Godlewski Family" },
    { id: 7, nickname: "Schroeder Family" }, { id: 8, nickname: "Rogers Family" },
    { id: 9, nickname: "Aiello Family" }, { id: 10, nickname: "Black Family" },
  ]},
  9: { name: "Season 9", year: 2006, finaleCity: "Denver", teams: [
    { id: 1, nickname: "B.J. & Tyler" }, { id: 2, nickname: "Eric & Jeremy" },
    { id: 3, nickname: "Ray & Yolanda" }, { id: 4, nickname: "Joseph & Monica" },
    { id: 5, nickname: "Fran & Barry" }, { id: 6, nickname: "Lake & Michelle" },
    { id: 7, nickname: "Dave & Lori" }, { id: 8, nickname: "Wanda & Desiree" },
    { id: 9, nickname: "Dani & Danielle" }, { id: 10, nickname: "Lisa & Joni" },
    { id: 11, nickname: "John & Scott" },
  ]},
  10: { name: "Season 10", year: 2006, finaleCity: "Paris", teams: [
    { id: 1, nickname: "Tyler & James" }, { id: 2, nickname: "Rob & Kimberly" },
    { id: 3, nickname: "Dustin & Kandice" }, { id: 4, nickname: "Lyn & Karlyn" },
    { id: 5, nickname: "Erwin & Godwin" }, { id: 6, nickname: "David & Mary" },
    { id: 7, nickname: "Peter & Sarah" }, { id: 8, nickname: "Tom & Terry" },
    { id: 9, nickname: "Duke & Lauren" }, { id: 10, nickname: "Kellie & Jamie" },
    { id: 11, nickname: "Vipul & Arti" }, { id: 12, nickname: "Bilal & Sa'eed" },
  ]},
  11: { name: "Season 11 (All-Stars)", year: 2007, finaleCity: "Maui, Hawaii", teams: [
    { id: 1, nickname: "Eric & Danielle" }, { id: 2, nickname: "Dustin & Kandice" },
    { id: 3, nickname: "Charla & Mirna" }, { id: 4, nickname: "Oswald & Danny" },
    { id: 5, nickname: "Uchenna & Joyce" }, { id: 6, nickname: "Joe & Bill (Guidos)" },
    { id: 7, nickname: "Rob & Amber" }, { id: 8, nickname: "Kevin & Drew" },
    { id: 9, nickname: "David & Mary" }, { id: 10, nickname: "Teri & Ian" },
    { id: 11, nickname: "John Vito & Jill" },
  ]},
  12: { name: "Season 12", year: 2007, finaleCity: "Anchorage", teams: [
    { id: 1, nickname: "T.K. & Rachel" }, { id: 2, nickname: "Ron & Christina" },
    { id: 3, nickname: "Nicolas & Donald" }, { id: 4, nickname: "Nathan & Jennifer" },
    { id: 5, nickname: "Azaria & Hendekea" }, { id: 6, nickname: "Kynt & Vyxsin" },
    { id: 7, nickname: "Shana & Jennifer" }, { id: 8, nickname: "Lorena & Jason" },
    { id: 9, nickname: "Marianna & Julia" }, { id: 10, nickname: "Kate & Pat" },
    { id: 11, nickname: "Ari & Staella" },
  ]},
  13: { name: "Season 13", year: 2008, finaleCity: "Portland, Oregon", teams: [
    { id: 1, nickname: "Nick & Starr" }, { id: 2, nickname: "Ken & Tina" },
    { id: 3, nickname: "Dallas & Toni" }, { id: 4, nickname: "Andrew & Dan" },
    { id: 5, nickname: "Terence & Sarah" }, { id: 6, nickname: "Kelly & Christy" },
    { id: 7, nickname: "Aja & Ty" }, { id: 8, nickname: "Marisa & Brooke" },
    { id: 9, nickname: "Mark & Bill" }, { id: 10, nickname: "Anthony & Stephanie" },
    { id: 11, nickname: "Anita & Arthur" },
  ]},
  14: { name: "Season 14", year: 2009, finaleCity: "San Francisco", teams: [
    { id: 1, nickname: "Tammy & Victor" }, { id: 2, nickname: "Jaime & Cara" },
    { id: 3, nickname: "Margie & Luke" }, { id: 4, nickname: "Kisha & Jen" },
    { id: 5, nickname: "Mel & Mike" }, { id: 6, nickname: "Mark & Michael" },
    { id: 7, nickname: "Amanda & Kris" }, { id: 8, nickname: "Christie & Jodi" },
    { id: 9, nickname: "Brad & Victoria" }, { id: 10, nickname: "Steve & Linda" },
    { id: 11, nickname: "Preston & Jennifer" },
  ]},
  15: { name: "Season 15", year: 2009, finaleCity: "Las Vegas", teams: [
    { id: 1, nickname: "Meghan & Cheyne" }, { id: 2, nickname: "Brian & Ericka" },
    { id: 3, nickname: "Sam & Dan" }, { id: 4, nickname: "Flight Time & Big Easy" },
    { id: 5, nickname: "Gary & Matt" }, { id: 6, nickname: "Mika & Canaan" },
    { id: 7, nickname: "Maria & Tiffany" }, { id: 8, nickname: "Lance & Keri" },
    { id: 9, nickname: "Zev & Justin" }, { id: 10, nickname: "Ron & Marcy" },
    { id: 11, nickname: "Eric & Lisa" }, { id: 12, nickname: "Garrett & Jessica" },
  ]},
  16: { name: "Season 16", year: 2010, finaleCity: "San Francisco", teams: [
    { id: 1, nickname: "Jet & Cord" }, { id: 2, nickname: "Dan & Jordan" },
    { id: 3, nickname: "Brent & Caite" }, { id: 4, nickname: "Carol & Brandy" },
    { id: 5, nickname: "Louie & Michael" }, { id: 6, nickname: "Steve & Allie" },
    { id: 7, nickname: "Jeff & Jordan" }, { id: 8, nickname: "Joe & Heidi" },
    { id: 9, nickname: "Monique & Shawne" }, { id: 10, nickname: "Jody & Shannon" },
    { id: 11, nickname: "Dana & Adrian" },
  ]},
  17: { name: "Season 17", year: 2010, finaleCity: "Los Angeles", teams: [
    { id: 1, nickname: "Nat & Kat" }, { id: 2, nickname: "Jill & Thomas" },
    { id: 3, nickname: "Brook & Claire" }, { id: 4, nickname: "Nick & Vicki" },
    { id: 5, nickname: "Chad & Stephanie" }, { id: 6, nickname: "Gary & Mallory" },
    { id: 7, nickname: "Kevin & Michael" }, { id: 8, nickname: "Katie & Rachel" },
    { id: 9, nickname: "Connor & Jonathan" }, { id: 10, nickname: "Andie & Jenna" },
    { id: 11, nickname: "Ron & Tony" },
  ]},
  18: { name: "Season 18 (Unfinished Business)", year: 2011, finaleCity: "Palm Springs", teams: [
    { id: 1, nickname: "Gary & Mallory" }, { id: 2, nickname: "Kisha & Jen" },
    { id: 3, nickname: "Zev & Justin" }, { id: 4, nickname: "Flight Time & Big Easy" },
    { id: 5, nickname: "Ron & Christina" }, { id: 6, nickname: "Jet & Cord" },
    { id: 7, nickname: "Kynt & Vyxsin" }, { id: 8, nickname: "Margie & Luke" },
    { id: 9, nickname: "Mel & Mike" }, { id: 10, nickname: "Jaime & Cara" },
    { id: 11, nickname: "Amanda & Kris" },
  ]},
  19: { name: "Season 19", year: 2011, finaleCity: "Atlanta", teams: [
    { id: 1, nickname: "Ernie & Cindy" }, { id: 2, nickname: "Andy & Tommy" },
    { id: 3, nickname: "Amani & Marcus" }, { id: 4, nickname: "Jeremy & Sandy" },
    { id: 5, nickname: "Laurence & Zac" }, { id: 6, nickname: "Bill & Cathi" },
    { id: 7, nickname: "Justin & Jennifer" }, { id: 8, nickname: "Kaylani & Lisa" },
    { id: 9, nickname: "Liz & Marie" }, { id: 10, nickname: "Ethan & Jenna" },
    { id: 11, nickname: "Ron & Bill" },
  ]},
  20: { name: "Season 20", year: 2012, finaleCity: "Oahu, Hawaii", teams: [
    { id: 1, nickname: "Dave & Rachel" }, { id: 2, nickname: "Art & J.J." },
    { id: 3, nickname: "Brendon & Rachel" }, { id: 4, nickname: "Mark & Bopper" },
    { id: 5, nickname: "Vanessa & Ralph" }, { id: 6, nickname: "Kerri & Stacy" },
    { id: 7, nickname: "Elliot & Andrew" }, { id: 8, nickname: "Nary & Jamie" },
    { id: 9, nickname: "Joey & Danny" }, { id: 10, nickname: "Dave & Cherie" },
    { id: 11, nickname: "Misa & Maiya" },
  ]},
  21: { name: "Season 21", year: 2012, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Josh & Brent" }, { id: 2, nickname: "Trey & Lexi" },
    { id: 3, nickname: "James & Abba" }, { id: 4, nickname: "Jaymes & James" },
    { id: 5, nickname: "Natalie & Nadiya" }, { id: 6, nickname: "Rob & Kelley" },
    { id: 7, nickname: "Gary & Will" }, { id: 8, nickname: "Abbie & Ryan" },
    { id: 9, nickname: "Amy & Daniel" }, { id: 10, nickname: "Caitlin & Brittany" },
    { id: 11, nickname: "Chaitali & Dheepan" },
  ]},
  22: { name: "Season 22", year: 2013, finaleCity: "Washington D.C.", teams: [
    { id: 1, nickname: "Max & Katie" }, { id: 2, nickname: "Bates & Anthony" },
    { id: 3, nickname: "Mona & Beth" }, { id: 4, nickname: "Caroline & Jennifer" },
    { id: 5, nickname: "Joey & Meghan" }, { id: 6, nickname: "Pam & Winnie" },
    { id: 7, nickname: "Chuck & Wynona" }, { id: 8, nickname: "Dave & Connor" },
    { id: 9, nickname: "Jessica & John" }, { id: 10, nickname: "Idries & Jamil" },
    { id: 11, nickname: "Matthew & Daniel" },
  ]},
  23: { name: "Season 23", year: 2013, finaleCity: "Las Vegas", teams: [
    { id: 1, nickname: "Jason & Amy" }, { id: 2, nickname: "Tim & Marie" },
    { id: 3, nickname: "Leo & Jamal" }, { id: 4, nickname: "Nicole & Travis" },
    { id: 5, nickname: "Ally & Ashley" }, { id: 6, nickname: "Rowan & Shane" },
    { id: 7, nickname: "Nicky & Kim" }, { id: 8, nickname: "Chester & Ephraim" },
    { id: 9, nickname: "Tim & Danny" }, { id: 10, nickname: "Brandon & Adam" },
    { id: 11, nickname: "Hoskote & Naina" },
  ]},
  24: { name: "Season 24 (All-Stars)", year: 2014, finaleCity: "Las Vegas", teams: [
    { id: 1, nickname: "Dave & Connor" }, { id: 2, nickname: "Brendon & Rachel" },
    { id: 3, nickname: "Flight Time & Big Easy" }, { id: 4, nickname: "Jet & Cord" },
    { id: 5, nickname: "Caroline & Jennifer" }, { id: 6, nickname: "Leo & Jamal" },
    { id: 7, nickname: "Margie & Luke" }, { id: 8, nickname: "Mark & Joey" },
    { id: 9, nickname: "John & Jessica" }, { id: 10, nickname: "Mallory & Bopper" },
    { id: 11, nickname: "Natalie & Nadiya" },
  ]},
  25: { name: "Season 25", year: 2014, finaleCity: "Los Angeles", teams: [
    { id: 1, nickname: "Amy & Maya" }, { id: 2, nickname: "Bethany & Adam" },
    { id: 3, nickname: "Misti & Jim" }, { id: 4, nickname: "Kym & Alli" },
    { id: 5, nickname: "Brooke & Robbie" }, { id: 6, nickname: "Tim & Te Jay" },
    { id: 7, nickname: "Shelley & Nici" }, { id: 8, nickname: "Lisa & Michelle" },
    { id: 9, nickname: "Keith & Whitney" }, { id: 10, nickname: "Dennis & Isabelle" },
    { id: 11, nickname: "Michael & Scott" },
  ]},
  26: { name: "Season 26", year: 2015, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Mike & Rochelle" }, { id: 2, nickname: "Tyler & Laura" },
    { id: 3, nickname: "Hayley & Blair" }, { id: 4, nickname: "Jelani & Jenny" },
    { id: 5, nickname: "Bergen & Kurt" }, { id: 6, nickname: "Jeff & Jackie" },
    { id: 7, nickname: "Matt & Ashley" }, { id: 8, nickname: "Harley & Jonathan" },
    { id: 9, nickname: "Aly & Steve" }, { id: 10, nickname: "Laura & Tyler" },
    { id: 11, nickname: "CJ & Lebya" },
  ]},
  27: { name: "Season 27", year: 2015, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Justin & Diana" }, { id: 2, nickname: "Tiffany & Krista" },
    { id: 3, nickname: "Logan & Chris" }, { id: 4, nickname: "Alex & Adam" },
    { id: 5, nickname: "Denise & James Earl" }, { id: 6, nickname: "Ernest & Jin" },
    { id: 7, nickname: "Kelsey & Joey" }, { id: 8, nickname: "Jazmine & Danielle" },
    { id: 9, nickname: "Cindy & Rick" }, { id: 10, nickname: "Phil & Diana (2)" },
    { id: 11, nickname: "Tanner & Josh" },
  ]},
  28: { name: "Season 28", year: 2016, finaleCity: "Los Angeles", teams: [
    { id: 1, nickname: "Tyler & Korey" }, { id: 2, nickname: "Burnie & Ashley" },
    { id: 3, nickname: "Dana & Matt" }, { id: 4, nickname: "Zach & Rachel" },
    { id: 5, nickname: "Sheri & Cole" }, { id: 6, nickname: "Scott & Blair" },
    { id: 7, nickname: "Brodie & Kurt" }, { id: 8, nickname: "Erin & Joslyn" },
    { id: 9, nickname: "Marty & Hagan" }, { id: 10, nickname: "Matt & Redmond" },
    { id: 11, nickname: "Darius & Cameron" },
  ]},
  29: { name: "Season 29", year: 2017, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Tara & Joey" }, { id: 2, nickname: "Brooke & Scott" },
    { id: 3, nickname: "London & Logan" }, { id: 4, nickname: "Matt & Redmond" },
    { id: 5, nickname: "Seth & Olive" }, { id: 6, nickname: "Liz & Michael" },
    { id: 7, nickname: "Ashton & Vanck" }, { id: 8, nickname: "Floyd & Becca" },
    { id: 9, nickname: "Jessie & Francesca" }, { id: 10, nickname: "Mike & Deployed" },
    { id: 11, nickname: "Shamir & Sara" },
  ]},
  30: { name: "Season 30", year: 2018, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Cody & Jessica" }, { id: 2, nickname: "Henry & Evan" },
    { id: 3, nickname: "Kristi & Jen" }, { id: 4, nickname: "Trevor & Chris" },
    { id: 5, nickname: "Alex & Conor" }, { id: 6, nickname: "Lucas & Brittany" },
    { id: 7, nickname: "Wayne & Dwight" }, { id: 8, nickname: "Cedric & Shawn" },
    { id: 9, nickname: "Eric & Daniel" }, { id: 10, nickname: "Jody & Chloe" },
    { id: 11, nickname: "April & Sarah" },
  ]},
  31: { name: "Season 31 (Reality Showdown)", year: 2019, finaleCity: "New York City", teams: [
    { id: 1, nickname: "Colin & Christie" }, { id: 2, nickname: "Leo & Jamal" },
    { id: 3, nickname: "Tyler & Korey" }, { id: 4, nickname: "Rachel & Elissa" },
    { id: 5, nickname: "Nicole & Victor" }, { id: 6, nickname: "Becca & Floyd" },
    { id: 7, nickname: "Janelle & Britney" }, { id: 8, nickname: "Chris & Bret" },
    { id: 9, nickname: "Corrinne & Eliza" }, { id: 10, nickname: "Rupert & Laura" },
    { id: 11, nickname: "Corinne & Eliza (2)" },
  ]},
  32: { name: "Season 32", year: 2020, finaleCity: "New Orleans", teams: [
    { id: 1, nickname: "DeAngelo & Gary" }, { id: 2, nickname: "Will & James" },
    { id: 3, nickname: "Hung & Chee" }, { id: 4, nickname: "Kaylynn & Haley" },
    { id: 5, nickname: "Michelle & Victoria" }, { id: 6, nickname: "Leo & Alana" },
    { id: 7, nickname: "Aparna & Eswar" }, { id: 8, nickname: "Nathan & Cody" },
    { id: 9, nickname: "Jerry & Frank" }, { id: 10, nickname: "Kellie & LaVonne" },
    { id: 11, nickname: "Chac & Arun" },
  ]},
  33: { name: "Season 33", year: 2021, finaleCity: "Atlanta", teams: [
    { id: 1, nickname: "Ryan & Dusty" }, { id: 2, nickname: "Arun & Natalia" },
    { id: 3, nickname: "Caro & Ray" }, { id: 4, nickname: "Kim & Penn" },
    { id: 5, nickname: "Lulu & Lala" }, { id: 6, nickname: "Akbar & Sheri" },
    { id: 7, nickname: "Raechel & Cayla" }, { id: 8, nickname: "Cody & Sam" },
    { id: 9, nickname: "Taylor & Isaiah" }, { id: 10, nickname: "Michelle & Lulu" },
    { id: 11, nickname: "Dana & Amanda" },
  ]},
  34: { name: "Season 34", year: 2022, finaleCity: "Las Vegas", teams: [
    { id: 1, nickname: "Quinton & Mattie" }, { id: 2, nickname: "Luis & Michelle" },
    { id: 3, nickname: "Emily & Molly" }, { id: 4, nickname: "Derek & Claire" },
    { id: 5, nickname: "Abby & Will" }, { id: 6, nickname: "Marcus & Michael" },
    { id: 7, nickname: "Aubrey & David" }, { id: 8, nickname: "Tim & Rex" },
    { id: 9, nickname: "Glenda & Lumumba" }, { id: 10, nickname: "Linton & Sharik" },
    { id: 11, nickname: "Nadia & Evan" }, { id: 12, nickname: "Ethan & Kona" },
  ]},
  35: { name: "Season 35", year: 2023, finaleCity: "Los Angeles", teams: [
    { id: 1, nickname: "Greg & John" }, { id: 2, nickname: "Robbin & Chelsea" },
    { id: 3, nickname: "Liam & Yerlan" }, { id: 4, nickname: "Steve & Anna Leigh" },
    { id: 5, nickname: "Andrea & Malaina" }, { id: 6, nickname: "Joel & Garrett" },
    { id: 7, nickname: "Todd & Ashlie" }, { id: 8, nickname: "Joe & Ian" },
    { id: 9, nickname: "Elizabeth & Iliana" }, { id: 10, nickname: "Corey & Dom" },
    { id: 11, nickname: "Will & Layla" }, { id: 12, nickname: "Morgan & Lena" },
    { id: 13, nickname: "Ollie & Marisol" },
  ]},
  36: { name: "Season 36", year: 2024, finaleCity: "Philadelphia", teams: [
    { id: 1, nickname: "Ricky & Cesar" }, { id: 2, nickname: "Rod & Leticia" },
    { id: 3, nickname: "Juan & Shane" }, { id: 4, nickname: "Michelle & Sean" },
    { id: 5, nickname: "Sunny & Bizzy" }, { id: 6, nickname: "Derek & Shelisa" },
    { id: 7, nickname: "Todd & Ashlie" }, { id: 8, nickname: "Chris & Yvette" },
    { id: 9, nickname: "Angie & Danny" }, { id: 10, nickname: "Lena & Ariana" },
    { id: 11, nickname: "Jocelyn & Victor" }, { id: 12, nickname: "Maya & Rohan" },
    { id: 13, nickname: "Anthony & Bailey" },
  ]},
};

const PLACE_POINTS = { 1: 5, 2: 3, 3: 1 };

// ─── SUPABASE CLIENT ────────────────────────────────────────────────────────
// Replace these two values with your own from the Supabase dashboard
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

async function sb(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      "Prefer": options.prefer || "return=representation",
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const db = {
  // Players
  getPlayers: () => sb("players?order=name"),
  upsertPlayer: (name) => sb("players", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=representation",
    body: JSON.stringify({ name }),
  }),
  deletePlayer: (id) => sb(`players?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" }),

  // Saved seasons
  getSeasons: () => sb("saved_seasons?order=saved_at.desc&select=*,season_results(*)"),
  saveSeason: (data) => sb("saved_seasons", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  updateSeason: (id, data) => sb(`saved_seasons?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  }),
  deleteSeason: (id) => sb(`saved_seasons?id=eq.${id}`, { method: "DELETE", prefer: "return=minimal" }),

  // Season results
  saveResults: (results) => sb("season_results", {
    method: "POST",
    body: JSON.stringify(results),
  }),
  deleteResults: (seasonId) => sb(`season_results?saved_season_id=eq.${seasonId}`, {
    method: "DELETE", prefer: "return=minimal",
  }),
};

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────
function ScoreBadge({ points, small }) {
  const c = points > 0 ? "#4ade80" : points < 0 ? "#f87171" : "#94a3b8";
  return (
    <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",
      background:`${c}22`,color:c,border:`1px solid ${c}55`,borderRadius:8,
      padding:small?"2px 7px":"3px 10px",fontSize:small?12:14,fontWeight:700,
      fontFamily:"monospace",minWidth:small?32:40}}>
      {points>0?`+${points}`:points}
    </span>
  );
}

function Sheet({ title, onClose, children }) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:100,
      display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#1a1f2e",borderRadius:"20px 20px 0 0",
        width:"100%",maxWidth:480,padding:"20px 20px 44px",maxHeight:"88vh",overflowY:"auto",
        boxShadow:"0 -8px 40px rgba(0,0,0,0.5)"}}>
        <div style={{width:40,height:4,background:"#334155",borderRadius:2,margin:"0 auto 18px"}}/>
        <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,color:"#f1c40f",marginBottom:16,letterSpacing:1}}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Spinner() {
  return <div style={{textAlign:"center",padding:"40px 0",color:"#64748b",fontSize:14}}>Loading...</div>;
}

const css = {
  app:{background:"#0f1420",minHeight:"100vh",color:"#e2e8f0",fontFamily:"'DM Sans',sans-serif",maxWidth:480,margin:"0 auto"},
  hdr:{background:"linear-gradient(135deg,#1a1f2e,#0f1420)",borderBottom:"1px solid #1e2a3a",padding:"14px 18px 10px",
    display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:50},
  ttl:{fontFamily:"'Bebas Neue',sans-serif",fontSize:24,color:"#f1c40f",letterSpacing:2,lineHeight:1},
  sub:{fontSize:11,color:"#64748b",letterSpacing:1,textTransform:"uppercase"},
  card:{background:"#1a1f2e",borderRadius:16,padding:16,border:"1px solid #1e2a3a",marginBottom:12},
  btn:(v="p")=>({background:v==="p"?"#f1c40f":v==="d"?"#ef4444":v==="g"?"transparent":"#1e2a3a",
    color:v==="p"?"#0f1420":v==="d"?"#fff":"#e2e8f0",border:v==="g"?"1px solid #334155":"none",
    borderRadius:12,padding:"11px 18px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%",
    textAlign:"center",fontFamily:"'DM Sans',sans-serif"}),
  inp:{background:"#0f1420",border:"1px solid #334155",borderRadius:10,color:"#e2e8f0",
    padding:"10px 14px",fontSize:15,width:"100%",fontFamily:"'DM Sans',sans-serif",boxSizing:"border-box"},
  tabs:{display:"flex",gap:4,background:"#0f1420",borderRadius:12,padding:4},
  tab:(a)=>({flex:1,padding:"8px",borderRadius:9,border:"none",cursor:"pointer",
    background:a?"#1e2a3a":"transparent",color:a?"#f1c40f":"#64748b",
    fontWeight:a?700:500,fontSize:14,fontFamily:"'DM Sans',sans-serif"}),
};

// ─── EPISODE MODAL ──────────────────────────────────────────────────────────
function EpisodeModal({ player, teams, onSave, onClose }) {
  const nextEp = player.events.filter(e=>e.type==="episode").length + 1;
  const [ep, setEp] = useState(nextEp);
  const [p1, setP1] = useState(""); const [p2, setP2] = useState(""); const [p3, setP3] = useState("");
  const [elim, setElim] = useState([]);
  const myTeams = [player.pickedTeam, player.blindTeam].filter(Boolean);
  const getTeam = tid => teams.find(t=>t.id===tid);
  const toggleElim = tid => setElim(e=>e.includes(tid)?e.filter(t=>t!==tid):[...e,tid]);
  return (
    <Sheet title={`EP ${ep} — ${player.name}`} onClose={onClose}>
      <div style={{fontSize:11,color:"#64748b",fontWeight:700,letterSpacing:1,marginBottom:5}}>EPISODE #</div>
      <input type="number" value={ep} onChange={e=>setEp(Number(e.target.value))} style={{...css.inp,marginBottom:14}}/>
      {[["p1","🥇 1ST (+5)",p1,setP1],["p2","🥈 2ND (+3)",p2,setP2],["p3","🥉 3RD (+1)",p3,setP3]].map(([key,label,val,set])=>(
        <div key={key} style={{marginBottom:12}}>
          <div style={{fontSize:11,color:key==="p1"?"#f1c40f":key==="p2"?"#94a3b8":"#b45309",fontWeight:700,letterSpacing:1,marginBottom:5}}>{label}</div>
          <select value={val} onChange={e=>set(Number(e.target.value)||"")} style={{...css.inp,fontSize:14}}>
            <option value="">— Not your team —</option>
            {myTeams.map(tid=><option key={tid} value={tid}>{getTeam(tid)?.nickname}</option>)}
          </select>
        </div>
      ))}
      <div style={{fontSize:11,color:"#ef4444",fontWeight:700,letterSpacing:1,marginBottom:8}}>💀 ELIMINATED THIS EPISODE</div>
      {myTeams.map(tid=>(
        <div key={tid} onClick={()=>toggleElim(tid)} style={{
          background:elim.includes(tid)?"#ef444422":"#0f1420",
          border:`1px solid ${elim.includes(tid)?"#ef4444":"#334155"}`,
          borderRadius:10,padding:"10px 14px",marginBottom:8,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <span style={{fontSize:14}}>{getTeam(tid)?.nickname}</span>
          <span style={{fontSize:18}}>{elim.includes(tid)?"✓":"○"}</span>
        </div>
      ))}
      <button onClick={()=>onSave({episode:ep,place1:p1,place2:p2,place3:p3,eliminated:elim})}
        style={{...css.btn("p"),marginTop:8}}>✓ Save Episode</button>
    </Sheet>
  );
}

// ─── PENALTY MODAL ──────────────────────────────────────────────────────────
function PenaltyModal({ onSave, onClose }) {
  const [mins, setMins] = useState(15);
  const preview = Math.max(-4,-Math.floor(mins/15));
  return (
    <Sheet title="TIME PENALTY" onClose={onClose}>
      <div style={{color:"#94a3b8",marginBottom:8,fontSize:14}}>Penalty duration (minutes):</div>
      <input type="number" value={mins} onChange={e=>setMins(Number(e.target.value))}
        style={{...css.inp,marginBottom:12}} min={0} step={15}/>
      <div style={{...css.card,display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span style={{color:"#64748b",fontSize:14}}>Score impact</span>
        <ScoreBadge points={preview}/>
      </div>
      <button onClick={()=>onSave(mins)} style={css.btn("p")}>Apply Penalty</button>
    </Sheet>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [selSeason, setSelSeason] = useState(null);

  // In-season state (not persisted to DB until "Save Season")
  const [players, setPlayers] = useState([]);   // [{id, name, blindTeam, pickedTeam, events, cityGuess}]
  const [newName, setNewName] = useState("");
  const [modal, setModal] = useState(null);
  const [tab, setTab] = useState("scores");
  const [search, setSearch] = useState("");

  // All-time DB state
  const [savedSeasons, setSavedSeasons] = useState([]);
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState(null);
  const [saving, setSaving] = useState(false);

  // Edit state for all-time screen
  const [editingSeason, setEditingSeason] = useState(null); // season id being edited

  const season = SEASONS[selSeason];
  const teams = season?.teams || [];
  const calcScore = p => p.events.reduce((s,e)=>s+e.points,0);
  const sorted = [...players].sort((a,b)=>calcScore(b)-calcScore(a));
  const seasonNums = Object.keys(SEASONS).map(Number).reverse();
  const filteredSeasons = search
    ? seasonNums.filter(n=>SEASONS[n].name.toLowerCase().includes(search.toLowerCase())||String(SEASONS[n].year).includes(search))
    : seasonNums;
  const modalPlayer = modal ? players.find(p=>p.id===modal.playerId) : null;

  function updatePlayer(id, fn) { setPlayers(p=>p.map(pl=>pl.id===id?fn(pl):pl)); }
  function getTeam(tid) { return teams.find(t=>t.id===tid); }

  function addPlayer() {
    if (!newName.trim()) return;
    setPlayers(p=>[...p,{id:Date.now(),name:newName.trim(),pickedTeam:null,blindTeam:null,events:[],cityGuess:""}]);
    setNewName("");
  }

  function scoreEpisode(pid, ep) {
    const player = players.find(p=>p.id===pid);
    let pts=0; const breakdown=[];
    const isBlind = tid=>player.blindTeam===tid;
    const mult = tid=>isBlind(tid)?2:1;
    const myTeams=[player.pickedTeam,player.blindTeam].filter(Boolean);
    myTeams.forEach(tid=>{
      if(!ep.eliminated.includes(tid)){
        const p=mult(tid)===2?2:1; pts+=p;
        breakdown.push(`Survived ${getTeam(tid)?.nickname}: +${p}`);
      }
    });
    [1,2,3].forEach(place=>{
      const tid=ep[`place${place}`]; if(!tid||!myTeams.includes(tid)) return;
      const earned=PLACE_POINTS[place]*mult(tid); pts+=earned;
      breakdown.push(`${place}${place===1?"st":place===2?"nd":"rd"} ${getTeam(tid)?.nickname}: +${earned}`);
    });
    updatePlayer(pid,pl=>({...pl,events:[...pl.events,{type:"episode",episode:ep.episode,points:pts,breakdown}]}));
  }

  function applyBuyback(pid, both) {
    const pts=both?-20:-10;
    updatePlayer(pid,pl=>({...pl,events:[...pl.events,{type:"buyback",points:pts,breakdown:[`Buyback: ${pts}pts`]}]}));
  }

  function applyPenalty(pid, mins) {
    const pts=Math.max(-4,-Math.floor(mins/15));
    updatePlayer(pid,pl=>({...pl,events:[...pl.events,{type:"penalty",points:pts,breakdown:[`Penalty ${mins}min: ${pts}pts`]}]}));
  }

  // Load saved seasons from Supabase
  async function loadSavedSeasons() {
    setDbLoading(true);
    setDbError(null);
    try {
      const data = await db.getSeasons();
      setSavedSeasons(data || []);
    } catch(e) {
      setDbError("Could not connect to database. Check your Supabase credentials.");
    } finally {
      setDbLoading(false);
    }
  }

  // Save current season to Supabase
  async function saveSeason() {
    if (players.length === 0) return;
    setSaving(true);
    try {
      const results = sorted.map((pl,i)=>({
        player_name: pl.name,
        score: calcScore(pl),
        finish_position: i+1,
        blind_team: getTeam(pl.blindTeam)?.nickname||null,
        picked_team: getTeam(pl.pickedTeam)?.nickname||null,
        city_guess: pl.cityGuess||null,
      }));
      const inserted = await db.saveSeason({
        season_number: selSeason,
        season_name: season.name,
        season_year: season.year,
        saved_at: new Date().toISOString(),
      });
      const savedSeason = Array.isArray(inserted) ? inserted[0] : inserted;
      if (!savedSeason?.id) throw new Error("No ID returned from saved_seasons insert");
      await db.saveResults(results.map(r=>({...r, saved_season_id: savedSeason.id})));
      alert(`${season.name} saved to All-Time Leaderboard!`);
    } catch(e) {
      alert("Save failed: " + e.message);
    } finally {
      setSaving(false);
    }
  }

  // Delete a saved season
  async function deleteSavedSeason(id) {
    if (!confirm("Delete this season? This cannot be undone.")) return;
    try {
      await db.deleteResults(id);
      await db.deleteSeason(id);
      setSavedSeasons(s=>s.filter(x=>x.id!==id));
    } catch(e) {
      alert("Delete failed: " + e.message);
    }
  }

  // Compute all-time stats from savedSeasons
  function computeStats() {
    const allResults = savedSeasons.flatMap(s=>(s.season_results||[]).map(r=>({...r,seasonName:s.season_name,seasonYear:s.season_year})));
    const names = [...new Set(allResults.map(r=>r.player_name))];
    return names.map(name=>{
      const rows = allResults.filter(r=>r.player_name===name);
      const scores = rows.map(r=>r.score);
      const totalPts = scores.reduce((a,b)=>a+b,0);
      const wins = rows.filter(r=>r.finish_position===1).length;
      const best = Math.max(...scores);
      const bestRow = rows[scores.indexOf(best)];
      const avg = scores.length ? Math.round(totalPts/scores.length) : 0;
      return {name,totalPts,wins,best,bestSeason:bestRow?.seasonName||"—",avg,seasonsPlayed:scores.length};
    }).sort((a,b)=>b.totalPts-a.totalPts);
  }

  const medals = ["🥇","🥈","🥉"];

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen==="home") return (
    <div style={css.app}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
      <div style={{background:"linear-gradient(160deg,#1a1f2e,#0f1420 55%)",minHeight:"100vh",display:"flex",flexDirection:"column",padding:"50px 22px 40px"}}>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:12,color:"#f1c40f",letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>🏁 Amazing Race</div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:48,color:"#fff",lineHeight:1,letterSpacing:2}}>PREDICTION<br/>LEAGUE</div>
          <div style={{color:"#64748b",fontSize:13,marginTop:6}}>All 36 seasons · full team rosters</div>
          <div style={{display:"flex",gap:8,marginTop:14}}>
            <button onClick={()=>setScreen("rules")} style={{...css.btn("g"),flex:1,padding:"9px 12px",fontSize:13}}>📖 Rules</button>
            <button onClick={()=>{setScreen("alltime");loadSavedSeasons();}} style={{...css.btn("g"),flex:1,padding:"9px 12px",fontSize:13}}>🏆 All-Time</button>
          </div>
        </div>
        <div style={{...css.card,flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{fontSize:12,color:"#64748b",fontWeight:600,letterSpacing:1,marginBottom:10}}>SELECT SEASON</div>
          <input placeholder="Search seasons..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{...css.inp,marginBottom:10,fontSize:13}}/>
          <div style={{overflowY:"auto",flex:1}}>
            {filteredSeasons.map(n=>(
              <button key={n} onClick={()=>{setSelSeason(n);setPlayers([]);setScreen("setup");}}
                style={{...css.btn("s"),marginBottom:7,display:"flex",alignItems:"center",justifyContent:"space-between",
                  textAlign:"left",padding:"10px 14px",borderRadius:10}}>
                <span style={{fontWeight:700}}>{SEASONS[n].name}</span>
                <span style={{opacity:0.5,fontSize:12}}>{SEASONS[n].year} · {SEASONS[n].teams.length} teams</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── RULES ─────────────────────────────────────────────────────────────────
  if (screen==="rules") return (
    <div style={css.app}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
      <div style={css.hdr}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#f1c40f",fontSize:22,cursor:"pointer"}}>←</button>
        <div style={css.ttl}>RULES</div>
      </div>
      <div style={{padding:"20px 20px 60px"}}>
        {[
          ["🎯 Picks","Each player gets one blind pair and one picked pair. The blind team must be chosen before Phil says go. The picked pair must be chosen before Episode 3 starts."],
          ["📺 Survival","1pt/episode for picked pair survival. 2pts/episode for blind pair survival."],
          ["🏆 Place Bonuses","1st = 5pts, 2nd = 3pts, 3rd = 1pt per episode. All points DOUBLED for your blind pair."],
          ["💀 Buyback","Both eliminated: −20pts. One eliminated: −10pts. Buyback team counts as picked only — no double points."],
          ["⏱ Penalties","If your team gets a time penalty, so do you. −1pt per 15min. Max −4pts for 45min+."],
          ["🌍 Tiebreaker","Guess the city the finale ends in. Closest in miles wins!"],
        ].map(([t,d])=>(
          <div key={t} style={{...css.card,marginBottom:10}}>
            <div style={{fontWeight:700,color:"#f1c40f",marginBottom:6,fontSize:15}}>{t}</div>
            <div style={{color:"#94a3b8",fontSize:14,lineHeight:1.6}}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── SETUP ─────────────────────────────────────────────────────────────────
  if (screen==="setup") return (
    <div style={css.app}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
      <div style={css.hdr}>
        <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#f1c40f",fontSize:22,cursor:"pointer"}}>←</button>
        <div><div style={css.ttl}>{season?.name}</div><div style={css.sub}>{teams.length} teams · player setup</div></div>
      </div>
      <div style={{padding:"16px 16px 100px"}}>
        <div style={css.card}>
          <div style={{fontSize:12,color:"#64748b",fontWeight:600,letterSpacing:1,marginBottom:10}}>ADD PLAYERS</div>
          <div style={{display:"flex",gap:8}}>
            <input placeholder="Player name..." value={newName} onChange={e=>setNewName(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addPlayer()} style={{...css.inp,flex:1}}/>
            <button onClick={addPlayer} style={{...css.btn("p"),width:"auto",padding:"10px 16px",borderRadius:10}}>+</button>
          </div>
        </div>
        {players.map(pl=>(
          <div key={pl.id} style={css.card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div style={{fontWeight:700,fontSize:16}}>{pl.name}</div>
              <button onClick={()=>setPlayers(p=>p.filter(x=>x.id!==pl.id))}
                style={{background:"none",border:"none",color:"#ef4444",fontSize:18,cursor:"pointer"}}>✕</button>
            </div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:"#f1c40f",fontWeight:700,letterSpacing:1,marginBottom:5}}>🎲 BLIND PAIR <span style={{color:"#475569",fontWeight:400,textTransform:"none",fontSize:10}}>— before Phil says go</span></div>
              <select value={pl.blindTeam||""} onChange={e=>updatePlayer(pl.id,p=>({...p,blindTeam:Number(e.target.value)||null}))}
                style={{...css.inp,fontSize:14}}>
                <option value="">— Select team —</option>
                {[...teams].sort((a,b)=>a.nickname.localeCompare(b.nickname)).map(t=><option key={t.id} value={t.id}>{t.nickname}</option>)}
              </select>
            </div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:"#94a3b8",fontWeight:700,letterSpacing:1,marginBottom:5}}>✋ PICKED PAIR <span style={{color:"#475569",fontWeight:400,textTransform:"none",fontSize:10}}>— before Ep 3</span></div>
              <select value={pl.pickedTeam||""} onChange={e=>updatePlayer(pl.id,p=>({...p,pickedTeam:Number(e.target.value)||null}))}
                style={{...css.inp,fontSize:14}}>
                <option value="">— Select team —</option>
                {[...teams].sort((a,b)=>a.nickname.localeCompare(b.nickname)).map(t=><option key={t.id} value={t.id}>{t.nickname}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:11,color:"#64748b",fontWeight:700,letterSpacing:1,marginBottom:5}}>🌍 FINALE CITY GUESS</div>
              <input placeholder="e.g. Dallas" value={pl.cityGuess}
                onChange={e=>updatePlayer(pl.id,p=>({...p,cityGuess:e.target.value}))}
                style={{...css.inp,fontSize:14}}/>
            </div>
          </div>
        ))}
        {players.length>=1&&(
          <button onClick={()=>setScreen("scoring")} style={{...css.btn("p"),marginTop:4}}>🏁 Start Scoring →</button>
        )}
        <div style={{...css.card,background:"transparent",border:"1px solid #1e2a3a",marginTop:4,padding:"10px 14px"}}>
          <div style={{fontSize:12,color:"#64748b",lineHeight:1.5}}>
            💡 Picked pair can be set any time before Episode 3. You can update team picks from the Picks tab during scoring.
          </div>
        </div>
      </div>
    </div>
  );

  // ── SCORING ───────────────────────────────────────────────────────────────
  if (screen==="scoring") return (
    <div style={css.app}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
      <div style={css.hdr}>
        <button onClick={()=>setScreen("setup")} style={{background:"none",border:"none",color:"#f1c40f",fontSize:22,cursor:"pointer"}}>←</button>
        <div style={{flex:1}}><div style={css.ttl}>{season?.name}</div></div>
        <button onClick={()=>setScreen("rules")} style={{background:"none",border:"none",color:"#64748b",fontSize:18,cursor:"pointer"}}>📖</button>
      </div>
      <div style={{padding:"14px 14px 80px"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
          <div style={{...css.tabs,flex:1}}>
            <button style={css.tab(tab==="scores")} onClick={()=>setTab("scores")}>Leaderboard</button>
            <button style={css.tab(tab==="picks")} onClick={()=>setTab("picks")}>Picks</button>
          </div>
          <button onClick={saveSeason} disabled={saving}
            style={{...css.btn("p"),width:"auto",padding:"8px 14px",fontSize:12,borderRadius:9,whiteSpace:"nowrap",opacity:saving?0.6:1}}>
            {saving?"Saving…":"💾 Save"}
          </button>
        </div>

        {tab==="scores" && sorted.map((pl,i)=>{
          const score=calcScore(pl);
          return (
            <div key={pl.id} style={{...css.card,borderColor:i===0?"#f1c40f44":"#1e2a3a"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                <span style={{fontSize:20}}>{medals[i]||`${i+1}`}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:16}}>{pl.name}</div>
                  <div style={{fontSize:11,color:"#64748b"}}>
                    🎲 {getTeam(pl.blindTeam)?.nickname||"None"} · ✋ {getTeam(pl.pickedTeam)?.nickname||"None"}
                  </div>
                </div>
                <ScoreBadge points={score}/>
              </div>
              {pl.events.length>0&&(
                <div style={{borderTop:"1px solid #1e2a3a",paddingTop:8,marginBottom:10}}>
                  {pl.events.map((ev,j)=>(
                    <div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                      <div style={{fontSize:12,color:"#64748b"}}>{ev.type==="episode"?`Ep ${ev.episode}`:ev.type==="buyback"?"Buyback":"Penalty"}</div>
                      <ScoreBadge points={ev.points} small/>
                    </div>
                  ))}
                </div>
              )}
              <div style={{display:"flex",gap:6}}>
                <button onClick={()=>setModal({type:"episode",playerId:pl.id})} style={{...css.btn("s"),flex:1,padding:"7px",fontSize:12,borderRadius:9}}>+Ep</button>
                <button onClick={()=>setModal({type:"penalty",playerId:pl.id})} style={{...css.btn("s"),flex:1,padding:"7px",fontSize:12,borderRadius:9}}>⏱Pen</button>
                <button onClick={()=>setModal({type:"buyback",playerId:pl.id})} style={{...css.btn("d"),flex:1,padding:"7px",fontSize:12,borderRadius:9}}>💀Buy</button>
              </div>
            </div>
          );
        })}

        {tab==="picks" && players.map(pl=>(
          <div key={pl.id} style={css.card}>
            <div style={{fontWeight:700,fontSize:16,marginBottom:12}}>{pl.name}</div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:"#f1c40f",fontWeight:700,letterSpacing:1,marginBottom:5}}>
                🎲 BLIND PAIR <span style={{color:"#475569",fontWeight:400,textTransform:"none",fontSize:10}}>— before Phil says go</span>
              </div>
              <select value={pl.blindTeam||""} onChange={e=>updatePlayer(pl.id,p=>({...p,blindTeam:Number(e.target.value)||null}))}
                style={{...css.inp,fontSize:14}}>
                <option value="">— Select team —</option>
                {[...teams].sort((a,b)=>a.nickname.localeCompare(b.nickname)).map(t=><option key={t.id} value={t.id}>{t.nickname}</option>)}
              </select>
            </div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:11,color:"#94a3b8",fontWeight:700,letterSpacing:1,marginBottom:5}}>
                ✋ PICKED PAIR <span style={{color:"#475569",fontWeight:400,textTransform:"none",fontSize:10}}>— before Ep 3</span>
              </div>
              <select value={pl.pickedTeam||""} onChange={e=>updatePlayer(pl.id,p=>({...p,pickedTeam:Number(e.target.value)||null}))}
                style={{...css.inp,fontSize:14}}>
                <option value="">— Not yet picked —</option>
                {[...teams].sort((a,b)=>a.nickname.localeCompare(b.nickname)).map(t=><option key={t.id} value={t.id}>{t.nickname}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:11,color:"#64748b",fontWeight:700,letterSpacing:1,marginBottom:5}}>🌍 FINALE CITY GUESS</div>
              <input placeholder="e.g. Dallas" value={pl.cityGuess}
                onChange={e=>updatePlayer(pl.id,p=>({...p,cityGuess:e.target.value}))}
                style={{...css.inp,fontSize:14}}/>
            </div>
          </div>
        ))}
      </div>

      {modal?.type==="episode"&&modalPlayer&&(
        <EpisodeModal player={modalPlayer} teams={teams}
          onSave={ep=>{scoreEpisode(modal.playerId,ep);setModal(null);}}
          onClose={()=>setModal(null)}/>
      )}
      {modal?.type==="penalty"&&modalPlayer&&(
        <PenaltyModal onSave={m=>{applyPenalty(modal.playerId,m);setModal(null);}} onClose={()=>setModal(null)}/>
      )}
      {modal?.type==="buyback"&&modalPlayer&&(()=>{
        const [step, setStep] = useState("how-many"); // "how-many" | "swap"
        const [bothElim, setBothElim] = useState(false);
        const sortedTeams = [...teams].sort((a,b)=>a.nickname.localeCompare(b.nickname));
        return (
          <Sheet title="BUYBACK" onClose={()=>setModal(null)}>
            {step==="how-many"&&(
              <>
                <div style={{color:"#94a3b8",marginBottom:14,fontSize:14}}>How many of your teams were eliminated?</div>
                <button onClick={()=>{applyBuyback(modal.playerId,false);setBothElim(false);setStep("swap");}}
                  style={{...css.btn("d"),marginBottom:10}}>One eliminated — −10pts</button>
                <button onClick={()=>{applyBuyback(modal.playerId,true);setBothElim(true);setStep("swap");}}
                  style={css.btn("d")}>Both eliminated — −20pts</button>
              </>
            )}
            {step==="swap"&&(
              <>
                <div style={{...css.card,background:"#ef444411",borderColor:"#ef444433",marginBottom:14}}>
                  <div style={{fontSize:13,color:"#f87171",fontWeight:600,marginBottom:2}}>Penalty applied ✓</div>
                  <div style={{fontSize:12,color:"#94a3b8"}}>Buyback team counts as your picked pair — no double points.</div>
                </div>
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:11,color:"#f1c40f",fontWeight:700,letterSpacing:1,marginBottom:6}}>
                    🎲 UPDATE BLIND PAIR
                  </div>
                  <select value={modalPlayer.blindTeam||""}
                    onChange={e=>updatePlayer(modal.playerId,p=>({...p,blindTeam:Number(e.target.value)||null}))}
                    style={{...css.inp,fontSize:14}}>
                    <option value="">— No blind team —</option>
                    {sortedTeams.map(t=><option key={t.id} value={t.id}>{t.nickname}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:16}}>
                  <div style={{fontSize:11,color:"#94a3b8",fontWeight:700,letterSpacing:1,marginBottom:6}}>
                    ✋ UPDATE PICKED PAIR
                  </div>
                  <select value={modalPlayer.pickedTeam||""}
                    onChange={e=>updatePlayer(modal.playerId,p=>({...p,pickedTeam:Number(e.target.value)||null}))}
                    style={{...css.inp,fontSize:14}}>
                    <option value="">— No picked team —</option>
                    {sortedTeams.map(t=><option key={t.id} value={t.id}>{t.nickname}</option>)}
                  </select>
                </div>
                <button onClick={()=>setModal(null)} style={css.btn("p")}>✓ Done</button>
              </>
            )}
          </Sheet>
        );
      })()}
    </div>
  );

  // ── ALL-TIME LEADERBOARD ──────────────────────────────────────────────────
  if (screen==="alltime") {
    const stats = computeStats();
    return (
      <div style={css.app}>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet"/>
        <div style={css.hdr}>
          <button onClick={()=>setScreen("home")} style={{background:"none",border:"none",color:"#f1c40f",fontSize:22,cursor:"pointer"}}>←</button>
          <div style={{flex:1}}><div style={css.ttl}>ALL-TIME</div><div style={css.sub}>{savedSeasons.length} seasons saved</div></div>
          <button onClick={loadSavedSeasons} style={{background:"none",border:"none",color:"#64748b",fontSize:18,cursor:"pointer"}}>↻</button>
        </div>
        <div style={{padding:"16px 16px 60px"}}>
          {dbError&&<div style={{...css.card,borderColor:"#ef444466",color:"#f87171",fontSize:13,marginBottom:12}}>{dbError}</div>}
          {dbLoading ? <Spinner/> : (
            <>
              {stats.length===0&&(
                <div style={{...css.card,textAlign:"center",padding:"40px 20px"}}>
                  <div style={{fontSize:32,marginBottom:12}}>📭</div>
                  <div style={{fontWeight:700,marginBottom:6}}>No seasons saved yet</div>
                  <div style={{color:"#64748b",fontSize:14,lineHeight:1.5}}>Score a season and tap 💾 Save to record results here. They'll appear for everyone in the group.</div>
                </div>
              )}

              {/* Player stats */}
              {stats.length>0&&(
                <div style={{marginBottom:20}}>
                  <div style={{fontSize:12,color:"#64748b",fontWeight:600,letterSpacing:1,marginBottom:10}}>PLAYER STANDINGS · sorted by total points</div>
                  {stats.map((s,i)=>(
                    <div key={s.name} style={{...css.card,borderColor:i===0?"#f1c40f44":"#1e2a3a"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                        <span style={{fontSize:22}}>{medals[i]||`${i+1}`}</span>
                        <div style={{flex:1}}>
                          <div style={{fontWeight:700,fontSize:17}}>{s.name}</div>
                          <div style={{fontSize:11,color:"#64748b"}}>{s.seasonsPlayed} season{s.seasonsPlayed!==1?"s":""}</div>
                        </div>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontFamily:"monospace",fontWeight:700,fontSize:22,color:"#f1c40f"}}>{s.totalPts}</div>
                          <div style={{fontSize:10,color:"#64748b",textTransform:"uppercase",letterSpacing:1}}>total pts</div>
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
                        {[["🏆 Wins",s.wins],["📈 Avg/Season",s.avg],["⭐ Best Score",s.best]].map(([label,val])=>(
                          <div key={label} style={{background:"#0f1420",borderRadius:10,padding:"10px 8px",textAlign:"center"}}>
                            <div style={{fontWeight:700,fontSize:16,color:"#e2e8f0"}}>{val}</div>
                            <div style={{fontSize:10,color:"#64748b",marginTop:2}}>{label}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{fontSize:12,color:"#64748b"}}>
                        Best: <span style={{color:"#94a3b8",fontWeight:600}}>{s.bestSeason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Season history */}
              {savedSeasons.length>0&&(
                <div>
                  <div style={{fontSize:12,color:"#64748b",fontWeight:600,letterSpacing:1,marginBottom:10}}>SEASON HISTORY</div>
                  {[...savedSeasons].map((s)=>(
                    <div key={s.id} style={css.card}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                        <div>
                          <div style={{fontWeight:700,fontSize:15}}>{s.season_name}</div>
                          <div style={{fontSize:11,color:"#64748b"}}>{s.season_year}</div>
                        </div>
                        <button onClick={()=>deleteSavedSeason(s.id)}
                          style={{background:"none",border:"none",color:"#ef4444",fontSize:16,cursor:"pointer",padding:"4px 8px"}}>🗑</button>
                      </div>
                      {(s.season_results||[]).sort((a,b)=>a.finish_position-b.finish_position).map((r,j)=>(
                        <div key={j} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                          <div style={{fontSize:13,color:j===0?"#f1c40f":j===1?"#94a3b8":j===2?"#b45309":"#64748b"}}>
                            {medals[j]||`${j+1}.`} {r.player_name}
                          </div>
                          <ScoreBadge points={r.score} small/>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
