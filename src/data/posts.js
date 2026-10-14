/* The blog archive.
 *
 * There is exactly ONE post. The listing and the post page are both written
 * to handle that honestly — no "regular updates", no empty cards, no invented
 * archive. Add a second object here and both pages pick it up without edits.
 *
 * Body format: an array of paragraph strings. A string beginning with "## "
 * is rendered as a subheading by BlogPost; everything else is a paragraph.
 * Nothing in here is markdown beyond that one marker.
 */

export const posts = [
  {
    slug: 'gede-abbafatherland-what-a-childrens-home-became',
    title: 'What a children’s home became',
    date: '2026-10-14',
    dateLabel: '14 October 2026',
    byline: 'From the Team',
    readTime: '6 min read',
    metaTitle:
      'What a children’s home became: Gede, ABBAFATHERLAND and the case for family-based care | Bright Hope Education Project',
    metaDescription:
      'The Rainbow House children’s home in Gede is now a community hub, library and education resource centre, and the children live with families. Why that change was the right one.',
    standfirst:
      'In Gede, the building that was Rainbow House is now a library, a resource centre and a smallholding. The children live with families. Here is why that is progress and not retreat.',
    image: '/img/gede-01.jpg',
    imageAlt:
      'The ABBAFATHERLAND site in Gede, Kilifi County, with planting beds and shaded ground beside the community building.',
    body: [
      'At Bright Hope Education, we believe education is one of the most powerful and lasting things we can help to fund in Kenya. That belief has not changed in years. What has changed, in Gede, is the shape of the thing we fund.',
      'For a long time there was a children’s home. It was called Rainbow House, and it did what children’s homes do: it took in children who had nowhere safe, and it kept them fed, clothed and in school. Plenty of people gave money to it. Plenty of children came through it who are adults now.',
      'Today the children are not in it. They live with their families, or with foster parents in the community, and we pay their school fees. The building has become something else entirely — and we want to explain that properly, because if you supported the home, you are owed the reason.',

      '## The reason: children do better in families',
      'The evidence on this is not subtle, and the Kenyan government has been moving in the same direction for years. A child raised in a family — their own, or a foster family in the same community, speaking the same language, in the same church, within walking distance of the same school — tends to do better than the same child raised in an institution: in attachment, at school, and as an adult afterwards.',
      'Residential care solves an emergency. It is a poor substitute for a childhood.',
      'So the question for Gede was never how to keep the home full. It was what these families actually needed help with. And the answer was the cost of school: fees, uniform, shoes, exercise books, exam entry, the bus to the secondary school in Watamu. A term’s fees can exceed a month’s income.',
      'That is why this charity funds school places rather than beds. It is cheaper, it is kinder, and it leaves the family intact.',

      '## What the building became',
      'The property is now held in trust as ABBAFATHERLAND, and it runs as a community hub in Gede: a library and an education resource centre, with hydroponics, fruit cultivation and income-generating activities on the land.',
      'The library is a room with shelves of books, open to the village. After school it is where homework gets done. For a secondary student revising for the national exams, a quiet room is not a luxury. It is the difference between a grade and a different grade.',
      'The education resource centre is where a child who has fallen behind can be helped by someone with the patience to do it, and where books and materials are kept for everyone to use.',
      'The hydroponics and the fruit are the unglamorous part and possibly the most important. Growing channels and fruit trees on the land produce food and a small income, and the point of that income is to carry some of the cost of the site, so that the place is not permanently dependent on money arriving from Surrey. Several of the young people around the hub have learned to run it, which is a skill with a market.',
      'A compound that used to run on donations now partly pays for itself and teaches a trade while it does. That is what sustainability looks like in practice.',

      '## What this means for a sponsor',
      'Twenty-nine children are sponsored through Bright Hope today. Every one of them lives with family or foster family. Every one of them is in school through the work of their family, their teachers and the Rainbow House Kenya team, with a sponsor in Britain whose standing order covers the costs.',
      '£15 a month covers a primary school child’s school costs, and £35 a month covers a secondary school student’s. In both cases the sponsorship goes to school fees, uniform and shoes, books and materials, a daily meal, basic healthcare and exam entry — secondary school simply costs more, because of travel and the national exams at the end of it. For students going on to vocational training, college or university, there is no fixed price: courses differ, so we will tell you what a particular student needs and you can decide.',
      'All funding for the children goes directly for the children. There is no payment processor taking a cut, because there is no card payment button on our website. Sponsorship starts with a message and a conversation, and continues as a standing order from your own bank. It is old-fashioned. It is also why the figure is 100%.',

      '## Why we are there at all',
      'This is Christian work, and the registered purposes it is pursued under are to relieve need and advance the education of children in Kenya, and to advance the teaching of the Christian faith. That is on the register and we are not going to hide it in a footer.',
      'In practice it means the work runs through people who were in Gede before us and will be there after us. Rainbow House Kenya, whose project this is, knows the families and the schools, and which child stopped turning up in week three. You do not have to share the faith to see why that is the only way work this small can be done at this distance.',
      'Children are supported because of need, whatever their family believes. Sponsors come to us with every kind of belief and none, and are equally welcome.',

      '## One more thing about photographs',
      'You will notice that this post has no photograph of a child’s face next to a child’s name. That is deliberate and permanent. The children we fund are children, living in their own community, and their circumstances are not our marketing. Sponsors receive letters and cards from the child they sponsor, privately, as they should.',
      'What we will show you is the place: the growing channels, the shelves of books, the classroom desks, the road into Gede. It is less sentimental. It is also more honest about what your money paid for.',

      '## If you would like to sponsor',
      'Send us a message, tell us whether you are thinking about primary, secondary, or vocational and higher education, and we will write back about what sponsorship involves.',
    ],
  },
]

export default posts
