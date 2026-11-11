export declare const identityForScrubbing: {
    select: {
        country: true;
        legalName: true;
        tradeName: true;
        website: true;
        users: {
            select: {
                firstName: true;
                lastName: true;
            };
        };
    };
};
export declare const publicManufacturerInclude: {
    categories: {
        select: {
            slug: true;
            name: true;
        };
        orderBy: {
            sortOrder: "asc";
        };
    };
    certifications: {
        select: {
            type: true;
            customName: true;
            status: true;
            expiresAt: true;
        };
    };
    photos: {
        include: {
            file: {
                include: {
                    renditions: {
                        orderBy: {
                            width: "asc";
                        };
                    };
                };
            };
        };
        orderBy: {
            sortOrder: "asc";
        };
    };
    company: {
        select: {
            country: true;
            legalName: true;
            tradeName: true;
            website: true;
            users: {
                select: {
                    firstName: true;
                    lastName: true;
                };
            };
        };
    };
    supplierClaims: {
        where: {
            status: "VERIFIED";
        };
        select: {
            region: true;
            tier: true;
            brandNames: true;
            status: true;
        };
    };
};
export declare const publicProductInclude: {
    category: {
        select: {
            slug: true;
            name: true;
        };
    };
    priceTiers: {
        select: {
            minQty: true;
            buyerUnitPriceMinor: true;
        };
        orderBy: {
            minQty: "asc";
        };
    };
    images: {
        include: {
            file: {
                include: {
                    renditions: {
                        orderBy: {
                            width: "asc";
                        };
                    };
                };
            };
        };
        orderBy: {
            sortOrder: "asc";
        };
    };
    manufacturerProfile: {
        select: {
            publicCode: true;
            company: {
                select: {
                    country: true;
                    legalName: true;
                    tradeName: true;
                    website: true;
                    users: {
                        select: {
                            firstName: true;
                            lastName: true;
                        };
                    };
                };
            };
        };
    };
};
export declare const listedManufacturer: {
    isListed: true;
    company: {
        kycStatus: "VERIFIED";
        deletedAt: null;
    };
};
