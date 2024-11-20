import { v4 as uuid } from 'uuid'
import { IUserType } from '../../interfaces'

export type QuestionProps = {
    id?: string
    question: string
} & (
        { type: 'text' } |
        { type: 'radio', options: { text: string, key: string }[] } |
        { type: 'multi-choice', options: { text: string, key: string }[], description: string } |
        { type: 'pick-dropdown' | 'search-dropdown', placeholder: string, options: { text: string, key: string }[] }
    )


const jobTitles = {
    executive: [
        "Chief Executive Officer (CEO)",
        "Chief Operating Officer (COO)",
        "Chief Financial Officer (CFO)",
        "Chief Information Officer (CIO)",
        "Chief Technology Officer (CTO)",
        "Chief Marketing Officer (CMO)",
        "Chief Human Resources Officer (CHRO)",
        "Chief Legal Officer (CLO) or General Counsel",
        "Chief Innovation Officer",
        "Chief Strategy Officer (CSO)",
        "President",
        "Vice President of Operations",
        "Vice President of Finance",
        "Vice President of Sales",
        "Vice President of Marketing",
        "Vice President of Human Resources",
        "Vice President of Information Technology",
        "Executive Director",
        "Managing Director",
        "Director of Business Development",
        "Director of Strategic Initiatives",
        "Director of Corporate Communications",
        "Director of Product Management",
        "Director of Research and Development (R&D)",
        "Director of Supply Chain",
        "Director of Customer Success",
        "General Manager"
    ],
    vendor: [
        "Business Owner",
        "Founder",
        "Proprietor",
        "Managing Partner",
        "Managing Director",
        "President",
        "Managing Member",
        "Co-owner",
        "Partner",
        "Director of Operations",
        "Director of Sales",
        "Director of Marketing",
        "Director of Finance",
        "Director of Human Resources",
        "Director of Customer Relations",
        "Operations Manager",
        "Sales Manager",
        "Marketing Manager",
        "Finance Manager",
        "HR Manager",
        "Customer Relations Manager",
        "Business Development Manager",
        "Production Manager",
        "Office Manager",
        "IT Manager",
        "Project Manager",
        "Retail Manager",
        "Service Manager"
    ]
}

