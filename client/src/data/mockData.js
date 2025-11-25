// Mock data for UI development

export const mockUsers = {
  citizen: {
    userId: 'citizen-001',
    userType: 'citizen',
    displayName: 'Citizen_12345',
    trustScore: 7,
    civicSenseScore: 75,
    isAnonymous: true,
    addresses: [
      {
        addressId: 'addr-001',
        geotag: { lat: 28.6139, long: 77.2090 },
        areaCode: 'DEL-001',
        isPrimary: true,
        verified: true
      }
    ],
    itrVerified: true
  },
  official: {
    userId: 'official-001',
    userType: 'government_official',
    officialName: 'Rajesh Kumar',
    department: 'Municipal Corporation',
    trustScore: 8,
    civicSenseScore: 82,
    isAnonymous: false,
    verificationStatus: {
      employeeIdVerified: true,
      emailDomainVerified: true,
      isVerified: true
    }
  },
  privatePlayer: {
    userId: 'private-001',
    userType: 'private_player',
    companyName: 'ABC Construction Pvt Ltd',
    trustScore: 6,
    civicSenseScore: 68,
    isAnonymous: false,
    verificationStatus: {
      documentsVerified: true,
      isVerified: true
    }
  }
};

export const mockIssues = [
  {
    issueId: 'issue-001',
    reporterId: 'citizen-001',
    reporterDisplayName: 'Citizen_12345',
    title: 'Pothole on Main Street',
    description: 'Large pothole causing traffic issues and vehicle damage. Located near the intersection.',
    category: 'Infrastructure',
    geotag: { lat: 28.6139, long: 77.2090 },
    areaCode: 'DEL-001',
    images: ['https://via.placeholder.com/400x300?text=Pothole'],
    status: 'in_progress',
    likes: 24,
    dislikes: 3,
    verificationStatus: {
      isVerified: true,
      verifiedBy: 'official-001',
      verifiedAt: '2024-01-15T10:30:00Z',
      verificationReasons: ['Verified by Official', 'Led to Resolution'],
      verificationFlags: {
        officialVerified: true,
        ledToResolution: true,
        evidenceConfirmed: true,
        multiSourceValidated: false
      }
    },
    areaWeighting: {
      reporterIsLocal: true,
      reporterIsAdjacent: false,
      priorityMultiplier: 2.0
    },
    assignedTo: {
      userId: 'official-001',
      userType: 'government_official',
      assignedAt: '2024-01-10T09:00:00Z'
    },
    notes: [
      {
        noteId: 'note-001',
        addedBy: 'official-001',
        content: 'Work order issued. Repair scheduled for next week.',
        timestamp: '2024-01-12T14:00:00Z'
      }
    ],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    issueId: 'issue-002',
    reporterId: 'citizen-002',
    reporterDisplayName: 'Citizen_67890',
    title: 'Garbage Collection Not Happening',
    description: 'Garbage has been accumulating for 3 days. No collection vehicle has come.',
    category: 'Sanitation',
    geotag: { lat: 28.6200, long: 77.2100 },
    areaCode: 'DEL-002',
    images: ['https://via.placeholder.com/400x300?text=Garbage'],
    status: 'under_review',
    likes: 12,
    dislikes: 1,
    verificationStatus: {
      isVerified: false,
      verificationReasons: [],
      verificationFlags: {
        officialVerified: false,
        ledToResolution: false,
        evidenceConfirmed: false,
        multiSourceValidated: false
      }
    },
    areaWeighting: {
      reporterIsLocal: true,
      reporterIsAdjacent: false,
      priorityMultiplier: 2.0
    },
    createdAt: '2024-01-18T07:00:00Z',
    updatedAt: '2024-01-18T07:00:00Z'
  },
  {
    issueId: 'issue-003',
    reporterId: 'citizen-003',
    reporterDisplayName: 'Citizen_11111',
    title: 'Street Light Not Working',
    description: 'Street light pole number 45 has been non-functional for 2 weeks. Creates safety concerns at night.',
    category: 'Infrastructure',
    geotag: { lat: 28.6150, long: 77.2080 },
    areaCode: 'DEL-001',
    images: ['https://via.placeholder.com/400x300?text=Street+Light'],
    status: 'resolved',
    likes: 45,
    dislikes: 2,
    verificationStatus: {
      isVerified: true,
      verifiedBy: 'official-001',
      verifiedAt: '2024-01-20T11:00:00Z',
      verificationReasons: ['Verified by Official', 'Led to Resolution'],
      verificationFlags: {
        officialVerified: true,
        ledToResolution: true,
        evidenceConfirmed: true,
        multiSourceValidated: false
      }
    },
    areaWeighting: {
      reporterIsLocal: false,
      reporterIsAdjacent: true,
      priorityMultiplier: 1.5
    },
    assignedTo: {
      userId: 'official-001',
      userType: 'government_official',
      assignedAt: '2024-01-19T10:00:00Z'
    },
    notes: [
      {
        noteId: 'note-002',
        addedBy: 'official-001',
        content: 'Bulb replaced. Light is now functional.',
        timestamp: '2024-01-20T11:00:00Z'
      }
    ],
    createdAt: '2024-01-19T08:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z'
  }
];

export const mockRatings = [
  {
    ratingId: 'rating-001',
    ratedEntityId: 'official-001',
    ratedEntityType: 'government_official',
    raterId: 'citizen-001',
    raterTrustScore: 7,
    issueId: 'issue-001',
    hadDirectInteraction: true,
    ratings: {
      responseTime: 4,
      resolutionQuality: 5,
      communication: 4,
      accountability: 5,
      overallPerformance: 4
    },
    areaWeighting: {
      raterIsLocal: true,
      weightMultiplier: 2.0
    },
    createdAt: '2024-01-15T12:00:00Z'
  }
];

export const mockPolls = [
  {
    pollId: 'poll-001',
    entityId: 'official-001',
    entityType: 'government_official',
    pollType: 'verification',
    votes: [
      {
        voterId: 'citizen-001',
        voterTrustScore: 7,
        vote: 'verified',
        areaWeighting: {
          isLocal: true,
          weightMultiplier: 2.0
        },
        timestamp: '2024-01-10T10:00:00Z'
      },
      {
        voterId: 'citizen-002',
        voterTrustScore: 5,
        vote: 'verified',
        areaWeighting: {
          isLocal: true,
          weightMultiplier: 2.0
        },
        timestamp: '2024-01-10T11:00:00Z'
      }
    ],
    results: {
      totalVotes: 2,
      verifiedVotes: 2,
      notVerifiedVotes: 0,
      inServiceVotes: 2,
      notInServiceVotes: 0,
      weightedScore: 4.0
    },
    status: 'completed',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-10T11:00:00Z'
  }
];

export const mockAnalytics = {
  totalUsers: 1234,
  totalIssues: 5678,
  resolvedIssues: 3456,
  averageTrustScore: 6.5,
  averageCivicSenseScore: 65,
  issuesByCategory: {
    'Infrastructure': 2345,
    'Sanitation': 1234,
    'Water Supply': 890,
    'Electricity': 567,
    'Other': 642
  },
  issuesByStatus: {
    'submitted': 500,
    'under_review': 800,
    'in_progress': 920,
    'resolved': 3456
  }
};

