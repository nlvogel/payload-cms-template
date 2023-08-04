import {CollectionConfig} from 'payload/types';
import getSiblingData from "payload/dist/admin/components/forms/Form/getSiblingData";
import {name} from "http-errors";

const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        defaultColumns: ['title', 'author', 'category', 'tags', 'status'],
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'slug',
                    type: 'text',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
            ]
        },
        {
            name: 'pageMeta',
            type: 'group',
            fields: [
                {
                    name: 'metaTitle',
                    type: 'text',
                    required: true,
                    maxLength: 65,
                },
                {
                    name: 'metaDescription',
                    type: 'textarea',
                    required: true,
                    maxLength: 150,
                },
            ]
        },
        {
            type: 'row',
            fields:
                [{
                    name: 'isFeatured',
                    type: 'select',
                    options: [
                        {
                            label: 'Yes',
                            value: 'yes'
                        },
                        {
                            label: 'No',
                            value: 'no'
                        },
                    ],
                    admin: {
                        width: '50%',
                        isClearable: true,
                        condition: (data, siblingData) => {
                            return !data.order;
                        }
                    }
                },
                    {
                        name: 'order',
                        type: 'select',
                        options: [
                            {
                                label: '1',
                                value: '1'
                            },
                            {
                                label: '2',
                                value: '2'
                            },
                            {
                                label: '3',
                                value: '3'
                            },
                            {
                                label: '4',
                                value: '4'
                            },
                        ],
                        admin: {
                            width: '50%',
                            isClearable: true,
                            condition: (data) => {
                                if (data.isFeatured === "yes") {
                                    return false
                                } else {
                                    return true
                                }
                            }
                        }
                    },
                ]
        },
        {
            name: 'pageImage',
            type: 'group',
            fields: [
                {
                    name: 'featuredImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    admin: {
                        description: "The featured image of the post."
                    }
                },
                {
                    name: 'caption',
                    type: 'text',
                    required: true,
                    admin: {
                        description: "A description of the featured image."
                    }
                },
            ]
        },
        {
            name: 'publishedDate',
            type: 'date',
            admin: {
                date: {
                    pickerAppearance: "dayAndTime",
                    displayFormat: "dd MMM yyyy hh:mm a"
                }
            }
        },
        {
            name: 'status',
            type: 'select',
            options: [
                {
                    value: 'draft',
                    label: 'Draft',
                },
                {
                    value: 'published',
                    label: 'Published',
                },
            ],
            defaultValue: 'draft',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'author',
            type: 'relationship',
            relationTo: 'users',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            admin: {
                position: "sidebar"
            },
        },
        {
            name: 'tags',
            type: 'relationship',
            relationTo: 'tags',
            hasMany: true,
            admin: {
                position: "sidebar"
            },
        },
        {
            name: 'content',
            type: 'richText'
        },
    ],
}

export default Posts;
