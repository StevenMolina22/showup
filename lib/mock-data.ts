import { Event } from "./types";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Crypto Builders Meetup Buenos Aires",
    startAt: "2025-07-15T22:00:00.000Z",
    endAt: "2025-07-16T01:00:00.000Z",
    timezone: "America/Argentina/Buenos_Aires",
    location: "Palermo, Buenos Aires",
    fullAddress: "Centro Cultural Recoleta, Junín 1930, C1113 CABA, Argentina",
    city: "Buenos Aires",
    link: "https://lu.ma/cryptobuildersba",
    tags: ["crypto", "dev"],
    description:
      "Join the top crypto builders in Buenos Aires for an evening of networking, lightning talks, and collaboration. Learn about the latest DeFi protocols and Layer 2 strategies while connecting with local developers and founders. This meetup brings together experienced blockchain developers, crypto entrepreneurs, and Web3 enthusiasts to share knowledge and build the future of decentralized finance. Whether you're working on smart contracts, building dApps, or exploring new consensus mechanisms, this is your chance to connect with the vibrant Buenos Aires crypto community.",
    image: "https://images.lumacdn.com/event-covers/crypto-builders-ba.jpg",
    price: {
      cents: 1500,
      currency: "usd",
      isFree: false,
      maxPrice: {
        cents: 1500,
        currency: "usd",
      },
    },
    hosts: [
      {
        name: "Buenos Aires Crypto Builders",
        avatarUrl: "https://images.lumacdn.com/avatars/crypto-builders.jpg",
        bio: "Building the future of DeFi in Argentina",
      },
    ],
    guestCount: 89,
    isSoldOut: false,
    spotsRemaining: 11,
  },
  {
    id: "2",
    title: "AI Hackathon: LLM Agents",
    startAt: "2025-07-22T14:00:00.000Z",
    endAt: "2025-07-24T14:00:00.000Z",
    timezone: "UTC",
    location: "Remote",
    link: "https://lu.ma/aihacks",
    tags: ["ai", "dev", "remote"],
    description:
      "Build the next generation of AI agents using large language models in this intensive 48-hour hackathon. Teams will work on creating autonomous agents that can perform complex tasks, integrate with various APIs, and demonstrate real-world applications. Whether you're interested in customer service bots, coding assistants, or creative AI companions, this hackathon provides the perfect environment to experiment with cutting-edge LLM technologies. Remote participation is welcome, and we'll provide mentorship from industry experts.",
    image: "https://images.lumacdn.com/event-covers/ai-hackathon.jpg",
    price: {
      cents: null,
      currency: null,
      isFree: true,
    },
    hosts: [
      {
        name: "AI Builders Collective",
        avatarUrl: "https://images.lumacdn.com/avatars/ai-builders.jpg",
        bio: "Advancing AI through community and collaboration",
      },
    ],
    guestCount: 234,
    isSoldOut: false,
    spotsRemaining: 66,
  },
  {
    id: "3",
    title: "Solidity Bootcamp for Builders",
    startAt: "2025-07-25T18:00:00.000Z",
    endAt: "2025-07-25T22:00:00.000Z",
    timezone: "UTC",
    location: "Online",
    link: "https://lu.ma/soliditycamp",
    tags: ["crypto", "dev", "remote"],
    description:
      "Intensive bootcamp covering smart contract development, security best practices, and DeFi protocols. This comprehensive program takes you from Solidity basics to advanced DeFi development patterns. You'll learn to build secure, gas-optimized smart contracts, implement popular DeFi primitives like AMMs and lending protocols, and understand the economic incentives that drive decentralized finance. The bootcamp includes hands-on coding exercises, security auditing techniques, and real-world case studies from successful DeFi projects.",
    image: "https://images.lumacdn.com/event-covers/solidity-bootcamp.jpg",
    price: {
      cents: 4900,
      currency: "usd",
      isFree: false,
      maxPrice: {
        cents: 4900,
        currency: "usd",
      },
    },
    hosts: [
      {
        name: "Solidity Masters",
        avatarUrl: "https://images.lumacdn.com/avatars/solidity-masters.jpg",
        bio: "Expert Solidity developers and DeFi architects",
      },
    ],
    guestCount: 156,
    isSoldOut: false,
    spotsRemaining: 44,
  },
  {
    id: "4",
    title: "Machine Learning in Production",
    startAt: "2025-08-01T16:00:00.000Z",
    endAt: "2025-08-01T20:00:00.000Z",
    timezone: "America/Los_Angeles",
    location: "San Francisco, CA",
    fullAddress:
      "GitHub HQ, 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA",
    city: "San Francisco",
    link: "https://lu.ma/mlproduction",
    tags: ["ai", "dev"],
    description:
      "Learn how to deploy and scale machine learning models in production environments with confidence. This workshop covers the entire ML operations pipeline, from model training and validation to deployment, monitoring, and continuous improvement. You'll work with popular MLOps tools, implement CI/CD for ML workflows, and learn best practices for model versioning, A/B testing, and performance monitoring. Perfect for data scientists and engineers looking to bridge the gap between research and production.",
    image: "https://images.lumacdn.com/event-covers/ml-production.jpg",
    price: {
      cents: 7500,
      currency: "usd",
      isFree: false,
      maxPrice: {
        cents: 7500,
        currency: "usd",
      },
    },
    hosts: [
      {
        name: "MLOps Engineers",
        avatarUrl: "https://images.lumacdn.com/avatars/mlops-engineers.jpg",
        bio: "Production ML experts from top tech companies",
      },
    ],
    guestCount: 78,
    isSoldOut: false,
    spotsRemaining: 22,
  },
  {
    id: "5",
    title: "DeFi Security Workshop",
    startAt: "2025-08-05T17:00:00.000Z",
    endAt: "2025-08-05T21:00:00.000Z",
    timezone: "America/New_York",
    location: "New York, NY",
    fullAddress: "ConsenSys, 49 Bogart St, Brooklyn, NY 11206, USA",
    city: "New York",
    link: "https://lu.ma/defisecurity",
    tags: ["crypto"],
    description:
      "Hands-on workshop covering common vulnerabilities in DeFi protocols and how to prevent them. Security experts will guide you through real-world attack vectors, including reentrancy attacks, flash loan exploits, and oracle manipulation. You'll learn to use automated security tools, perform manual code reviews, and implement security best practices in your smart contracts. This workshop is essential for anyone building or auditing DeFi protocols, featuring case studies from major security incidents and their prevention strategies.",
    image: "https://images.lumacdn.com/event-covers/defi-security.jpg",
    price: {
      cents: 12000,
      currency: "usd",
      isFree: false,
      maxPrice: {
        cents: 12000,
        currency: "usd",
      },
    },
    hosts: [
      {
        name: "DeFi Security Alliance",
        avatarUrl: "https://images.lumacdn.com/avatars/defi-security.jpg",
        bio: "Leading experts in DeFi security and smart contract auditing",
      },
    ],
    guestCount: 45,
    isSoldOut: true,
    spotsRemaining: 0,
  },
  {
    id: "6",
    title: "GPT-4 Fine-tuning Masterclass",
    startAt: "2025-08-08T18:00:00.000Z",
    endAt: "2025-08-08T22:00:00.000Z",
    timezone: "UTC",
    location: "Remote",
    link: "https://lu.ma/gptfinetuning",
    tags: ["ai", "remote"],
    description:
      "Master the art of fine-tuning GPT-4 for specialized applications and use cases in this comprehensive masterclass. Learn advanced techniques for adapting large language models to specific domains, from legal document analysis to creative writing assistance. You'll explore data preparation strategies, training methodologies, and evaluation metrics for fine-tuned models. The course covers both technical implementation and practical considerations like cost optimization, inference speed, and model deployment. Perfect for AI engineers and researchers looking to create specialized AI applications.",
    image: "https://images.lumacdn.com/event-covers/gpt4-finetuning.jpg",
    price: {
      cents: 9900,
      currency: "usd",
      isFree: false,
      maxPrice: {
        cents: 9900,
        currency: "usd",
      },
    },
    hosts: [
      {
        name: "OpenAI Community",
        avatarUrl: "https://images.lumacdn.com/avatars/openai-community.jpg",
        bio: "AI researchers and engineers specializing in large language models",
      },
    ],
    guestCount: 312,
    isSoldOut: false,
    spotsRemaining: 88,
  },
];