const executiveQuestions: QuestionProps[] = [
    {
        question: 'What are you seeking on this platform ?',
        options: [
            { text: 'Seeking to expand my connections', key: uuid() },
            { text: 'Seeking out business opportunities', key: uuid() },
            { text: 'Seeking for personal growth', key: uuid() }
        ],
        type: 'radio',
    },
    {
        question: 'What is your current job title ?',
        type: 'search-dropdown',
        placeholder: 'Search your job title',
        options: jobTitles.executive.map((title) => ({ text: title, key: uuid() })),
    },
    {
        question: 'What is the name of your company?',
        type: 'text'
    },
    {
        question: "What is your company's geographical status ?",
        options: [
            { text: 'Local standard', key: uuid() },
            { text: 'Regional standard', key: uuid() },
            { text: 'Global standard', key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'Are you a sole decision marker in your organization? ?',
        options: [
            { text: 'Yes - I make the decisions', key: uuid() },
            { text: 'No - I am not the sole decision maker', key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'How would you describe your leadership style?',
        options: [
            { text: 'Yes - Visionary and Strategic', key: uuid() },
            { text: 'No - Hands on and Operational', key: uuid() },
            { text: 'No - Collaborative and team-oriented', key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'What can you be available for ?',
        description: 'You can select more than one, this is a multipurpose selection.',
        options: [
            { text: "Mentoring", key: uuid() },
            { text: "Masterclasses, Bootcamps and Workshop", key: uuid() },
            { text: "Jury Events", key: uuid() },
            { text: "All of the above", key: uuid() },
        ],
        type: 'multi-choice',
    },
    {
        question: 'What is your race ?',
        options: [
            { text: "Caucasian (White)", key: uuid() },
            { text: "Negroid (Black)", key: uuid() },
            { text: "Mongoloid (Asian)", key: uuid() },
            { text: "Australoid", key: uuid() },
            { text: "Indigenous Peoples", key: uuid() },
            { text: "Arab", key: uuid() },
            { text: "Hispanic/Latino", key: uuid() },
            { text: "Pacific Islander", key: uuid() },
            { text: "South Asian", key: uuid() },
            { text: "Native American", key: uuid() },
            { text: "Biracial/Multiracial", key: uuid() },
            { text: "Middle Eastern", key: uuid() },
            { text: "Afro-Latino", key: uuid() },
            { text: "Jewish", key: uuid() },
            { text: "Romani (Gypsy)", key: uuid() },
            { text: "Afro-Caribbean", key: uuid() },
            { text: "Afro-Asian", key: uuid() },
            { text: "Central Asian", key: uuid() },
            { text: "Southeast Asian", key: uuid() },
            { text: "East African", key: uuid() },
            { text: "West African", key: uuid() },
            { text: "North African", key: uuid() },
            { text: "Melanesian", key: uuid() },
            { text: "Micronesian", key: uuid() },
            { text: "Polynesian", key: uuid() }
        ]
        ,
        type: 'search-dropdown',
        placeholder: 'Select your race'
    },
    {
        question: 'How many years of experience do you have in your industry?',
        options: [
            { text: "Less than 5 years", key: uuid() },
            { text: "5 - 10 years", key: uuid() },
            { text: "Over 10 years", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'Would like people to learn from your experience and learn how to grow ?',
        options: [
            { text: "Yes - I would love such", key: uuid() },
            { text: "No - I don't", key: uuid() },
        ],
        type: 'radio',
    },
]

const vendorQuestions: QuestionProps[] = [
    {
        question: 'What are you seeking on this platform?',
        options: [
            { text: 'Seeking to expand my connections', key: uuid() },
            { text: 'Seeking out business opportunities', key: uuid() },
            { text: 'Seeking for personal growth', key: uuid() }
        ],
        type: 'radio',
    },
    {
        question: 'Do you own your business?',
        options: [
            { text: 'Yes - I do own my business', key: uuid() },
            { text: 'Yes - I do co-own my business', key: uuid() },
            { text: 'No - I do not own a business', key: uuid() }
        ],
        type: 'radio',
    },
    {
        question: 'What is your current job title?',
        type: 'search-dropdown',
        placeholder: 'Search your job title',
        options: jobTitles.vendor.map((title) => ({ text: title, key: uuid() })),
    },
    {
        question: 'How many years has your business being running?',
        options: [
            { text: "Less than 5 years", key: uuid() },
            { text: "5 - 10 years", key: uuid() },
            { text: "Over 10 years", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'How many employees do you have ?',
        options: [
            { text: "5-20 employees", key: uuid() },
            { text: "20-200 employees", key: uuid() },
            { text: "200+ employees", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: `How many years of industry experience do you have ?`,
        options: [
            { text: '0-5 years experience', key: uuid() },
            { text: '5-10 years experience', key: uuid() },
            { text: '10-15 years experience', key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'What industries or types of projects are you most passionate about and interested in working on',
        options: [
            { text: 'Advertising', key: uuid() },
            { text: 'Media', key: uuid() },
            { text: 'Influencer Marketing', key: uuid() },
            { text: 'Full Creative House', key: uuid() },
        ],
        type: 'multi-choice',
        description: 'You can select more than one, this is a multipurpose selection.',
    },
    {
        question: 'How often do you interact with high-level stakeholders ?',
        options: [
            { text: "Regularly", key: uuid() },
            { text: "Occasionally", key: uuid() },
            { text: "Rarely", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'How much does your business generate annually ?',
        options: [
            { text: "$100K - $1Million", key: uuid() },
            { text: "$1Million - $20Million", key: uuid() },
            { text: "$20Million+", key: uuid() },
        ],
        type: 'radio',
    },
]

const creativeQuestions: QuestionProps[] = [
    {
        question: 'What are you seeking on this platform ?',
        options: [
            { text: 'Seeking to expand my connections', key: uuid() },
            { text: 'Seeking out business opportunities', key: uuid() },
            { text: 'Seeking for personal growth', key: uuid() }
        ],
        type: 'radio',
    },
    {
        question: 'Do you work for a brand ?',
        options: [
            { text: 'Yes - I work for a brand', key: uuid() },
            { text: 'No - I do not work for a brand', key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'What was your last role ?',
        type: 'text',
    },
    {
        question: 'Do you see yourself as a leader ?',
        options: [
            { text: 'Yes - I do ', key: uuid() },
            { text: 'No - I do not', key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'Do you want to change the world ?',
        options: [
            { text: "Yes - It's my passion", key: uuid() },
            { text: "No - I don't want to", key: uuid() },
            { text: "I don't think about these things", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'Are you interested in listening to people with innovative ideas that can grow your business ?',
        options: [
            { text: "Yes - I am interested", key: uuid() },
            { text: "No - I am not sure", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'Are involved in any mentorship program ?',
        options: [
            { text: "Yes - I am", key: uuid() },
            { text: "No - But i would like to", key: uuid() },
            { text: "I dont't want to be", key: uuid() },
        ],
        type: 'radio',
    },
    {
        question: 'Would you like people to learn from your experience and learn how to grow?',
        options: [
            { text: "Yes - I would love such", key: uuid() },
            { text: "No - I don't", key: uuid() },
        ],
        type: 'radio',
    },
]

export const QUESTIONAIRE: Record<IUserType, QuestionProps[]> = {
    executive: executiveQuestions.map((question) => ({
        ...question,
        id: uuid()
    })),
    vendor: vendorQuestions.map((question) => ({
        ...question,
        id: uuid()
    })),
    creative: creativeQuestions.map((question) => ({
        ...question,
        id: uuid()
    })),
}