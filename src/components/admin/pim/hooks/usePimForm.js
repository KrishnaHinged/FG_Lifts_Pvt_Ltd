'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'

export function usePimForm({ product = null, onSubmit, isLoading = false }) {
  // Basic Info State
  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [tagline, setTagline] = useState(product?.tagline || '')
  const [shortSummary, setShortSummary] = useState(product?.shortSummary || '')
  const [description, setDescription] = useState(product?.description || '')
  const [category, setCategory] = useState(product?.category || 'Passenger')
  const [subCategory, setSubCategory] = useState(product?.subCategory || '')
  const [tabGroup, setTabGroup] = useState(product?.tabGroup || 'Systems')

  // Specs State
  const [specGroups, setSpecGroups] = useState(() => {
    if (product?.specifications && product.specifications.length > 0) {
      // Group specs if group property exists, otherwise put in Performance or General
      const groupsMap = {}
      product.specifications.forEach(spec => {
        const groupName = spec.group || 'Performance'
        if (!groupsMap[groupName]) groupsMap[groupName] = []
        groupsMap[groupName].push({ key: spec.key || '', value: spec.value || '' })
      })
      return Object.entries(groupsMap).map(([title, items]) => ({ title, items }))
    }
    return []
  })

  // Features & Apps State
  const [features, setFeatures] = useState(product?.features || [
    { name: 'VVVF Digital Controller', category: 'Technology' },
    { name: 'Emergency ARD System', category: 'Safety' },
    { name: 'Whisper-Quiet Drive', category: 'Comfort' }
  ])
  const [applications, setApplications] = useState(product?.applications || ['Residential', 'Commercial'])

  // Media & Gallery State
  const [brochureUrl, setBrochureUrl] = useState(product?.brochureUrl || '')
  const [has360View, setHas360View] = useState(!!product?.has360View)
  const [photoSets, setPhotoSets] = useState(() => {
    if (product?.images && product.images.length > 0) {
      return [{
        id: 'set-1',
        title: 'Main Product Gallery',
        images: product.images.map((img, idx) => ({
          url: img.url || '',
          alt: img.alt || '',
          caption: img.caption || '',
          isHero: idx === 0
        }))
      }]
    }
    return [{
      id: 'set-1',
      title: 'Main Product Gallery',
      images: [{ url: '/images/projects-collage.png', alt: 'FG Lift Product View', caption: 'Front elevation view', isHero: true }]
    }]
  })

  // Design Variants State
  const [designVariants, setDesignVariants] = useState(product?.variants || [
    {
      id: 'var-1',
      name: 'Champagne Gold Mirror',
      type: 'Finish',
      hex: '#C9A84C',
      isActive: true,
      priceModifier: '',
      description: 'Polished champagne gold stainless steel with reflective mirror coating',
      images: []
    },
    {
      id: 'var-2',
      name: 'Hairline Stainless Steel',
      type: 'Finish',
      hex: '#A8A8A8',
      isActive: true,
      priceModifier: '',
      description: 'Elegant brushed stainless steel texture with linear grain',
      images: []
    }
  ])

  // 360 Configurator & Variant State
  const [defaultColor, setDefaultColor] = useState(product?.defaultColor || 'Dark Grey')
  const [defaultFinish, setDefaultFinish] = useState(product?.defaultFinish || 'Hairline Finish')
  const [colorVariants, setColorVariants] = useState(product?.colorVariants || [
    { name: 'Dark Grey', hex: '#4B5563', isActive: true, panoramaImages: {}, finishTextures: [] },
    { name: 'Gold', hex: '#D4AF37', isActive: true, panoramaImages: {}, finishTextures: [] },
    { name: 'Rose Gold', hex: '#B76E79', isActive: true, panoramaImages: {}, finishTextures: [] }
  ])
  const [finishVariants, setFinishVariants] = useState(product?.finishVariants || [
    { name: 'Hairline Finish', description: 'Elegant brushed texture finish with fine linear scratch patterns', isActive: true }
  ])

  // SEO & Metadata State
  const [metaTitle, setMetaTitle] = useState(product?.metaTitle || '')
  const [metaDescription, setMetaDescription] = useState(product?.metaDescription || '')
  const [metaKeywords, setMetaKeywords] = useState(product?.metaKeywords || '')
  const [ogTitle, setOgTitle] = useState(product?.ogTitle || '')
  const [ogDescription, setOgDescription] = useState(product?.ogDescription || '')
  const [ogImage, setOgImage] = useState(product?.ogImage || '')
  const [canonicalUrl, setCanonicalUrl] = useState(product?.canonicalUrl || '')
  const [enableSchema, setEnableSchema] = useState(product?.enableSchema !== false)
  const [robotsIndex, setRobotsIndex] = useState(product?.robotsIndex || 'index')
  const [robotsFollow, setRobotsFollow] = useState(product?.robotsFollow || 'follow')

  // Visibility & Publishing State
  const [isActive, setIsActive] = useState(product ? !!product.isActive : true)
  const [isFeatured, setIsFeatured] = useState(!!product?.isFeatured)
  const [badge, setBadge] = useState(product?.badge || '')
  const [sortOrder, setSortOrder] = useState(product?.sortOrder || 0)
  const [publishDate, setPublishDate] = useState(product?.publishDate || '')
  const [visibility, setVisibility] = useState(product?.visibility || 'Public')

  // Slug auto-generation
  const handleNameChange = (val) => {
    setName(val)
    if (!product && (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
    }
  }

  // Completion Status Tracking
  const completion = useMemo(() => {
    const checks = {
      basic: Boolean(name.trim() && slug.trim() && description.trim()),
      specs: specGroups.some(g => g.items.some(i => i.key.trim() && i.value.trim())),
      features: features.length > 0 && applications.length > 0,
      media: photoSets.some(set => set.images.some(img => img.url.trim())),
      variants: designVariants.length > 0,
      configurator: !has360View || (colorVariants.length > 0 && finishVariants.length > 0),
      seo: Boolean(metaTitle.trim() || metaDescription.trim() || metaKeywords.trim()),
      visibility: true
    }

    const totalSections = has360View ? 8 : 7
    const completedCount = Object.entries(checks).filter(([key, val]) => {
      if (key === 'configurator' && !has360View) return false
      return val
    }).length

    return {
      checks,
      completedCount,
      totalSections,
      percentage: Math.round((completedCount / totalSections) * 100)
    }
  }, [
    name, slug, description, specGroups, features, applications,
    photoSets, designVariants, has360View, colorVariants, finishVariants,
    metaTitle, metaDescription, metaKeywords
  ])

  // Assemble final payload for API submission
  const assemblePayload = useCallback((forcedActive = null) => {
    // Flatten spec groups into standard array
    const cleanSpecs = []
    specGroups.forEach(g => {
      g.items.forEach(i => {
        if (i.key.trim() && i.value.trim()) {
          cleanSpecs.push({ group: g.title, key: i.key.trim(), value: i.value.trim() })
        }
      })
    })

    // Flatten photo sets into main images array
    const cleanImages = []
    photoSets.forEach(set => {
      set.images.forEach(img => {
        if (img.url.trim()) {
          cleanImages.push({
            url: img.url.trim(),
            alt: img.alt.trim() || name,
            caption: img.caption?.trim() || '',
            isHero: !!img.isHero,
            setName: set.title
          })
        }
      })
    })

    const cleanColors = colorVariants.filter(c => c.name.trim())
    const cleanFinishes = finishVariants.filter(f => f.name.trim())

    return {
      name: name.trim(),
      slug: slug.toLowerCase().trim(),
      tagline: tagline.trim(),
      shortSummary: shortSummary.trim(),
      category,
      subCategory: subCategory.trim(),
      tabGroup,
      description: description.trim(),
      isFeatured,
      isActive: forcedActive !== null ? forcedActive : isActive,
      badge: badge.trim(),
      sortOrder: Number(sortOrder) || 0,
      brochureUrl: brochureUrl.trim(),
      has360View,
      defaultColor: defaultColor || cleanColors[0]?.name || '',
      defaultFinish: defaultFinish || cleanFinishes[0]?.name || '',
      metaTitle: metaTitle.trim(),
      metaDescription: metaDescription.trim(),
      metaKeywords: metaKeywords.trim(),
      ogTitle: ogTitle.trim(),
      ogDescription: ogDescription.trim(),
      ogImage: ogImage.trim(),
      canonicalUrl: canonicalUrl.trim(),
      enableSchema,
      robotsIndex,
      robotsFollow,
      publishDate,
      visibility,
      specifications: cleanSpecs,
      features: features.map(f => typeof f === 'string' ? f : f.name),
      applications,
      images: cleanImages,
      colorVariants: cleanColors,
      finishVariants: cleanFinishes,
      variants: designVariants
    }
  }, [
    name, slug, tagline, shortSummary, category, subCategory, tabGroup, description,
    isFeatured, isActive, badge, sortOrder, brochureUrl, has360View, defaultColor,
    defaultFinish, metaTitle, metaDescription, metaKeywords, ogTitle, ogDescription,
    ogImage, canonicalUrl, enableSchema, robotsIndex, robotsFollow, publishDate,
    visibility, specGroups, photoSets, colorVariants, finishVariants, designVariants,
    features, applications
  ])

  return {
    // Basic
    name, setName: handleNameChange,
    slug, setSlug,
    tagline, setTagline,
    shortSummary, setShortSummary,
    description, setDescription,
    category, setCategory,
    subCategory, setSubCategory,
    tabGroup, setTabGroup,
    // Specs
    specGroups, setSpecGroups,
    // Features & Apps
    features, setFeatures,
    applications, setApplications,
    // Media
    brochureUrl, setBrochureUrl,
    has360View, setHas360View,
    photoSets, setPhotoSets,
    // Variants
    designVariants, setDesignVariants,
    // Configurator
    defaultColor, setDefaultColor,
    defaultFinish, setDefaultFinish,
    colorVariants, setColorVariants,
    finishVariants, setFinishVariants,
    // SEO
    metaTitle, setMetaTitle,
    metaDescription, setMetaDescription,
    metaKeywords, setMetaKeywords,
    ogTitle, setOgTitle,
    ogDescription, setOgDescription,
    ogImage, setOgImage,
    canonicalUrl, setCanonicalUrl,
    enableSchema, setEnableSchema,
    robotsIndex, setRobotsIndex,
    robotsFollow, setRobotsFollow,
    // Visibility
    isActive, setIsActive,
    isFeatured, setIsFeatured,
    badge, setBadge,
    sortOrder, setSortOrder,
    publishDate, setPublishDate,
    visibility, setVisibility,
    // Helper outputs
    completion,
    assemblePayload
  }
}
