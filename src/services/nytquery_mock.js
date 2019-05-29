/* eslint-disable no-multi-str */

class MockNYTAPI {

    static async beginGetData_archive(dataCallback) {
        const RESPONSE = JSON.parse('{ \
            "status" : "OK", \
            "copyright" : "Copyright (c) 2019 The New York Times Company. All Rights Reserved.", \
            "response" : { \
                "docs" : [{ \
                        "web_url" : "https://www.nytimes.com/2019/05/26/todayspaper/quotation-of-the-day-its-like-a-zoo-at-everests-tip-as-deaths-soar.html", \
                        "snippet" : "Quotation of the Day for Monday, May 27, 2019.", \
                        "lead_paragraph" : "“You have to qualify to do the Ironman. You have to qualify to run the New York marathon. But you don’t have to qualify to climb the highest mountain in the world?”", \
                        "abstract" : "Quotation of the Day for Monday, May 27, 2019.", \
                        "print_page" : "3", \
                        "blog" : {}, \
                        "source" : "The New York Times", \
                        "multimedia" : [], \
                        "headline" : { \
                            "main" : "Quotation of the Day: It’s ‘Like a Zoo’ at Everest’s Tip as Deaths Soar", \
                            "kicker" : null, \
                            "content_kicker" : null, \
                            "print_headline" : "Quote of the Day", \
                            "name" : null, \
                            "seo" : null, \
                            "sub" : null \
                        }, \
                        "keywords" : [], \
                        "pub_date" : "2019-05-27T02:20:39+0000", \
                        "document_type" : "article", \
                        "news_desk" : "Summary", \
                        "section_name" : "Today’s Paper", \
                        "byline" : { \
                            "original" : null, \
                            "person" : [], \
                            "organization" : null \
                        }, \
                        "type_of_material" : "Quote", \
                        "_id" : "5ceb497749f0eacbf1f91c6d", \
                        "word_count" : 40, \
                        "uri" : "nyt://article/7c07f7b2-7ff7-5d3f-a8b3-e72ad1a8424f" \
                    }, \
                    { \
                        "web_url" : "https://www.nytimes.com/2019/05/27/world/africa/farming-millennials.html", \
                        "snippet" : "In Africa, farming is widely considered a synonym for poverty. But university graduates have set out to prove that farming is a future with “bling.”", \
                        "lead_paragraph" : "AGOTIME BEH, Ghana — After he graduated from university, Vozbeth Kofi Azumah was reluctant to tell anyone — even his mother — what he planned to do for a living.", \
                        "abstract" : "In Africa, farming is widely considered a synonym for poverty. But university graduates have set out to prove that farming is a future with “bling.”", \
                        "print_page" : "1", \
                        "blog" : {}, \
                        "source" : "The New York Times", \
                        "multimedia" : [{ \
                                "rank" : 0, \
                                "subtype" : "xlarge", \
                                "caption" : null, \
                                "credit" : null, \
                                "type" : "image", \
                                "url" : "images/2019/05/24/world/24Ghana-farmers5-promo/merlin_154893237_ba13fd4c-2e0e-40ff-9ed2-f5a31c60aeb7-articleLarge.jpg", \
                                "height" : 400, \
                                "width" : 600, \
                                "legacy" : { \
                                    "xlarge" : "images/2019/05/24/world/24Ghana-farmers5-promo/merlin_154893237_ba13fd4c-2e0e-40ff-9ed2-f5a31c60aeb7-articleLarge.jpg", \
                                    "xlargewidth" : 600, \
                                    "xlargeheight" : 400 \
                                }, \
                                "subType" : "xlarge", \
                                "crop_name" : "articleLarge" \
                            }], \
                        "headline" : { \
                            "main" : "Millennials ‘Make Farming Sexy’ in Africa, Where Tilling the Soil Once Meant Shame", \
                            "kicker" : null, \
                            "content_kicker" : null, \
                            "print_headline" : "Young, Educated and Proud to Till African Soil", \
                            "name" : null, \
                            "seo" : null, \
                            "sub" : null \
                        }, \
                        "keywords" : [{ \
                                "name" : "subject", \
                                "value" : "Agriculture and Farming", \
                                "rank" : 1, \
                                "major" : "N" \
                            }, { \
                                "name" : "subject", \
                                "value" : "Millennial Generation", \
                                "rank" : 2, \
                                "major" : "N" \
                            }, { \
                                "name" : "glocations", \
                                "value" : "AFRICA", \
                                "rank" : 3, \
                                "major" : "N" \
                            }, { \
                                "name" : "glocations", \
                                "value" : "Ghana", \
                                "rank" : 4, \
                                "major" : "N" \
                            } \
                        ], \
                        "pub_date" : "2019-05-27T19:55:30+0000", \
                        "document_type" : "article", \
                        "news_desk" : "Foreign", \
                        "section_name" : "World", \
                        "subsection_name" : "Africa", \
                        "byline" : { \
                            "original" : "By Sarah Maslin Nir", \
                            "person" : [{ \
                                    "firstname" : "Sarah", \
                                    "middlename" : "Maslin", \
                                    "lastname" : "Nir", \
                                    "qualifier" : null, \
                                    "title" : null, \
                                    "role" : "reported", \
                                    "organization" : "", \
                                    "rank" : 1 \
                                } \
                            ], \
                            "organization" : null \
                        }, \
                        "type_of_material" : "News", \
                        "_id" : "5cec40b349f0eacbf1f91dc1", \
                        "word_count" : 1403, \
                        "uri" : "nyt://article/aa7d2b00-34a2-5da1-8b39-eb1f555037e9" \
                    } \
                ], \
                "meta" : { \
                    "hits" : 2, \
                    "offset" : 0, \
                    "time" : 12 \
                } \
            } \
        }');

        dataCallback(RESPONSE.response, 0);
    }    
}

export default MockNYTAPI;